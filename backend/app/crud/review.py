from typing import List, Optional

from sqlalchemy import func
from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.review import Review
from app.schemas.review import ReviewCreate, ReviewUpdate


class CRUDReview(CRUDBase[Review, ReviewCreate, ReviewUpdate]):
    def create_with_user(
        self, db: Session, *, obj_in: ReviewCreate, user_id: int
    ) -> Review:
        """
        Create a review with user_id
        """
        db_obj = Review(**obj_in.dict(), user_id=user_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def get_by_product(
        self, db: Session, *, product_id: int, skip: int = 0, limit: int = 100
    ) -> List[Review]:
        """
        Get reviews for a product with pagination
        """
        return (
            db.query(Review)
            .filter(Review.product_id == product_id)
            .order_by(Review.created_at.desc())
            .offset(skip)
            .limit(limit)
            .all()
        )

    def get_average_rating(self, db: Session, *, product_id: int) -> Optional[float]:
        """
        Get the average rating for a product
        """
        result = (
            db.query(func.avg(Review.rating))
            .filter(Review.product_id == product_id)
            .scalar()
        )
        return float(result) if result else None


review = CRUDReview(Review)
