from decimal import Decimal, ROUND_HALF_UP
from typing import TypedDict

from app.schemas.comparison import ProductComparisonInput
from app.services.conversion_service import (
    get_dimension,
    normalize_quantity,
)


class ComparisonProductData(TypedDict):
    position: int
    name: str
    original_price: Decimal
    original_quantity: Decimal
    original_unit: str
    normalized_quantity: Decimal
    normalized_unit: str
    unit_price: Decimal


class LowestPriceData(TypedDict):
    name: str
    unit_price: Decimal
    unit: str


class ComparisonData(TypedDict):
    comparison_unit: str
    products: list[ComparisonProductData]
    lowest_unit_price: LowestPriceData


def round_money(value: Decimal) -> Decimal:
    return value.quantize(
        Decimal("0.01"),
        rounding=ROUND_HALF_UP
    )


def compare_products(
    products: list[ProductComparisonInput],
) -> ComparisonData:

    if len(products) < 2:
        raise ValueError(
            "É necessário informar pelo menos 2 produtos."
        )

    if len(products) > 5:
        raise ValueError(
            "É permitido comparar no máximo 5 produtos."
        )

    first_dimension = get_dimension(products[0].unit)

    normalized_products = []

    for product in products:
        dimension = get_dimension(product.unit)

        if dimension != first_dimension:
            raise ValueError(
                "Os produtos informados utilizam unidades "
                "incompatíveis para comparação."
            )

        normalized_quantity, normalized_unit = normalize_quantity(
            product.quantity,
            product.unit
        )

        unit_price = (
            product.price / normalized_quantity
        )

        normalized_products.append(
            {
                "name": product.name,
                "original_price": product.price,
                "original_quantity": product.quantity,
                "original_unit": product.unit,
                "normalized_quantity": normalized_quantity,
                "normalized_unit": normalized_unit,
                "unit_price_raw": unit_price,
            }
        )

    normalized_products.sort(
        key=lambda product: product["unit_price_raw"]
    )

    results: list[ComparisonProductData] = []

    previous_price: Decimal | None = None
    current_position = 0

    for index, product in enumerate(normalized_products):

        raw_price = product["unit_price_raw"]

        if previous_price is None or raw_price != previous_price:
            current_position = index + 1

        result = {
            "position": current_position,
            "name": product["name"],
            "original_price": round_money(
                product["original_price"]
            ),
            "original_quantity": product["original_quantity"],
            "original_unit": product["original_unit"],
            "normalized_quantity": product["normalized_quantity"],
            "normalized_unit": product["normalized_unit"],
            "unit_price": round_money(raw_price),
        }

        results.append(result)

        previous_price = raw_price

    lowest = results[0]

    return {
        "comparison_unit": lowest["normalized_unit"],
        "products": results,
        "lowest_unit_price": {
            "name": lowest["name"],
            "unit_price": lowest["unit_price"],
            "unit": lowest["normalized_unit"],
        },
    }