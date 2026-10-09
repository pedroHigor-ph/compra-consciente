from sqlalchemy import BigInteger, DateTime, SmallInteger, text
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class ComparisonEvent(Base):
    __tablename__ = "comparison_events"

    id: Mapped[int] = mapped_column(
        BigInteger,
        primary_key=True,
        autoincrement=True
    )

    number_of_products: Mapped[int] = mapped_column(
        SmallInteger,
        nullable=False
    )

    created_at: Mapped[object] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=text("CURRENT_TIMESTAMP")
    )
