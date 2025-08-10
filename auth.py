from fastapi import APIRouter, Depends, HTTPException, File, UploadFile
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from passlib.context import CryptContext
from datetime import datetime, timedelta
import jwt
from pydantic import BaseModel

# Secret key for JWT
SECRET_KEY = "your_secret_key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)

# User model
class User(BaseModel):
    username: str
    password: str
    role: str

# In-memory user store (replace with database in production)
users_db = {}

# OAuth2 setup
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Router setup
auth_router = APIRouter()

@auth_router.post("/signup")
def signup(user: User):
    if user.username in users_db:
        raise HTTPException(status_code=400, detail="Username already exists")
    hashed_password = get_password_hash(user.password)
    users_db[user.username] = {"password": hashed_password, "role": user.role}
    return {"message": "User created successfully"}

@auth_router.post("/login")
def login(form_data: OAuth2PasswordRequestForm = Depends()):
    demo_users = {
        "admin@gmail.com": {"password": "admin123", "role": "admin"},
        "doctor@gmail.com": {"password": "doctor123", "role": "doctor"},
        "patient@gmail.com": {"password": "patient123", "role": "patient"}
    }

    # Check if the user is a demo user
    if form_data.username in demo_users:
        demo_user = demo_users[form_data.username]
        if form_data.password == demo_user["password"]:
            access_token = create_access_token(data={"sub": form_data.username, "role": demo_user["role"]})
            return {"access_token": access_token, "token_type": "bearer", "role": demo_user["role"]}
        else:
            raise HTTPException(status_code=400, detail="Invalid credentials")

    # Existing user authentication logic
    user = users_db.get(form_data.username)
    if not user or not verify_password(form_data.password, user["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": form_data.username, "role": user["role"]})
    return {"access_token": access_token, "token_type": "bearer", "role": user["role"]}

@auth_router.post("/doctor-signup")
def doctor_signup(full_name: str, specialization: str, email: str, password: str, license_file: UploadFile = File(...)):
    # Doctor signup logic here
    return {"message": "Doctor signed up successfully"}
