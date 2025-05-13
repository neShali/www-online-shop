from typing import List, Optional

from sqlalchemy.orm import Session

from app.crud.base import CRUDBase
from app.models.category import Category
from app.schemas.category import CategoryCreate, CategoryUpdate


class CRUDCategory(CRUDBase[Category, CategoryCreate, CategoryUpdate]):
    def get_by_name(self, db: Session, *, name: str) -> Optional[Category]:
        """
        Get a category by name
        """
        return db.query(Category).filter(Category.name == name).first()

    def get_root_categories(self, db: Session) -> List[Category]:
        """
        Get all root categories (those without parent)
        """
        return db.query(Category).filter(Category.parent_id.is_(None)).all()


category = CRUDCategory(Category)
