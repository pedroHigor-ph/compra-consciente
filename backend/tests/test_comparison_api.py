from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_create_comparison():
    response = client.post(
        "/api/v1/comparisons",
        json={
            "products": [
                {
                    "name": "Arroz A",
                    "price": 15.00,
                    "quantity": 500,
                    "unit": "g",
                },
                {
                    "name": "Arroz B",
                    "price": 22.00,
                    "quantity": 1,
                    "unit": "kg",
                },
            ]
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["comparison_unit"] == "kg"

    assert (
        data["lowest_unit_price"]["name"]
        == "Arroz B"
    )

    assert (
        data["lowest_unit_price"]["unit_price"]
        == 22.0
    )


def test_comparison_with_one_product():
    response = client.post(
        "/api/v1/comparisons",
        json={
            "products": [
                {
                    "name": "Arroz",
                    "price": 15.00,
                    "quantity": 1,
                    "unit": "kg",
                }
            ]
        }
    )

    assert response.status_code == 422


def test_comparison_with_incompatible_units():
    response = client.post(
        "/api/v1/comparisons",
        json={
            "products": [
                {
                    "name": "Arroz",
                    "price": 15.00,
                    "quantity": 1,
                    "unit": "kg",
                },
                {
                    "name": "Leite",
                    "price": 5.00,
                    "quantity": 1,
                    "unit": "L",
                },
            ]
        }
    )

    assert response.status_code == 422