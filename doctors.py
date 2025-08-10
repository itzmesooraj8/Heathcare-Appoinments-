from fastapi import APIRouter, Depends, Security
from app.core.middleware import get_current_user
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User, UserRole

router = APIRouter()

@router.get("/search")
def search_doctors(specialization: str = None, name: str = None, db: Session = Depends(get_db), user=Security(get_current_user)):
    query = db.query(User).filter(User.role == UserRole.doctor)
    if specialization:
        query = query.filter(User.specialization.ilike(f"%{specialization}%"))
    if name:
        query = query.filter(User.name.ilike(f"%{name}%"))
    return query.all()
