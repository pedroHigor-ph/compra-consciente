from sqlalchemy import BigInteger, Boolean, DateTime, Enum, String, Text, func, text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class EducationalContent(Base):
    __tablename__ = "educational_contents"

    id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True
    )

    title: Mapped[str] = mapped_column(
        String(150),
        nullable=False
    )

    slug: Mapped[str] = mapped_column(
        String(150),
        nullable=False,
        unique=True
    )

    summary: Mapped[str] = mapped_column(
        String(255),
        nullable=False
    )

    content: Mapped[str] = mapped_column(
        Text,
        nullable=False
    )

    category: Mapped[str] = mapped_column(
        Enum(
            "consumo",
            "sustentabilidade",
            "planejamento",
            "desperdicio",
            "educacao",
            "outros",
            name="educational_content_category",
            native_enum=False
        ),
        nullable=False
    )

    published: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        server_default=text("true")
    )

    created_at: Mapped[object] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP")
    )

    updated_at: Mapped[object] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP"),
        onupdate=func.now(),
    )
