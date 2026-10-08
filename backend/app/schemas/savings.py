from decimal import Decimal

from pydantic import BaseModel, Field


class SavingsRequest(BaseModel):
    current_price: Decimal = Field(
        gt=0,
        max_digits=10,
        decimal_places=2
    )

    alternative_price: Decimal = Field(
        gt=0,
        max_digits=10,
        decimal_places=2
    )

    monthly_purchases: int = Field(
        gt=0,
        le=1000
    )


class SavingsResponse(BaseModel):
    current_price: float
    alternative_price: float
    monthly_purchases: int

    saving_per_purchase: float
    monthly_saving: float
    annual_saving: float

    alternative_is_cheaper: bool
    message: str | None = None