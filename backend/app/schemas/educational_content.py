from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict


EducationalCategory = Literal[
    "consumo",
    "sustentabilidade",
    "planejamento",
    "desperdicio",
    "educacao",
    "outros",
]


class EducationalContentSummary(BaseModel):
    id: int
    title: str
    slug: str
    summary: str
    category: EducationalCategory
    published: bool

    model_config = ConfigDict(
        from_attributes=True
    )


class EducationalContentResponse(BaseModel):
    id: int
    title: str
    slug: str
    summary: str
    content: str
    category: EducationalCategory
    published: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(
        from_attributes=True
    )