import math
from typing import Any, Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_active_superuser, get_current_user
from app.crud.category import category
from app.crud.product import product
from app.db.session import get_db
from app.schemas.product import Product, ProductCreate, ProductList, ProductUpdate

router = APIRouter()


@router.get("/", response_model=ProductList)
def list_products(
    *,
    db: Session = Depends(get_db),
    page: int = Query(1, ge=1, description="Page number"),
    size: int = Query(10, ge=1, le=100, description="Page size"),
    category_id: Optional[int] = Query(None, description="Filter by category ID"),
    min_price: Optional[float] = Query(None, ge=0, description="Minimum price"),
    max_price: Optional[float] = Query(None, ge=0, description="Maximum price"),
    search: Optional[str] = Query(None, description="Search term"),
    # ─────────── добавляем ───────────
    variant_size: Optional[str] = Query(
        None, description="Filter by variant size (e.g. S, M, L)"
    ),
    variant_color: Optional[str] = Query(
        None, description="Filter by variant color (e.g. red, blue)"
    ),
) -> Any:
    """
    Retrieve products with filtering (category, price, search, size, color)
    and pagination.
    """
    skip = (page - 1) * size

    products = product.get_multi(
        db,
        skip=skip,
        limit=size,
        category_id=category_id,
        min_price=min_price,
        max_price=max_price,
        search=search,
        size=variant_size,        # ← прокидываем
        color=variant_color,      # ← прокидываем
    )

    total = product.get_count(
        db,
        category_id=category_id,
        min_price=min_price,
        max_price=max_price,
        search=search,
        size=variant_size,        # ← тоже сюда
        color=variant_color,
    )

    return {
        "items": products,
        "total": total,
        "page": page,
        "size": size,
        "pages": math.ceil(total / size),
    }


@router.get("/{product_id}", response_model=Product)
def get_product(
    *,
    db: Session = Depends(get_db),
    product_id: int,
) -> Any:
    """
    Get product by ID.
    """
    result = product.get(db, id=product_id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )
    return result


@router.post("/", response_model=Product)
def create_product(
    *,
    db: Session = Depends(get_db),
    product_in: ProductCreate,
    current_user: Any = Depends(get_current_active_superuser),
) -> Any:
    """
    Create new product (admin only).
    """
    # Verify category exists
    cat = category.get(db, id=product_in.category_id)
    if not cat:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Category not found",
        )

    return product.create(db, obj_in=product_in)


@router.put("/{product_id}", response_model=Product)
def update_product(
    *,
    db: Session = Depends(get_db),
    product_id: int,
    product_in: ProductUpdate,
    current_user: Any = Depends(get_current_active_superuser),
) -> Any:
    """
    Update a product (admin only).
    """
    # Get existing product
    result = product.get(db, id=product_id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    # Verify category exists if changing category
    if product_in.category_id is not None:
        cat = category.get(db, id=product_in.category_id)
        if not cat:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Category not found",
            )

    return product.update(db, db_obj=result, obj_in=product_in)


@router.delete("/{product_id}", response_model=Product)
def delete_product(
    *,
    db: Session = Depends(get_db),
    product_id: int,
    current_user: Any = Depends(get_current_active_superuser),
) -> Any:
    """
    Delete a product (admin only).
    """
    result = product.get(db, id=product_id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    return product.remove(db, id=product_id)
