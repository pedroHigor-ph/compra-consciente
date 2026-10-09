import logging

from fastapi import APIRouter, HTTPException

from app.database import test_connection


logger = logging.getLogger(__name__)

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

    except Exception:
        # O detalhe do erro vai para o log; não é exposto ao público
        # (poderia revelar host, usuário ou opções de conexão).
        logger.exception("Falha ao conectar ao banco de dados.")

        raise HTTPException(
            status_code=503,
            detail="Banco de dados indisponível."
        )

    return {
        "status": "ok",
        "database": "connected"
    }
