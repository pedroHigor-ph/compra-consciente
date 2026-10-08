from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.categories import router as categories_router
from app.api.routes.comparisons import router as comparisons_router
from app.api.routes.educational_contents import (
    router as educational_contents_router,
)
from app.api.routes.feedbacks import router as feedbacks_router
from app.api.routes.health import router as health_router
from app.api.routes.products import router as products_router
from app.api.routes.savings import router as savings_router


app = FastAPI(
    title="Compra Consciente API",
    description="API do projeto de extensão Compra Consciente",
    version="1.0.0"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(
    health_router,
    prefix="/api/v1"
)

app.include_router(
    categories_router,
    prefix="/api/v1"
)

app.include_router(
    products_router,
    prefix="/api/v1"
)

app.include_router(
    comparisons_router,
    prefix="/api/v1"
)

app.include_router(
    savings_router,
    prefix="/api/v1"
)

app.include_router(
    educational_contents_router,
    prefix="/api/v1"
)

app.include_router(
    feedbacks_router,
    prefix="/api/v1"
)