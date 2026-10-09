from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    DATABASE_URL: str | None = None
    POSTGRES_URL: str | None = None
    POSTGRES_PRISMA_URL: str | None = None

    # Um ou mais domínios do frontend, separados por vírgula (sem barra no final).
    FRONTEND_URL: str = "http://localhost:5173"

    # Opcional: regex para liberar também os deploys de preview da Vercel.
    # Ex.: https://compra-consciente-frontend.*\.vercel\.app
    FRONTEND_ORIGIN_REGEX: str | None = None

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )


settings = Settings()
