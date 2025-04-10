from typing import Any

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_current_user
from app.crud.cart import cart
from app.crud.product import product
from app.db.session import get_db
from app.schemas.cart import Cart, CartItem, CartItemCreate, CartItemUpdate
from app.schemas.user import User

router = APIRouter()


@router.get("/me", response_model=Cart)
def get_my_cart(
    *,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get current user's active cart.
    """
    # Get existing cart or create new one
    user_cart = cart.get_user_active_cart(db, user_id=current_user.id)
    if not user_cart:
        user_cart = cart.create_user_cart(db, user_id=current_user.id)

    return user_cart


@router.post("/items", response_model=CartItem)
def add_item_to_cart(
    *,
    db: Session = Depends(get_db),
    item_in: CartItemCreate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """Add an item to the user's cart."""
    # Validate the product exists and is active
    prod = product.get(db, id=item_in.product_id)
    if not prod or not prod.is_active:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product not found or inactive",
        )

    # Validate the variant exists
    variant = product.get_variant(db, id=item_in.variant_id)
    if not variant or variant.product_id != item_in.product_id:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Product variant not found or doesn't belong to this product",
        )

    # Check stock
    if variant.stock < item_in.quantity:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Not enough stock. Available: {variant.stock}",
        )

    # Get or create cart
    user_cart = cart.get_user_active_cart(db, user_id=current_user.id)
    if not user_cart:
        user_cart = cart.create_user_cart(db, user_id=current_user.id)

    # Add item to cart
    return cart.add_item_to_cart(
        db, cart_id=user_cart.id, item_in=item_in, price=prod.price, variant=variant
    )


@router.put("/items/{item_id}", response_model=CartItem)
def update_cart_item(
    *,
    db: Session = Depends(get_db),
    item_id: int,
    item_in: CartItemUpdate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Update quantity of an item in the cart.
    """
    # Get the cart item
    cart_item = db.query(CartItem).filter(CartItem.id == item_id).first()
    if not cart_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart item not found",
        )

    # Verify cart belongs to user
    user_cart = cart.get_user_active_cart(db, user_id=current_user.id)
    if not user_cart or cart_item.cart_id != user_cart.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not your cart item",
        )

    # Check product stock if increasing quantity
    if item_in.quantity and item_in.quantity > cart_item.quantity:
        prod = product.get(db, id=cart_item.product_id)
        additional_qty = item_in.quantity - cart_item.quantity
        if prod.stock < additional_qty:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Not enough stock. Available: {prod.stock}",
            )

    # Update the cart item
    return cart.update_cart_item(db, item_id=item_id, item_in=item_in)


@router.delete("/items/{item_id}", response_model=CartItem)
def remove_cart_item(
    *,
    db: Session = Depends(get_db),
    item_id: int,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Remove an item from the cart.
    """
    # Get the cart item
    cart_item = db.query(CartItem).filter(CartItem.id == item_id).first()
    if not cart_item:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Cart item not found",
        )

    # Verify cart belongs to user
    user_cart = cart.get_user_active_cart(db, user_id=current_user.id)
    if not user_cart or cart_item.cart_id != user_cart.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not your cart item",
        )

    # Remove the cart item
    return cart.remove_cart_item(db, item_id=item_id)


@router.delete("/clear", response_model=Cart)
def clear_cart(
    *,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Clear all items from the cart.
    """
    # Get the user's cart
    user_cart = cart.get_user_active_cart(db, user_id=current_user.id)
    if not user_cart:
        # Create empty cart if none exists
        return cart.create_user_cart(db, user_id=current_user.id)

    # Clear the cart
    cart.clear_cart(db, cart_id=user_cart.id)

    # Return the empty cart
    return cart.get_user_active_cart(db, user_id=current_user.id)
