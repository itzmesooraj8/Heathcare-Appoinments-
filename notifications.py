from fastapi import APIRouter

router = APIRouter()

notifications = []

@router.post("/")
def create_notification(user_id: int, message: str):
    notif = {"user_id": user_id, "message": message}
    notifications.append(notif)
    return notif

@router.get("/")
def get_notifications(user_id: int):
    return [n for n in notifications if n["user_id"] == user_id]
