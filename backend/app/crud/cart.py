from typing import Any, Dict, List, Optional

from sqlalchemy.orm import Session, joinedload

from app.crud.base import CRUDBase
from app.models.cart import Cart, CartItem
from app.models.product import Product, ProductVariant
from app.schemas.cart import CartCreate
from app.schemas.cart import CartItem as CartItemSchema
from app.models.cart import CartItem   
from app.schemas.cart import CartItemCreate, CartItemUpdate, CartUpdate


class CRUDCart(CRUDBase[Cart, CartCreate, CartUpdate]):
    def get_user_active_cart(self, db: Session, *, user_id: int) -> Optional[Cart]:
        """Get the active cart for a user with all items and their variants"""
        return (
            db.query(Cart)
            .filter(Cart.user_id == user_id, Cart.is_active == True)
            .options(joinedload(Cart.items).joinedload(CartItem.variant))
            .first()
        )

    def create_user_cart(self, db: Session, *, user_id: int) -> Cart:
        """Create a new cart for a user"""
        db_obj = Cart(user_id=user_id, is_active=True)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def add_item_to_cart(
        self,
        db: Session,
        *,
        cart_id: int,
        item_in: CartItemCreate,
        price: float,
        variant: ProductVariant
    ) -> CartItem:
        # Check if item with same variant already exists
        existing_item = (
            db.query(CartItem)
            .filter(
                CartItem.cart_id == cart_id,
                CartItem.product_id == item_in.product_id,
                CartItem.variant_id == item_in.variant_id,
            )
            .first()
        )

        result_dict = {}  # For storing result with variant info

        if existing_item:
            # Update quantity if item exists
            existing_item.quantity += item_in.quantity
            db.add(existing_item)
            db.commit()
            db.refresh(existing_item)

            # Create return object with correct type information
            item_dict = existing_item.__dict__.copy()
            # Remove SQLAlchemy internal attributes
            item_dict.pop("_sa_instance_state", None)
            result_dict.update(item_dict)
        else:
            # Create new item
            db_obj = CartItem(
                cart_id=cart_id,
                product_id=item_in.product_id,
                variant_id=item_in.variant_id,
                quantity=item_in.quantity,
                unit_price=price,
            )
            db.add(db_obj)
            db.commit()
            db.refresh(db_obj)

            # Create return object
            item_dict = db_obj.__dict__.copy()
            item_dict.pop("_sa_instance_state", None)
            result_dict.update(item_dict)

        # Add variant info for response
        result_dict["variant_size"] = variant.size
        result_dict["variant_color"] = variant.color

        return CartItemSchema(**result_dict)

    def update_cart_item(
        self, db: Session, *, item_id: int, item_in: CartItemUpdate
    ) -> Optional[CartItemSchema]:
        """Update a cart item"""
        item = db.query(CartItem).filter(CartItem.id == item_id).first()
        if not item:
            return None

        if item_in.quantity is not None:
            item.quantity = item_in.quantity

        db.add(item)
        db.commit()
        db.refresh(item)

        # Get variant info for response
        variant = (
            db.query(ProductVariant)
            .filter(ProductVariant.id == item.variant_id)
            .first()
        )

        return CartItemSchema.model_validate(item, from_attributes=True)

    def remove_cart_item(self, db: Session, *, item_id: int) -> CartItemSchema | None:
        item = db.query(CartItem).filter(CartItem.id == item_id).first()
        if not item:
            return None
        db.delete(item)
        db.commit()
        return CartItemSchema.model_validate(item, from_attributes=True)

    def clear_cart(self, db: Session, *, cart_id: int) -> None:
        """Remove all items from a cart"""
        db.query(CartItem).filter(CartItem.cart_id == cart_id).delete()
        db.commit()


cart = CRUDCart(Cart)
