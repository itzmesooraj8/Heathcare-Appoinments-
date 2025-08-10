from fastapi import APIRouter, Depends, UploadFile, File, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import MedicalRecord
import os

router = APIRouter()

@router.post("/upload")
async def upload_record(patient_id: int, file: UploadFile = File(...), db: Session = Depends(get_db)):
    upload_dir = "uploads/records"
    os.makedirs(upload_dir, exist_ok=True)
    file_path = os.path.join(upload_dir, file.filename)
    with open(file_path, "wb") as f:
        f.write(await file.read())
    record = MedicalRecord(patient_id=patient_id, file_url=file_path, title=file.filename)
    db.add(record)
    db.commit()
    db.refresh(record)
    return record

@router.get("/")
def list_records(db: Session = Depends(get_db)):
    return db.query(MedicalRecord).all()
