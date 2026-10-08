from sqlalchemy.dialects.mysql import BIGINT, TIMESTAMP, TINYINT
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class ComparisonEvent(Base):
    __tablename__ = "comparison_events"

    id: Mapped[int] = mapped_column(
        BIGINT(unsigned=True),
        primary_key=True,
        autoincrement=True
    )

    number_of_products: Mapped[int] = mapped_column(
        TINYINT(unsigned=True),
        nullable=False
    )

    created_at: Mapped[object] = mapped_column(
        TIMESTAMP,
        nullable=False,
        server_default="CURRENT_TIMESTAMP"
    )