from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.educational_content import EducationalContent
from app.schemas.educational_content import (
    EducationalCategory,
    EducationalContentResponse,
    EducationalContentSummary,
)


router = APIRouter(
    prefix="/educational-contents",
    tags=["Educational Contents"]
)


@router.get(
    "",
    response_model=list[EducationalContentSummary]
)
def list_educational_contents(
    category: EducationalCategory | None = Query(
        default=None
    ),
    db: Session = Depends(get_db)
):
    statement = (
        select(EducationalContent)
        .where(EducationalContent.published.is_(True))
        .order_by(EducationalContent.title)
    )

    if category is not None:
        statement = statement.where(
            EducationalContent.category == category
        )

    contents = db.scalars(statement).all()

    return contents


@router.get(
    "/{slug}",
    response_model=EducationalContentResponse
)
def get_educational_content(
    slug: str,
    db: Session = Depends(get_db)
):
    statement = (
        select(EducationalContent)
        .where(
            EducationalContent.slug == slug,
            EducationalContent.published.is_(True)
        )
    )

    content = db.scalar(statement)

    if content is None:
        raise HTTPException(
            status_code=404,
            detail="Conteúdo não encontrado."
        )

    return content