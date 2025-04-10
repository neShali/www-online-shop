from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_active_superuser, get_current_user
from app.crud.product import product
from app.crud.review import review
from app.db.session import get_db
from app.schemas.review import Review, ReviewCreate, ReviewUpdate
from app.schemas.user import User

router = APIRouter()


@router.get("/product/{product_id}", response_model=List[Review])
def list_product_reviews(
    *,
    db: Session = Depends(get_db),
    product_id: int,
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve reviews for a product.
    """
    # Check if product exists
    prod = product.get(db, id=product_id)
    if not prod:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    return review.get_by_product(db, product_id=product_id, skip=skip, limit=limit)


@router.get("/avg/{product_id}")
def get_product_average_rating(
    *,
    db: Session = Depends(get_db),
    product_id: int,
) -> Any:
    """
    Get average rating for a product.
    """
    # Check if product exists
    prod = product.get(db, id=product_id)
    if not prod:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    avg_rating = review.get_average_rating(db, product_id=product_id)

    return {"product_id": product_id, "average_rating": avg_rating or 0}


@router.post("/", response_model=Review)
def create_review(
    *,
    db: Session = Depends(get_db),
    review_in: ReviewCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Create a review for a product.
    """
    # Check if product exists
    prod = product.get(db, id=review_in.product_id)
    if not prod:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    # Check if user already reviewed this product
    existing_reviews = review.get_by_product(db, product_id=review_in.product_id)
    for r in existing_reviews:
        if r.user_id == current_user.id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="You have already reviewed this product",
            )

    return review.create_with_user(db, obj_in=review_in, user_id=current_user.id)


@router.put("/{review_id}", response_model=Review)
def update_review(
    *,
    db: Session = Depends(get_db),
    review_id: int,
    review_in: ReviewUpdate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Update a review.
    """
    result = review.get(db, id=review_id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found",
        )

    # Only allow the review owner or admin to update
    if result.user_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )

    return review.update(db, db_obj=result, obj_in=review_in)


@router.delete("/{review_id}", response_model=Review)
def delete_review(
    *,
    db: Session = Depends(get_db),
    review_id: int,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Delete a review.
    """
    result = review.get(db, id=review_id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Review not found",
        )

    # Only allow the review owner or admin to delete
    if result.user_id != current_user.id and not current_user.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not enough permissions",
        )

    return review.remove(db, id=review_id)
