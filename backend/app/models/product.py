from typing import TYPE_CHECKING

from sqlalchemy import Enum, ForeignKey, Numeric, String, Text
from sqlalchemy.dialects.mysql import INTEGER, TIMESTAMP
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


if TYPE_CHECKING:
    from app.models.category import Category


class Product(Base):
    __tablename__ = "products"

    id: Mapped[int] = mapped_column(
        INTEGER(unsigned=True),
        primary_key=True,
        autoincrement=True
    )

    category_id: Mapped[int] = mapped_column(
        INTEGER(unsigned=True),
        ForeignKey(
            "categories.id",
            onupdate="CASCADE",
            ondelete="RESTRICT"
        ),
        nullable=False
    )

    name: Mapped[str] = mapped_column(
        String(100),
        nullable=False
    )

    description: Mapped[str | None] = mapped_column(
        Text,
        nullable=True
    )

    price: Mapped[float] = mapped_column(
        Numeric(10, 2),
        nullable=False
    )

    quantity: Mapped[float] = mapped_column(
        Numeric(10, 3),
        nullable=False
    )

    unit: Mapped[str] = mapped_column(
        Enum("g", "kg", "ml", "L", "un", name="product_unit"),
        nullable=False
    )

    created_at: Mapped[object] = mapped_column(
        TIMESTAMP,
        nullable=False,
        server_default="CURRENT_TIMESTAMP"
    )

    updated_at: Mapped[object] = mapped_column(
        TIMESTAMP,
        nullable=False,
        server_default="CURRENT_TIMESTAMP",
        server_onupdate="CURRENT_TIMESTAMP"
    )

    category: Mapped["Category"] = relationship(
        back_populates="products"
    )