import os

from sqlalchemy import create_engine, text
from sqlalchemy.engine import make_url
from sqlalchemy.orm import DeclarativeBase, sessionmaker
from sqlalchemy.pool import NullPool

from app.core.config import settings


# A Vercel define a variável VERCEL em todos os ambientes (preview e produção).
IS_SERVERLESS = bool(os.getenv("VERCEL"))

_database_url = (
    settings.DATABASE_URL
    or settings.POSTGRES_URL
    or settings.POSTGRES_PRISMA_URL
)

if not _database_url:
    if IS_SERVERLESS:
        # Falha na inicialização com uma mensagem clara, em vez de tentar
        # conectar em localhost e só errar na primeira consulta.
        raise RuntimeError(
            "DATABASE_URL não está configurada. "
            "Cadastre a variável no painel da Vercel (Settings > Environment Variables)."
        )

    # Fallback apenas para desenvolvimento local.
    _database_url = (
        "postgresql+psycopg://postgres:postgres@localhost:5432/compra_consciente"
    )

_parsed_url = make_url(_database_url)
if _parsed_url.drivername in {"postgres", "postgresql", "postgresql+psycopg2"}:
    _parsed_url = _parsed_url.set(drivername="postgresql+psycopg")


_engine_options = {
    "pool_pre_ping": True,
    # Compatível com o pooler do Neon (PgBouncer): evita prepared statements.
    "connect_args": {"prepare_threshold": None},
}

if IS_SERVERLESS:
    # Em funções serverless cada invocação abre e fecha a conexão;
    # o pooler do Neon (host com "-pooler") faz o reaproveitamento.
    _engine_options["poolclass"] = NullPool


engine = create_engine(
    _parsed_url,
    **_engine_options,
)


SessionLocal = sessionmaker(
    bind=engine,
    autoflush=False,
    autocommit=False
)


class Base(DeclarativeBase):
    pass


def get_db():
    db = SessionLocal()

    try:
        yield db
    finally:
        db.close()


def test_connection():
    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))
