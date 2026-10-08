from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_calculate_savings_api():
    response = client.post(
        "/api/v1/savings",
        json={
            "current_price": 10.00,
            "alternative_price": 8.50,
            "monthly_purchases": 4
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["saving_per_purchase"] == 1.5
    assert data["monthly_saving"] == 6.0
    assert data["annual_saving"] == 72.0
    assert data["alternative_is_cheaper"] is True


def test_more_expensive_alternative_api():
    response = client.post(
        "/api/v1/savings",
        json={
            "current_price": 8.00,
            "alternative_price": 10.00,
            "monthly_purchases": 4
        }
    )

    assert response.status_code == 200

    data = response.json()

    assert data["saving_per_purchase"] == 0.0
    assert data["monthly_saving"] == 0.0
    assert data["annual_saving"] == 0.0
    assert data["alternative_is_cheaper"] is False


def test_invalid_savings_api():
    response = client.post(
        "/api/v1/savings",
        json={
            "current_price": 0,
            "alternative_price": 8.50,
            "monthly_purchases": 4
        }
    )

    assert response.status_code == 422