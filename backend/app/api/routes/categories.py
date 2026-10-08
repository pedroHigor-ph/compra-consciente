from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.category import Category
from app.schemas.category import CategoryResponse


router = APIRouter(
    prefix="/categories",
    tags=["Categories"]
)


@router.get(
    "",
    response_model=list[CategoryResponse]
)
def list_categories(
    db: Session = Depends(get_db)
):
    statement = (
        select(Category)
        .order_by(Category.name)
    )

    categories = db.scalars(statement).all()

    return categories


@router.get(
    "/{category_id}",
    response_model=CategoryResponse
)
def get_category(
    category_id: int,
    db: Session = Depends(get_db)
):
    statement = (
        select(Category)
        .where(Category.id == category_id)
    )

    category = db.scalar(statement)

    if category is None:
        raise HTTPException(
            status_code=404,
            detail="Categoria não encontrada."
        )

    return category