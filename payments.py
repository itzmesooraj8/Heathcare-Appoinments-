from fastapi import APIRouter

router = APIRouter()

payments = []

@router.post("/")
def make_payment(user_id: int, amount: float):
    payment = {"user_id": user_id, "amount": amount}
    payments.append(payment)
    return payment

@router.get("/")
def list_payments(user_id: int):
    return [p for p in payments if p["user_id"] == user_id]
