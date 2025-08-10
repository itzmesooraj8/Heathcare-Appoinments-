from fastapi import APIRouter, Depends, HTTPException, Security
from app.core.middleware import get_current_user, role_required
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.patient_limit import PatientLimit
from app.models.user import User

router = APIRouter()


@router.get("/{doctor_id}")
def get_patient_limit(doctor_id: int, db: Session = Depends(get_db), user=Security(get_current_user)):
    limit = db.query(PatientLimit).filter(PatientLimit.doctor_id == doctor_id).first()
    if not limit:
        raise HTTPException(status_code=404, detail="Patient limit not set for doctor")
    return limit

@router.post("/")
def set_patient_limit(data: dict, db: Session = Depends(get_db), user=Security(role_required("doctor"))):
    required = ["doctor_id", "max_patients"]
    for field in required:
        if field not in data:
            raise HTTPException(status_code=400, detail=f"Missing field: {field}")
    limit = db.query(PatientLimit).filter(PatientLimit.doctor_id == data["doctor_id"]).first()
    if limit:
        limit.max_patients = data["max_patients"]
    else:
        limit = PatientLimit(**data)
        db.add(limit)
    db.commit()
    db.refresh(limit)
    return limit

@router.delete("/{doctor_id}")
def delete_patient_limit(doctor_id: int, db: Session = Depends(get_db), user=Security(role_required("doctor"))):
    limit = db.query(PatientLimit).filter(PatientLimit.doctor_id == doctor_id).first()
    if not limit:
        raise HTTPException(status_code=404, detail="Patient limit not set for doctor")
    db.delete(limit)
    db.commit()
    return {"message": "Patient limit deleted"}
