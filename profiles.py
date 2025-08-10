from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from app.models.models import Doctor, Patient
from app.core.database import get_db

router = APIRouter()

@router.post("/doctors")
def create_doctor(doctor: dict, db: Session = Depends(get_db)):
    new_doctor = Doctor(**doctor)
    db.add(new_doctor)
    db.commit()
    db.refresh(new_doctor)
    return new_doctor

@router.get("/doctors/{doctor_id}")
def get_doctor(doctor_id: int, db: Session = Depends(get_db)):
    doctor = db.query(Doctor).filter(Doctor.id == doctor_id).first()
    if not doctor:
        raise HTTPException(status_code=404, detail="Doctor not found")
    return doctor

@router.post("/patients")
def create_patient(patient: dict, db: Session = Depends(get_db)):
    new_patient = Patient(**patient)
    db.add(new_patient)
    db.commit()
    db.refresh(new_patient)
    return new_patient

@router.get("/patients/{patient_id}")
def get_patient(patient_id: int, db: Session = Depends(get_db)):
    patient = db.query(Patient).filter(Patient.id == patient_id).first()
    if not patient:
        raise HTTPException(status_code=404, detail="Patient not found")
    return patient
