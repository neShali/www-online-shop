from datetime import datetime
from typing import Optional

from pydantic import BaseModel, ConfigDict, field_validator


# Shared properties
class ReviewBase(BaseModel):
    product_id: Optional[int] = None
    rating: Optional[float] = None
    comment: Optional[str] = None


# Properties to receive via API on creation
class ReviewCreate(ReviewBase):
    product_id: int
    rating: float

    @field_validator("rating")
    def rating_must_be_valid(cls, v):
        if v < 1 or v > 5:
            raise ValueError("Rating must be between 1 and 5")
        return v


# Properties to receive via API on update
class ReviewUpdate(ReviewBase):
    pass


# Properties shared by models stored in DB
class ReviewInDBBase(ReviewBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# Properties to return to client
class Review(ReviewInDBBase):
    pass
