from fastapi import APIRouter

from app.database import test_connection


router = APIRouter()


@router.get("/health")
def health_check():
    return {
        "status": "ok"
    }


@router.get("/health/db")
def database_health_check():
    try:
        test_connection()

        return {
            "status": "ok",
            "database": "connected"
        }

    except Exception as error:
        return {
            "status": "error",
            "database": "disconnected",
            "detail": str(error)
        }