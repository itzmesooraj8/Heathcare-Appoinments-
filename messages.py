from fastapi import APIRouter

router = APIRouter()

messages = []

@router.post("/")
def send_message(sender_id: int, receiver_id: int, content: str):
    msg = {"sender_id": sender_id, "receiver_id": receiver_id, "content": content}
    messages.append(msg)
    return msg

@router.get("/")
def get_messages(user_id: int):
    return [m for m in messages if m["sender_id"] == user_id or m["receiver_id"] == user_id]
