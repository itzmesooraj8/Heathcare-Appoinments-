from fastapi import APIRouter, Depends
from app.core.middleware import role_required

admin_router = APIRouter()

# Example in-memory data
pending_doctors = ["doctor1", "doctor2"]
logs = ["User logged in", "User signed up"]
analytics_data = {"total_users": 100, "active_users": 80}

@admin_router.get("/approve-doctor")
def approve_doctor(doctor_name: str, user=Depends(role_required("Admin"))):
    if doctor_name in pending_doctors:
        pending_doctors.remove(doctor_name)
        return {"message": f"Doctor {doctor_name} approved."}
    return {"message": "Doctor not found in pending list."}

@admin_router.get("/logs")
def get_logs(user=Depends(role_required("Admin"))):
    return {"logs": logs}

@admin_router.get("/analytics")
def get_analytics(user=Depends(role_required("Admin"))):
    return {"analytics": analytics_data}
