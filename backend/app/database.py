from sqlalchemy import create_engine, text
from sqlalchemy.engine import make_url
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.core.config import settings


_database_url = (
    settings.DATABASE_URL or settings.POSTGRES_URL or settings.POSTGRES_PRISMA_URL
    or "postgresql+psycopg://postgres:postgres@localhost:5432/compra_consciente"
)
_parsed_url = make_url(_database_url)
if _parsed_url.drivername in {"postgres", "postgresql", "postgresql+psycopg2"}:
    _parsed_url = _parsed_url.set(drivername="postgresql+psycopg")


engine = create_engine(
    _parsed_url,
    pool_pre_ping=True,
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
