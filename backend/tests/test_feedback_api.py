from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_invalid_feedback_rating():
    response = client.post(
        "/api/v1/feedbacks",
        json={
            "rating": 6,
            "comment": "Teste",
            "activity_context": "oficina"
        }
    )

    assert response.status_code == 422


def test_invalid_feedback_context():
    response = client.post(
        "/api/v1/feedbacks",
        json={
            "rating": 5,
            "comment": "Teste",
            "activity_context": "invalido"
        }
    )

    assert response.status_code == 422