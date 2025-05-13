from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_active_superuser
from app.crud.category import category
from app.db.session import get_db
from app.schemas.category import (
    Category,
    CategoryCreate,
    CategoryUpdate,
    CategoryWithChildren,
)

router = APIRouter()


@router.get("/", response_model=List[Category])
def list_categories(
    *,
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
) -> Any:
    """
    Retrieve all categories.
    """
    return category.get_multi(db, skip=skip, limit=limit)


@router.get("/tree", response_model=List[CategoryWithChildren])
def list_category_tree(
    *,
    db: Session = Depends(get_db),
) -> Any:
    """
    Retrieve category tree structure (root categories with children).
    """
    return category.get_root_categories(db)


@router.get("/{category_id}", response_model=Category)
def get_category(
    *,
    db: Session = Depends(get_db),
    category_id: int,
) -> Any:
    """
    Get category by ID.
    """
    result = category.get(db, id=category_id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )
    return result


@router.post("/", response_model=Category)
def create_category(
    *,
    db: Session = Depends(get_db),
    category_in: CategoryCreate,
    current_user: Any = Depends(get_current_active_superuser),
) -> Any:
    """
    Create new category (admin only).
    """
    # If parent_id is provided, verify parent exists
    if category_in.parent_id is not None:
        parent = category.get(db, id=category_in.parent_id)
        if not parent:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Parent category not found",
            )

    # Check for duplicate name
    if category.get_by_name(db, name=category_in.name):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Category with this name already exists",
        )

    return category.create(db, obj_in=category_in)


@router.put("/{category_id}", response_model=Category)
def update_category(
    *,
    db: Session = Depends(get_db),
    category_id: int,
    category_in: CategoryUpdate,
    current_user: Any = Depends(get_current_active_superuser),
) -> Any:
    """
    Update a category (admin only).
    """
    result = category.get(db, id=category_id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )

    # If parent_id is provided, verify parent exists and is not self
    if category_in.parent_id is not None:
        if category_in.parent_id == category_id:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Category cannot be its own parent",
            )

        parent = category.get(db, id=category_in.parent_id)
        if not parent:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Parent category not found",
            )

    # Check for duplicate name
    if category_in.name and category_in.name != result.name:
        existing = category.get_by_name(db, name=category_in.name)
        if existing:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Category with this name already exists",
            )

    return category.update(db, db_obj=result, obj_in=category_in)


@router.delete("/{category_id}", response_model=Category)
def delete_category(
    *,
    db: Session = Depends(get_db),
    category_id: int,
    current_user: Any = Depends(get_current_active_superuser),
) -> Any:
    """
    Delete a category (admin only).
    This will also delete all child categories due to cascade.
    """
    result = category.get(db, id=category_id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )

    return category.remove(db, id=category_id)
