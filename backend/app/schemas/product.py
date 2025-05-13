from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict, field_validator


# ProductVariant schemas
class ProductVariantBase(BaseModel):
    size: str
    color: str
    color_hex: Optional[str] = None
    stock: int = 0
    sku: Optional[str] = None


class ProductVariantCreate(ProductVariantBase):
    @field_validator("stock")
    def stock_must_be_non_negative(cls, v):
        if v < 0:
            raise ValueError("Stock cannot be negative")
        return v

    @field_validator("color_hex")
    def validate_hex_code(cls, v):
        if v is not None:
            if not v.startswith("#"):
                v = f"#{v}"
            if len(v) != 7:  # #RRGGBB format
                raise ValueError("Hex code must be in #RRGGBB format")
        return v


class ProductVariantUpdate(BaseModel):
    size: Optional[str] = None
    color: Optional[str] = None
    color_hex: Optional[str] = None
    stock: Optional[int] = None
    sku: Optional[str] = None

    @field_validator("stock")
    def stock_must_be_non_negative(cls, v):
        if v is not None and v < 0:
            raise ValueError("Stock cannot be negative")
        return v

    @field_validator("color_hex")
    def validate_hex_code(cls, v):
        if v is not None:
            if not v.startswith("#"):
                v = f"#{v}"
            if len(v) != 7:  # #RRGGBB format
                raise ValueError("Hex code must be in #RRGGBB format")
        return v


class ProductVariantInDBBase(ProductVariantBase):
    id: int
    product_id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class ProductVariant(ProductVariantInDBBase):
    pass


# Product schemas
class ProductBase(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    price: Optional[float] = None
    is_active: Optional[bool] = True
    category_id: Optional[int] = None
    image_url: Optional[str] = None


class ProductCreate(ProductBase):
    name: str
    price: float
    category_id: int
    variants: List[ProductVariantCreate] = []

    @field_validator("price")
    def price_must_be_positive(cls, v):
        if v <= 0:
            raise ValueError("Price must be greater than zero")
        return v


class ProductUpdate(ProductBase):
    variants: Optional[List[ProductVariantCreate]] = None


class ProductInDBBase(ProductBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class Product(ProductInDBBase):
    variants: List[ProductVariant] = []

    @property
    def total_stock(self) -> int:
        """Calculate total stock across all variants"""
        return sum(variant.stock for variant in self.variants)

    @property
    def available_sizes(self) -> List[str]:
        """Get list of available sizes"""
        return sorted(list(set(variant.size for variant in self.variants)))

    @property
    def available_colors(self) -> List[str]:
        """Get list of available colors"""
        return sorted(list(set(variant.color for variant in self.variants)))


# For pagination and filtering
class ProductList(BaseModel):
    items: List[Product]
    total: int
    page: int
    size: int
    pages: int
