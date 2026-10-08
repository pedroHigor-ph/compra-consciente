from decimal import Decimal, ROUND_HALF_UP

from app.schemas.savings import SavingsRequest


def round_money(value: Decimal) -> Decimal:
    return value.quantize(
        Decimal("0.01"),
        rounding=ROUND_HALF_UP
    )


def calculate_savings(
    request: SavingsRequest
) -> dict:

    current_price = request.current_price
    alternative_price = request.alternative_price
    monthly_purchases = request.monthly_purchases

    if alternative_price < current_price:
        saving_per_purchase = (
            current_price - alternative_price
        )

        monthly_saving = (
            saving_per_purchase * monthly_purchases
        )

        annual_saving = (
            monthly_saving * 12
        )

        return {
            "current_price": float(
                round_money(current_price)
            ),
            "alternative_price": float(
                round_money(alternative_price)
            ),
            "monthly_purchases": monthly_purchases,
            "saving_per_purchase": float(
                round_money(saving_per_purchase)
            ),
            "monthly_saving": float(
                round_money(monthly_saving)
            ),
            "annual_saving": float(
                round_money(annual_saving)
            ),
            "alternative_is_cheaper": True,
            "message": None
        }

    return {
        "current_price": float(
            round_money(current_price)
        ),
        "alternative_price": float(
            round_money(alternative_price)
        ),
        "monthly_purchases": monthly_purchases,
        "saving_per_purchase": 0.0,
        "monthly_saving": 0.0,
        "annual_saving": 0.0,
        "alternative_is_cheaper": False,
        "message": (
            "A alternativa informada possui "
            "custo maior ou igual ao preço atual."
        )
    }