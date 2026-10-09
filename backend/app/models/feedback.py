from sqlalchemy import BigInteger, DateTime, Enum, SmallInteger, Text, text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Feedback(Base):
    __tablename__ = "feedbacks"

    id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True
    )

    rating: Mapped[int] = mapped_column(
        SmallInteger,
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
            name="feedback_activity_context",
            native_enum=False
        ),
        nullable=False
    )

    created_at: Mapped[object] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP")
    )
