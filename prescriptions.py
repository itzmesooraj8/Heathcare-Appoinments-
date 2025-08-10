from fastapi import APIRouter, Depends, HTTPException, Response
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.models import Prescription
import os

router = APIRouter()

@router.get("/")
def list_prescriptions(db: Session = Depends(get_db)):
    return db.query(Prescription).all()

@router.get("/{prescription_id}/download")
def download_prescription(prescription_id: int, db: Session = Depends(get_db)):
    pdf_path = f"prescriptions/{prescription_id}.pdf"
    if not os.path.exists(pdf_path):
        with open(pdf_path, "wb") as f:
            f.write(b"PDF content for prescription")
    with open(pdf_path, "rb") as f:
        return Response(f.read(), media_type="application/pdf")
