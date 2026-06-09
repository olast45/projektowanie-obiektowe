from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://ex5-frontend.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Product(BaseModel):
    id: int
    name: str
    price: float

products = [
    Product(id=1, name="Laptop", price=4500), 
    Product(id=2, name="Watch", price=1000), 
    Product(id=3, name="Smartphone", price=2500)
]

class Payment(BaseModel):
    amount: float
    cardNumber: str

@app.get("/api/products")
def get_products():
    return products

@app.post("/api/payments")
def create_payment(payment: Payment):

    card = payment.cardNumber

    card = card.replace(" ", "")

    if not card.isdigit():
        return {"status": "Error", "message": "Card must contain only numbers"}

    if len(card) < 13 or len(card) > 19:
        return {"status": "Error", "message": "Invalid card length"}

    return {
        "status": "Success",
        "message": "Payment processed"
    }