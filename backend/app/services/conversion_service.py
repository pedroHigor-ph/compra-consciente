from decimal import Decimal


UNIT_DIMENSIONS = {
    "g": "mass",
    "kg": "mass",
    "ml": "volume",
    "L": "volume",
    "un": "unit",
}


BASE_UNITS = {
    "mass": "kg",
    "volume": "L",
    "unit": "un",
}


CONVERSION_FACTORS = {
    "g": Decimal("0.001"),
    "kg": Decimal("1"),
    "ml": Decimal("0.001"),
    "L": Decimal("1"),
    "un": Decimal("1"),
}


def get_dimension(unit: str) -> str:
    try:
        return UNIT_DIMENSIONS[unit]
    except KeyError:
        raise ValueError(f"Unidade inválida: {unit}")


def normalize_quantity(
    quantity: Decimal,
    unit: str
) -> tuple[Decimal, str]:
    dimension = get_dimension(unit)

    factor = CONVERSION_FACTORS[unit]
    normalized_quantity = quantity * factor

    base_unit = BASE_UNITS[dimension]

    return normalized_quantity, base_unit