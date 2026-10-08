from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator


Unit = Literal["g", "kg", "ml", "L", "un"]


class ProductComparisonInput(BaseModel):
    name: str = Field(
        min_length=1,
        max_length=100
    )

    price: Decimal = Field(
        gt=0,
        max_digits=10,
        decimal_places=2
    )

    quantity: Decimal = Field(
        gt=0,
        max_digits=10,
        decimal_places=3
    )

    unit: Unit

    @field_validator("name")
    @classmethod
    def validate_name(cls, value: str) -> str:
        value = value.strip()

        if not value:
            raise ValueError(
                "O nome do produto não pode estar vazio."
            )

        return value


class ComparisonRequest(BaseModel):
    products: list[ProductComparisonInput] = Field(
        min_length=2,
        max_length=5
    )


class ComparisonProductResult(BaseModel):
    position: int
    name: str

    original_price: float
    original_quantity: float
    original_unit: Unit

    normalized_quantity: float
    normalized_unit: str
    unit_price: float

    model_config = ConfigDict(
        from_attributes=True
    )


class LowestUnitPrice(BaseModel):
    name: str
    unit_price: float
    unit: str


class ComparisonResponse(BaseModel):
    comparison_unit: str
    products: list[ComparisonProductResult]
    lowest_unit_price: LowestUnitPrice

    model_config = ConfigDict(
        from_attributes=True
    )