from fastapi.testclient import TestClient

from app.main import app


client = TestClient(app)


def test_list_educational_contents():
    response = client.get(
        "/api/v1/educational-contents"
    )

    assert response.status_code == 200

    data = response.json()

    assert isinstance(data, list)


def test_get_nonexistent_educational_content():
    response = client.get(
        "/api/v1/educational-contents/"
        "conteudo-que-nao-existe"
    )

    assert response.status_code == 404