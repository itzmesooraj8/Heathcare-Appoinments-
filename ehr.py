from fastapi import APIRouter, HTTPException
from pymongo.collection import Collection
from app.main import ehr_db

router = APIRouter()

diagnoses_collection: Collection = ehr_db["diagnoses"]
reports_collection: Collection = ehr_db["reports"]
prescriptions_collection: Collection = ehr_db["prescriptions"]

@router.post("/diagnoses")
def create_diagnosis(diagnosis: dict):
    result = diagnoses_collection.insert_one(diagnosis)
    return {"id": str(result.inserted_id)}

@router.get("/diagnoses/{diagnosis_id}")
def get_diagnosis(diagnosis_id: str):
    diagnosis = diagnoses_collection.find_one({"_id": diagnosis_id})
    if not diagnosis:
        raise HTTPException(status_code=404, detail="Diagnosis not found")
    return diagnosis

# Similar CRUD operations for reports and prescriptions
