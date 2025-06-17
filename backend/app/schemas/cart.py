from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict, field_validator


# CartItem schemas
class CartItemBase(BaseModel):
    product_id: int
    variant_id: int
    quantity: int = 1

    @field_validator("quantity")
    def quantity_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError("Quantity must be greater than zero")
        return v


class CartItemCreate(CartItemBase):
    pass


class CartItemUpdate(BaseModel):
    quantity: Optional[int] = None

    @field_validator("quantity")
    def quantity_must_be_positive(cls, v):
        if v is not None and v <= 0:
            raise ValueError("Quantity must be greater than zero")
        return v


class CartItemInDBBase(CartItemBase):
    id: int
    cart_id: int
    unit_price: float
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class CartItem(CartItemInDBBase):
    variant_size: str | None = None  
    variant_color: str | None = None


# Cart schemas
class CartBase(BaseModel):
    is_active: bool = True


class CartCreate(CartBase):
    pass


class CartUpdate(CartBase):
    pass


class CartInDBBase(CartBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class Cart(CartInDBBase):
    items: List[CartItem] = []

    # Calculate total price
    @property
    def total_price(self) -> float:
        return sum(item.quantity * item.unit_price for item in self.items)
