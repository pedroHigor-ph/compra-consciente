from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.models.feedback import Feedback
from app.schemas.feedback import FeedbackCreate


def create_feedback(
    db: Session,
    data: FeedbackCreate
) -> Feedback:

    feedback = Feedback(
        rating=data.rating,
        comment=data.comment,
        activity_context=data.activity_context
    )

    try:
        db.add(feedback)
        db.commit()
        db.refresh(feedback)

        return feedback

    except SQLAlchemyError:
        db.rollback()
        raise