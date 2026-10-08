from decimal import Decimal

import pytest

from app.schemas.comparison import (
    ComparisonRequest,
)
from app.services.comparison_service import (
    compare_products,
)


def test_compare_products_by_kg():
    request = ComparisonRequest(
        products=[
            {
                "name": "Arroz A",
                "price": Decimal("15.00"),
                "quantity": Decimal("500"),
                "unit": "g",
            },
            {
                "name": "Arroz B",
                "price": Decimal("22.00"),
                "quantity": Decimal("1"),
                "unit": "kg",
            },
        ]
    )

    result = compare_products(
        request.products
    )

    assert result["comparison_unit"] == "kg"

    assert result["products"][0]["name"] == "Arroz B"

    assert (
        result["products"][0]["unit_price"]
        == Decimal("22.00")
    )

    assert (
        result["products"][1]["unit_price"]
        == Decimal("30.00")
    )


def test_compare_products_by_liters():
    request = ComparisonRequest(
        products=[
            {
                "name": "Produto A",
                "price": Decimal("8.00"),
                "quantity": Decimal("500"),
                "unit": "ml",
            },
            {
                "name": "Produto B",
                "price": Decimal("12.00"),
                "quantity": Decimal("1"),
                "unit": "L",
            },
        ]
    )

    result = compare_products(
        request.products
    )

    assert result["comparison_unit"] == "L"

    assert (
        result["products"][0]["unit_price"]
        == Decimal("12.00")
    )

    assert (
        result["products"][1]["unit_price"]
        == Decimal("16.00")
    )


def test_incompatible_units():
    request = ComparisonRequest(
        products=[
            {
                "name": "Arroz",
                "price": Decimal("10.00"),
                "quantity": Decimal("1"),
                "unit": "kg",
            },
            {
                "name": "Leite",
                "price": Decimal("5.00"),
                "quantity": Decimal("1"),
                "unit": "L",
            },
        ]
    )

    with pytest.raises(ValueError):
        compare_products(
            request.products
        )


def test_minimum_two_products():
    with pytest.raises(ValueError):
        request = ComparisonRequest(
            products=[
                {
                    "name": "Arroz",
                    "price": Decimal("10.00"),
                    "quantity": Decimal("1"),
                    "unit": "kg",
                }
            ]
        )

        compare_products(
            request.products
        )


def test_maximum_five_products():
    products = []

    for index in range(6):
        products.append(
            {
                "name": f"Produto {index}",
                "price": Decimal("10.00"),
                "quantity": Decimal("1"),
                "unit": "kg",
            }
        )

    with pytest.raises(ValueError):
        request = ComparisonRequest(
            products=products
        )

        compare_products(
            request.products
        )


def test_equal_prices():
    request = ComparisonRequest(
        products=[
            {
                "name": "Produto A",
                "price": Decimal("10.00"),
                "quantity": Decimal("1"),
                "unit": "kg",
            },
            {
                "name": "Produto B",
                "price": Decimal("20.00"),
                "quantity": Decimal("2"),
                "unit": "kg",
            },
            {
                "name": "Produto C",
                "price": Decimal("15.00"),
                "quantity": Decimal("1"),
                "unit": "kg",
            },
        ]
    )

    result = compare_products(
        request.products
    )

    assert result["products"][0]["position"] == 1
    assert result["products"][1]["position"] == 1
    assert result["products"][2]["position"] == 3