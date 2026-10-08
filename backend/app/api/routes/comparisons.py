from fastapi import APIRouter, HTTPException

from app.schemas.comparison import (
    ComparisonRequest,
    ComparisonResponse,
)
from app.services.comparison_service import compare_products


router = APIRouter(
    prefix="/comparisons",
    tags=["Comparisons"]
)


@router.post(
    "",
    response_model=ComparisonResponse
)
def create_comparison(
    request: ComparisonRequest
):
    try:
        result = compare_products(
            request.products
        )

        return result

    except ValueError as error:
        raise HTTPException(
            status_code=422,
            detail=str(error)
        )