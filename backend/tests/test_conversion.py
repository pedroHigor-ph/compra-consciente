from decimal import Decimal

import pytest

from app.services.conversion_service import normalize_quantity


def test_grams_to_kg():
    quantity, unit = normalize_quantity(
        Decimal("500"),
        "g"
    )

    assert quantity == Decimal("0.500")
    assert unit == "kg"


def test_kg_stays_kg():
    quantity, unit = normalize_quantity(
        Decimal("2"),
        "kg"
    )

    assert quantity == Decimal("2")
    assert unit == "kg"


def test_ml_to_liters():
    quantity, unit = normalize_quantity(
        Decimal("500"),
        "ml"
    )

    assert quantity == Decimal("0.500")
    assert unit == "L"


def test_liters_stay_liters():
    quantity, unit = normalize_quantity(
        Decimal("2"),
        "L"
    )

    assert quantity == Decimal("2")
    assert unit == "L"


def test_units_stay_units():
    quantity, unit = normalize_quantity(
        Decimal("10"),
        "un"
    )

    assert quantity == Decimal("10")
    assert unit == "un"


def test_invalid_unit():
    with pytest.raises(ValueError):
        normalize_quantity(
            Decimal("100"),
            "invalid"
        )