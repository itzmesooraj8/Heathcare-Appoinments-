from fastapi import APIRouter, Depends, HTTPException, Security
from app.core.middleware import get_current_user, role_required
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.appointment import Appointment, AppointmentStatus
from app.models.availability import Availability
from app.models.patient_limit import PatientLimit
from app.models.user import User
from datetime import datetime
import jwt
import os

router = APIRouter()

JITSI_APP_ID = os.getenv("JITSI_APP_ID", "your_jitsi_app_id")
JITSI_SECRET = os.getenv("JITSI_SECRET", "your_jitsi_secret")
JITSI_DOMAIN = os.getenv("JITSI_DOMAIN", "meet.jit.si")

@router.get("/")
def list_appointments(db: Session = Depends(get_db)):
    return db.query(Appointment).all()

@router.post("/")
def create_appointment(data: dict, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    # Only allow patients to create appointments
    role_required(user, roles=["patient"])

    # Validate required fields
    required = ["patient_id", "doctor_id", "start_time", "end_time"]
    for field in required:
        if field not in data:
            raise HTTPException(status_code=400, detail=f"Missing field: {field}")

    # Check doctor availability
    avail = db.query(Availability).filter(
        Availability.doctor_id == data["doctor_id"],
        Availability.start_time <= data["start_time"],
        Availability.end_time >= data["end_time"]
    ).first()
    if not avail:
        raise HTTPException(status_code=409, detail="Doctor not available at requested time")

    # Check for appointment conflicts
    conflict = db.query(Appointment).filter(
        Appointment.doctor_id == data["doctor_id"],
        Appointment.status == AppointmentStatus.scheduled,
        Appointment.start_time < data["end_time"],
        Appointment.end_time > data["start_time"]
    ).first()
    if conflict:
        raise HTTPException(status_code=409, detail="Appointment time conflicts with another booking")

    # Check patient limit
    limit = db.query(PatientLimit).filter(PatientLimit.doctor_id == data["doctor_id"]).first()
    if limit:
        today = datetime.strptime(str(data["start_time"]), "%Y-%m-%d %H:%M:%S")
        count = db.query(Appointment).filter(
            Appointment.doctor_id == data["doctor_id"],
            Appointment.start_time >= today.replace(hour=0, minute=0, second=0),
            Appointment.end_time <= today.replace(hour=23, minute=59, second=59),
            Appointment.status == AppointmentStatus.scheduled
        ).count()
        if count >= limit.max_patients:
            raise HTTPException(status_code=409, detail="Doctor has reached max patient limit for today")

    appt = Appointment(**data)
    db.add(appt)
    db.commit()
    db.refresh(appt)
    return appt

@router.post("/cancel/{appointment_id}")
def cancel_appointment(appointment_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    # Only allow patients or doctors to cancel
    role_required(user, roles=["patient", "doctor"])

    appt = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    if appt.status == AppointmentStatus.cancelled:
        raise HTTPException(status_code=400, detail="Appointment already cancelled")
    appt.status = AppointmentStatus.cancelled
    db.commit()
    db.refresh(appt)
    return {"message": "Appointment cancelled", "appointment": appt}

@router.get("/search")
def search_appointments(doctor_id: int = None, patient_id: int = None, status: str = None, db: Session = Depends(get_db)):
    query = db.query(Appointment)
    if doctor_id:
        query = query.filter(Appointment.doctor_id == doctor_id)
    if patient_id:
        query = query.filter(Appointment.patient_id == patient_id)
    if status:
        query = query.filter(Appointment.status == status)
    return query.all()

@router.post("/teleconsultation/start")
def start_teleconsultation(appointment_id: int, db: Session = Depends(get_db), user: User = Depends(get_current_user)):
    # Only allow doctors or patients to start teleconsultation
    role_required(user, roles=["doctor", "patient"])

    appt = db.query(Appointment).filter(Appointment.id == appointment_id).first()
    if not appt:
        raise HTTPException(status_code=404, detail="Appointment not found")
    room_name = f"appt_{appointment_id}_{appt.doctor_id}_{appt.patient_id}"
    payload = {
        "aud": JITSI_DOMAIN,
        "iss": JITSI_APP_ID,
        "sub": JITSI_DOMAIN,
        "room": room_name,
        "exp": int(datetime.utcnow().timestamp()) + 3600,
        "context": {
            "user": {
                "name": f"Doctor {appt.doctor_id} / Patient {appt.patient_id}",
                "id": str(appt.patient_id)
            }
        }
    }
    token = jwt.encode(payload, JITSI_SECRET, algorithm="HS256")
    return {
        "room": room_name,
        "token": token,
        "domain": JITSI_DOMAIN
    }
