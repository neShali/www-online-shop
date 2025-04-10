import os
from typing import Dict, Generator

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.config import settings
from app.core.security import create_access_token, get_password_hash
from app.db.base import Base
from app.db.session import get_db
from app.main import app
from app.models.category import Category
from app.models.product import Product, ProductVariant
from app.models.user import User

# Create a test database using SQLite in-memory
SQLALCHEMY_TEST_DATABASE_URL = "sqlite:///tmp.db"

engine = create_engine(
    SQLALCHEMY_TEST_DATABASE_URL,
    connect_args={"check_same_thread": False},
    poolclass=StaticPool,
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


@pytest.fixture(scope="function")
def db() -> Generator:
    """
    Create a fresh database for each test.
    """
    # Create the tables
    Base.metadata.create_all(bind=engine)

    # Create a new session for each test
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()

        # Clean up the database after each test
        Base.metadata.drop_all(bind=engine)


@pytest.fixture(scope="function")
def client(db) -> Generator:
    """
    Create a test client with a database override.
    """

    # Override the get_db dependency
    def override_get_db():
        try:
            yield db
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db

    with TestClient(app) as test_client:
        yield test_client

    # Clean up
    app.dependency_overrides = {}


@pytest.fixture(scope="function")
def superuser_token_headers(client: TestClient, db: Generator) -> Dict[str, str]:
    """
    Create a superuser in the database and return headers with JWT token.
    """
    # Create a superuser
    user = User(
        email="admin@test.com",
        username="admin",
        hashed_password=get_password_hash("admin"),
        is_active=True,
        is_superuser=True,
    )
    db.add(user)
    db.commit()

    # Create access token
    access_token = create_access_token(subject=user.id)

    # Return headers with token
    return {"Authorization": f"Bearer {access_token}"}


@pytest.fixture(scope="function")
def normal_user_token_headers(client: TestClient, db: Generator) -> Dict[str, str]:
    """
    Create a normal user in the database and return headers with JWT token.
    """
    # Create a normal user
    user = User(
        email="user@test.com",
        username="testuser",
        hashed_password=get_password_hash("password"),
        is_active=True,
        is_superuser=False,
    )
    db.add(user)
    db.commit()

    # Create access token
    access_token = create_access_token(subject=user.id)

    # Return headers with token
    return {"Authorization": f"Bearer {access_token}"}


@pytest.fixture(scope="function")
def inactive_user_token_headers(client: TestClient, db: Generator) -> Dict[str, str]:
    """
    Create an inactive user in the database and return headers with JWT token.
    """
    # Create an inactive user
    user = User(
        email="inactive@test.com",
        username="inactive",
        hashed_password=get_password_hash("password"),
        is_active=False,
        is_superuser=False,
    )
    db.add(user)
    db.commit()

    # Create access token
    access_token = create_access_token(subject=user.id)

    # Return headers with token
    return {"Authorization": f"Bearer {access_token}"}


def create_test_category(db: Session) -> Category:
    """
    Helper function to create a test category.
    """
    category = Category(name="Test Category", description="Test category description")
    db.add(category)
    db.commit()
    db.refresh(category)
    return category


def create_test_product(db: Session, category_id: int) -> Product:
    """
    Helper function to create a test product with variants.
    """
    product = Product(
        name="Test Product",
        description="Test product description",
        price=99.99,
        is_active=True,
        category_id=category_id,
        image_url="https://example.com/test.jpg",
    )
    db.add(product)
    db.commit()
    db.refresh(product)

    # Add variants to the product
    variants = [
        ProductVariant(
            product_id=product.id,
            size="M",
            color="Red",
            color_hex="#FF0000",
            stock=10,
            sku="TEST-M-RED",
        ),
        ProductVariant(
            product_id=product.id,
            size="L",
            color="Blue",
            color_hex="#0000FF",
            stock=15,
            sku="TEST-L-BLUE",
        ),
    ]

    for variant in variants:
        db.add(variant)

    db.commit()
    db.refresh(product)
    return product
