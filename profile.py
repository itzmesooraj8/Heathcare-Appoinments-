
from fastapi import APIRouter, Depends, HTTPException, Security
from app.core.middleware import get_current_user, role_required
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.user import User

router = APIRouter()

@router.get("/{user_id}")
def get_profile(user_id: int, db: Session = Depends(get_db), user=Security(get_current_user)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

@router.post("/")
def create_profile(data: dict, db: Session = Depends(get_db), user=Security(role_required("admin"))):
    required = ["name", "email", "password", "role"]
    for field in required:
        if field not in data:
            raise HTTPException(status_code=400, detail=f"Missing field: {field}")
    if db.query(User).filter(User.email == data["email"]).first():
        raise HTTPException(status_code=409, detail="Email already exists")
    user = User(**data)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

@router.put("/{user_id}")
def update_profile(user_id: int, data: dict, db: Session = Depends(get_db), user=Security(get_current_user)):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    for k, v in data.items():
        setattr(user, k, v)
    db.commit()
    db.refresh(user)
    return user

@router.delete("/{user_id}")
def delete_profile(user_id: int, db: Session = Depends(get_db), user=Security(role_required("admin"))):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(user)
    db.commit()
    return {"message": "User deleted"}
