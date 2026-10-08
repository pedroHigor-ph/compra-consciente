from sqlalchemy import Enum, Text
from sqlalchemy.dialects.mysql import INTEGER, TIMESTAMP, TINYINT
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Feedback(Base):
    __tablename__ = "feedbacks"

    id: Mapped[int] = mapped_column(
        INTEGER(unsigned=True),
        primary_key=True,
        autoincrement=True
    )

    rating: Mapped[int] = mapped_column(
        TINYINT(unsigned=True),
        nullable=False
    )

    comment: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    activity_context: Mapped[str] = mapped_column(
        Enum(
            "comparador",
            "economia",
            "aprenda",
            "catalogo",
            "oficina",
            "outros",
            name="feedback_activity_context"
        ),
        nullable=False
    )

    created_at: Mapped[object] = mapped_column(
        TIMESTAMP,
        nullable=False,
        server_default="CURRENT_TIMESTAMP"
    )