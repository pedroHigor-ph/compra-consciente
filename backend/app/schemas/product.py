from decimal import Decimal

from pydantic import BaseModel, ConfigDict


class ProductResponse(BaseModel):
    id: int
    category_id: int
    name: str
    description: str | None = None
    price: Decimal
    quantity: Decimal
    unit: str

    model_config = ConfigDict(from_attributes=True)