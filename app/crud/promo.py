from datetime import datetime
from typing import List, Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.promo import ProductPromo, Promo
from app.schemas.promo import ProductPromoCreate, PromoCreate, PromoUpdate


class CRUDPromo(CRUDBase[Promo, PromoCreate, PromoUpdate]):
    def get_by_code(self, db: Session, *, code: str) -> Optional[Promo]:
        """
        Get a promo by code
        """
        return db.query(Promo).filter(Promo.code == code).first()

    def get_active_promos(
        self, db: Session, *, date: Optional[datetime] = None
    ) -> List[Promo]:
        """
        Get all active promos at a given date (or current date)
        """
        if date is None:
            date = datetime.now()

        return (
            db.query(Promo)
            .filter(
                Promo.is_active == True,
                Promo.start_date <= date,
                Promo.end_date >= date,
            )
            .all()
        )

    def add_product_to_promo(
        self, db: Session, *, obj_in: ProductPromoCreate
    ) -> ProductPromo:
        """
        Add a product to a promo
        """
        db_obj = ProductPromo(product_id=obj_in.product_id, promo_id=obj_in.promo_id)
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        return db_obj

    def remove_product_from_promo(
        self, db: Session, *, product_id: int, promo_id: int
    ) -> None:
        """
        Remove a product from a promo
        """
        db.query(ProductPromo).filter(
            ProductPromo.product_id == product_id, ProductPromo.promo_id == promo_id
        ).delete()
        db.commit()

    def get_promo_products(self, db: Session, *, promo_id: int) -> List[ProductPromo]:
        """
        Get all products for a promo
        """
        return db.query(ProductPromo).filter(ProductPromo.promo_id == promo_id).all()


promo = CRUDPromo(Promo)
