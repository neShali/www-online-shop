from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict, field_validator


# Shared properties
class PromoBase(BaseModel):
    code: Optional[str] = None
    discount_percent: Optional[float] = None
    discount_amount: Optional[float] = None
    min_purchase_amount: Optional[float] = None
    is_active: Optional[bool] = True
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None


# Properties to receive via API on creation
class PromoCreate(PromoBase):
    code: str
    start_date: datetime
    end_date: datetime

    @field_validator("discount_percent")
    def validate_discount_percent(cls, v, values):
        if v is not None:
            if "discount_amount" in values and values["discount_amount"] is not None:
                raise ValueError(
                    "Cannot specify both discount_percent and discount_amount"
                )
            if v <= 0 or v > 100:
                raise ValueError("Discount percent must be between 0 and 100")
        elif "discount_amount" not in values or values["discount_amount"] is None:
            raise ValueError("Must specify either discount_percent or discount_amount")
        return v

    @field_validator("discount_amount")
    def validate_discount_amount(cls, v, values):
        if v is not None and v <= 0:
            raise ValueError("Discount amount must be greater than zero")
        return v

    @field_validator("end_date")
    def end_date_must_be_after_start_date(cls, v, values):
        if "start_date" in values and v <= values["start_date"]:
            raise ValueError("End date must be after start date")
        return v


# Properties to receive via API on update
class PromoUpdate(PromoBase):
    pass


# Properties shared by models stored in DB
class PromoInDBBase(PromoBase):
    id: int
    created_at: datetime
    updated_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


# Properties to return to client
class Promo(PromoInDBBase):
    pass


# Product-Promo association
class ProductPromoBase(BaseModel):
    product_id: int
    promo_id: int


class ProductPromoCreate(ProductPromoBase):
    pass


class ProductPromo(ProductPromoBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
