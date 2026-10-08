from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.product import Product
from app.schemas.product import ProductResponse


router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


@router.get(
    "",
    response_model=list[ProductResponse]
)
def list_products(
    category_id: int | None = Query(
        default=None,
        gt=0
    ),
    search: str | None = Query(
        default=None,
        min_length=1,
        max_length=100
    ),
    db: Session = Depends(get_db)
):
    statement = select(Product)

    if category_id is not None:
        statement = statement.where(
            Product.category_id == category_id
        )

    if search is not None:
        search_term = f"%{search.strip()}%"

        statement = statement.where(
            Product.name.ilike(search_term)
        )

    statement = statement.order_by(Product.name)

    products = db.scalars(statement).all()

    return products


@router.get(
    "/{product_id}",
    response_model=ProductResponse
)
def get_product(
    product_id: int,
    db: Session = Depends(get_db)
):
    statement = (
        select(Product)
        .where(Product.id == product_id)
    )

    product = db.scalar(statement)

    if product is None:
        raise HTTPException(
            status_code=404,
            detail="Produto não encontrado."
        )

    return product