from datetime import datetime
from typing import Any, List

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_active_superuser
from app.crud.product import product
from app.crud.promo import promo
from app.db.session import get_db
from app.schemas.promo import (
    ProductPromo,
    ProductPromoCreate,
    Promo,
    PromoCreate,
    PromoUpdate,
)
from app.schemas.user import User

router = APIRouter()


@router.get("/", response_model=List[Promo])
def list_promos(
    *,
    db: Session = Depends(get_db),
    skip: int = 0,
    limit: int = 100,
    active_only: bool = False,
    current_user: User = Depends(get_current_active_superuser),
) -> Any:
    """
    List all promos (admin only).
    """
    if active_only:
        return promo.get_active_promos(db)
    else:
        return promo.get_multi(db, skip=skip, limit=limit)


@router.get("/active", response_model=List[Promo])
def list_active_promos(
    *,
    db: Session = Depends(get_db),
) -> Any:
    """
    List all currently active promos (public).
    """
    return promo.get_active_promos(db)


@router.get("/code/{code}", response_model=Promo)
def get_promo_by_code(
    *,
    db: Session = Depends(get_db),
    code: str,
) -> Any:
    """
    Get a promo by code.
    Only returns active, valid promos.
    """
    result = promo.get_by_code(db, code=code)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Promo not found",
        )

    # Check if promo is active and valid date range
    now = datetime.now()
    if not result.is_active or result.start_date > now or result.end_date < now:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Promo not active or expired",
        )

    return result


@router.get("/{promo_id}", response_model=Promo)
def get_promo(
    *,
    db: Session = Depends(get_db),
    promo_id: int,
    current_user: User = Depends(get_current_active_superuser),
) -> Any:
    """
    Get a promo by ID (admin only).
    """
    result = promo.get(db, id=promo_id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Promo not found",
        )

    return result


@router.post("/", response_model=Promo)
def create_promo(
    *,
    db: Session = Depends(get_db),
    promo_in: PromoCreate,
    current_user: User = Depends(get_current_active_superuser),
) -> Any:
    """
    Create a new promo (admin only).
    """
    # Check if promo code already exists
    if promo.get_by_code(db, code=promo_in.code):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Promo code already exists",
        )

    return promo.create(db, obj_in=promo_in)


@router.put("/{promo_id}", response_model=Promo)
def update_promo(
    *,
    db: Session = Depends(get_db),
    promo_id: int,
    promo_in: PromoUpdate,
    current_user: User = Depends(get_current_active_superuser),
) -> Any:
    """
    Update a promo (admin only).
    """
    result = promo.get(db, id=promo_id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Promo not found",
        )

    # Check for duplicate code if changing code
    if promo_in.code and promo_in.code != result.code:
        if promo.get_by_code(db, code=promo_in.code):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Promo code already exists",
            )

    return promo.update(db, db_obj=result, obj_in=promo_in)


@router.delete("/{promo_id}", response_model=Promo)
def delete_promo(
    *,
    db: Session = Depends(get_db),
    promo_id: int,
    current_user: User = Depends(get_current_active_superuser),
) -> Any:
    """
    Delete a promo (admin only).
    """
    result = promo.get(db, id=promo_id)
    if not result:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Promo not found",
        )

    return promo.remove(db, id=promo_id)


@router.get("/{promo_id}/products", response_model=List[ProductPromo])
def get_promo_products(
    *,
    db: Session = Depends(get_db),
    promo_id: int,
) -> Any:
    """
    Get all products associated with a promo (admin only).
    """
    # Check if promo exists
    if not promo.get(db, id=promo_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Promo not found",
        )

    return promo.get_promo_products(db, promo_id=promo_id)


@router.post("/product", response_model=ProductPromo)
def add_product_to_promo(
    *,
    db: Session = Depends(get_db),
    product_promo_in: ProductPromoCreate,
    current_user: User = Depends(get_current_active_superuser),
) -> Any:
    """
    Add a product to a promo (admin only).
    """
    # Check if promo exists
    if not promo.get(db, id=product_promo_in.promo_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Promo not found",
        )

    # Check if product exists
    if not product.get(db, id=product_promo_in.product_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    return promo.add_product_to_promo(db, obj_in=product_promo_in)


@router.delete("/product/{promo_id}/{product_id}")
def remove_product_from_promo(
    *,
    db: Session = Depends(get_db),
    promo_id: int,
    product_id: int,
    current_user: User = Depends(get_current_active_superuser),
) -> Any:
    """
    Remove a product from a promo (admin only).
    """
    # Check if promo exists
    if not promo.get(db, id=promo_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Promo not found",
        )

    # Check if product exists
    if not product.get(db, id=product_id):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found",
        )

    promo.remove_product_from_promo(db, product_id=product_id, promo_id=promo_id)

    return {"detail": "Product removed from promo"}
