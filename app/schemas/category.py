from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict


# Shared properties
class CategoryBase(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    parent_id: Optional[int] = None


# Properties to receive via API on creation
class CategoryCreate(CategoryBase):
    name: str


# Properties to receive via API on update
class CategoryUpdate(CategoryBase):
    pass


# Properties shared by models stored in DB
class CategoryInDBBase(CategoryBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# Properties to return to client
class Category(CategoryInDBBase):
    pass


# Recursive model for hierarchical categories
class CategoryWithChildren(Category):
    children: List["CategoryWithChildren"] = []
