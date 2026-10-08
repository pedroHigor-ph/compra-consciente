from typing import Literal

from pydantic import BaseModel, Field, field_validator


FeedbackContext = Literal[
    "comparador",
    "economia",
    "aprenda",
    "catalogo",
    "oficina",
    "outros",
]


class FeedbackCreate(BaseModel):
    rating: int = Field(
        ge=1,
        le=5
    )

    comment: str | None = Field(
        default=None,
        max_length=1000
    )

    activity_context: FeedbackContext

    @field_validator("comment")
    @classmethod
    def validate_comment(
        cls,
        value: str | None
    ) -> str | None:

        if value is None:
            return None

        value = value.strip()

        if not value:
            return None

        return value


class FeedbackResponse(BaseModel):
    message: str