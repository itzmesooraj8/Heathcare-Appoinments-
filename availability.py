from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.availability import Availability
from app.models.user import User

router = APIRouter()

@router.get("/{doctor_id}")
def get_availability(doctor_id: int, db: Session = Depends(get_db)):
    return db.query(Availability).filter(Availability.doctor_id == doctor_id).all()

@router.post("/")
def set_availability(data: dict, db: Session = Depends(get_db)):
    required = ["doctor_id", "start_time", "end_time"]
    for field in required:
        if field not in data:
            raise HTTPException(status_code=400, detail=f"Missing field: {field}")
    avail = Availability(**data)
    db.add(avail)
    db.commit()
    db.refresh(avail)
    return avail

@router.delete("/{availability_id}")
def delete_availability(availability_id: int, db: Session = Depends(get_db)):
    avail = db.query(Availability).filter(Availability.id == availability_id).first()
    if not avail:
        raise HTTPException(status_code=404, detail="Availability not found")
    db.delete(avail)
    db.commit()
    return {"message": "Availability deleted"}
