from typing import Any, Dict, List, Optional, Union

from sqlalchemy import func, or_
from sqlalchemy.orm import Session, joinedload

from app.crud.base import CRUDBase
from app.models.product import Product, ProductVariant
from app.schemas.product import ProductCreate, ProductUpdate, ProductVariantCreate


class CRUDProduct(CRUDBase[Product, ProductCreate, ProductUpdate]):
    def get(self, db: Session, id: Any) -> Optional[Product]:
        """Get a product by ID with its variants"""
        return (
            db.query(Product)
            .options(joinedload(Product.variants))
            .filter(Product.id == id)
            .first()
        )

    def get_multi(
        self,
        db: Session,
        *,
        skip: int = 0,
        limit: int = 100,
        category_id: Optional[int] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        search: Optional[str] = None,
        size: Optional[str] = None,
        color: Optional[str] = None,
        is_active: bool = True,
    ) -> List[Product]:
        """Get multiple products with filters and pagination"""
        query = db.query(Product).options(joinedload(Product.variants))

        # Apply filters
        if category_id is not None:
            query = query.filter(Product.category_id == category_id)
        if min_price is not None:
            query = query.filter(Product.price >= min_price)
        if max_price is not None:
            query = query.filter(Product.price <= max_price)
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                or_(
                    Product.name.ilike(search_term),
                    Product.description.ilike(search_term),
                )
            )

        # Filter by variant attributes (size, color)
        if size or color:
            variant_filters = []
            if size:
                variant_filters.append(ProductVariant.size == size)
            if color:
                variant_filters.append(ProductVariant.color.ilike(f"%{color}%"))

            if variant_filters:
                query = query.join(Product.variants).filter(*variant_filters)

        # Filter active/inactive products
        query = query.filter(Product.is_active == is_active)

        # Apply pagination
        query = query.distinct().offset(skip).limit(limit)
        return query.all()

    def get_count(
        self,
        db: Session,
        *,
        category_id: Optional[int] = None,
        min_price: Optional[float] = None,
        max_price: Optional[float] = None,
        search: Optional[str] = None,
        size: Optional[str] = None,
        color: Optional[str] = None,
        is_active: bool = True,
    ) -> int:
        """Get count of products with filters"""
        query = db.query(func.count(Product.id.distinct()))

        # Apply filters
        if category_id is not None:
            query = query.filter(Product.category_id == category_id)
        if min_price is not None:
            query = query.filter(Product.price >= min_price)
        if max_price is not None:
            query = query.filter(Product.price <= max_price)
        if search:
            search_term = f"%{search}%"
            query = query.filter(
                or_(
                    Product.name.ilike(search_term),
                    Product.description.ilike(search_term),
                )
            )

        # Filter by variant attributes (size, color)
        if size or color:
            variant_filters = []
            if size:
                variant_filters.append(ProductVariant.size == size)
            if color:
                variant_filters.append(ProductVariant.color.ilike(f"%{color}%"))

            if variant_filters:
                query = query.join(Product.variants).filter(*variant_filters)

        # Filter active/inactive products
        query = query.filter(Product.is_active == is_active)

        return query.scalar()

    def create(self, db: Session, *, obj_in: ProductCreate) -> Product:
        """Create a new product with variants"""
        # Extract variants data
        variants_data = obj_in.variants

        # Create product without variants first
        obj_in_data = obj_in.model_dump(exclude={"variants"})
        db_obj = Product(**obj_in_data)
        db.add(db_obj)
        db.flush()  # Flush to get the product ID

        # Create variants
        for variant_data in variants_data:
            variant = ProductVariant(product_id=db_obj.id, **variant_data.model_dump())
            db.add(variant)

        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update(
        self,
        db: Session,
        *,
        db_obj: Product,
        obj_in: Union[ProductUpdate, Dict[str, Any]],
    ) -> Product:
        """Update a product and its variants"""
        if isinstance(obj_in, dict):
            update_data = obj_in
            variants_data = update_data.pop("variants", None)
        else:
            update_data = obj_in.model_dump(exclude_unset=True)
            variants_data = (
                update_data.pop("variants", None) if "variants" in update_data else None
            )

        # Update standard fields
        for field in update_data:
            setattr(db_obj, field, update_data[field])

        # Update variants if provided
        if variants_data is not None:
            # Remove existing variants (or could implement more sophisticated merging)
            for variant in db_obj.variants:
                db.delete(variant)

            # Create new variants
            for variant_data in variants_data:
                if isinstance(variant_data, dict):
                    variant = ProductVariant(product_id=db_obj.id, **variant_data)
                else:
                    variant = ProductVariant(
                        product_id=db_obj.id, **variant_data.dict()
                    )
                db.add(variant)

        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def update_variant_stock(
        self, db: Session, *, variant_id: int, qty_change: int
    ) -> Optional[ProductVariant]:
        """Update stock for a specific variant"""
        variant = (
            db.query(ProductVariant).filter(ProductVariant.id == variant_id).first()
        )
        if not variant:
            return None

        variant.stock += qty_change
        # Ensure stock doesn't go negative
        if variant.stock < 0:
            variant.stock = 0

        db.add(variant)
        db.commit()
        db.refresh(variant)
        return variant

    def get_variant(self, db: Session, *, id: int) -> Optional[ProductVariant]:
        """Get a specific product variant"""
        return db.query(ProductVariant).filter(ProductVariant.id == id).first()


product = CRUDProduct(Product)
