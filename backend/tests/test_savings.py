from decimal import Decimal
import pytest

from app.schemas.savings import SavingsRequest
from app.services.savings_service import calculate_savings


def test_calculate_savings():
    request = SavingsRequest(
        current_price=Decimal("10.00"),
        alternative_price=Decimal("8.50"),
        monthly_purchases=4
    )

    result = calculate_savings(request)

    assert result["saving_per_purchase"] == 1.50
    assert result["monthly_saving"] == 6.00
    assert result["annual_saving"] == 72.00
    assert result["alternative_is_cheaper"] is True


def test_more_expensive_alternative():
    request = SavingsRequest(
        current_price=Decimal("8.00"),
        alternative_price=Decimal("10.00"),
        monthly_purchases=4
    )

    result = calculate_savings(request)

    assert result["saving_per_purchase"] == 0.0
    assert result["monthly_saving"] == 0.0
    assert result["annual_saving"] == 0.0
    assert result["alternative_is_cheaper"] is False


def test_same_price():
    request = SavingsRequest(
        current_price=Decimal("10.00"),
        alternative_price=Decimal("10.00"),
        monthly_purchases=4
    )

    result = calculate_savings(request)

    assert result["saving_per_purchase"] == 0.0
    assert result["monthly_saving"] == 0.0
    assert result["annual_saving"] == 0.0
    assert result["alternative_is_cheaper"] is False

def test_current_price_must_be_positive():
    with pytest.raises(ValueError):
        SavingsRequest(
            current_price=Decimal("0"),
            alternative_price=Decimal("8.00"),
            monthly_purchases=4
        )


def test_alternative_price_must_be_positive():
    with pytest.raises(ValueError):
        SavingsRequest(
            current_price=Decimal("10.00"),
            alternative_price=Decimal("0"),
            monthly_purchases=4
        )


def test_monthly_purchases_must_be_positive():
    with pytest.raises(ValueError):
        SavingsRequest(
            current_price=Decimal("10.00"),
            alternative_price=Decimal("8.00"),
            monthly_purchases=0
        )