from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.database import get_db
from app.schemas.feedback import (
    FeedbackCreate,
    FeedbackResponse,
)
from app.services.feedback_service import create_feedback


router = APIRouter(
    prefix="/feedbacks",
    tags=["Feedbacks"]
)


@router.post(
    "",
    response_model=FeedbackResponse,
    status_code=201
)
def create_feedback_endpoint(
    data: FeedbackCreate,
    db: Session = Depends(get_db)
):
    try:
        create_feedback(
            db=db,
            data=data
        )

        return {
            "message": "Feedback enviado com sucesso."
        }

    except SQLAlchemyError:
        raise HTTPException(
            status_code=500,
            detail="Não foi possível salvar o feedback."
        )