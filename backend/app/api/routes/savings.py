from fastapi import APIRouter

from app.schemas.savings import (
    SavingsRequest,
    SavingsResponse,
)
from app.services.savings_service import calculate_savings


router = APIRouter(
    prefix="/savings",
    tags=["Savings"]
)


@router.post(
    "",
    response_model=SavingsResponse
)
def calculate_savings_endpoint(
    request: SavingsRequest
):
    return calculate_savings(request)