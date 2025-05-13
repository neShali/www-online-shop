from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.models.category import Category
from app.models.product import Product, ProductVariant
from tests.conftest import create_test_category, create_test_product


def test_list_products(client: TestClient, db: Session) -> None:
    """
    Test listing products.
    """
    # Create test category
    category = create_test_category(db)

    # Create test products
    for i in range(5):
        create_test_product(db, category.id)

    # Send request
    response = client.get("/api/v1/products/")

    # Assert response
    assert response.status_code == 200
    data = response.json()
    assert "items" in data
    assert len(data["items"]) == 5
    assert data["total"] == 5
    assert data["page"] == 1
    assert data["size"] == 10
    assert data["pages"] == 1


def test_filter_products_by_category(client: TestClient, db: Session) -> None:
    """
    Test filtering products by category.
    """
    # Create test categories
    category1 = create_test_category(db)

    category2 = Category(
        name="Another Category", description="Another category description"
    )
    db.add(category2)
    db.commit()
    db.refresh(category2)

    # Create test products in different categories
    for i in range(3):
        create_test_product(db, category1.id)

    for i in range(2):
        create_test_product(db, category2.id)

    # Filter by category1
    response = client.get(f"/api/v1/products/?category_id={category1.id}")

    # Assert response
    assert response.status_code == 200
    data = response.json()
    assert len(data["items"]) == 3
    assert data["total"] == 3

    # Filter by category2
    response = client.get(f"/api/v1/products/?category_id={category2.id}")

    # Assert response
    assert response.status_code == 200
    data = response.json()
    assert len(data["items"]) == 2
    assert data["total"] == 2


# TODO: filter products by size from variants

# def test_filter_products_by_size(client: TestClient, db: Session) -> None:
#     """
#     Test filtering products by size.
#     """
#     # Create test category
#     category = create_test_category(db)
#
#     # Create test products with different variants
#     product1 = create_test_product(db, category.id)
#
#     # Create another product with different sizes
#     product2 = Product(
#         name="Second Product",
#         description="Second product description",
#         price=79.99,
#         is_active=True,
#         category_id=category.id
#     )
#     db.add(product2)
#     db.commit()
#     db.refresh(product2)
#
#     # Add XL size variant to second product
#     xl_variant = ProductVariant(
#         product_id=product2.id,
#         size="XL",
#         color="Black",
#         color_hex="#000000",
#         stock=5,
#         sku="SECOND-XL-BLACK"
#     )
#     db.add(xl_variant)
#     db.commit()
#
#     # Filter by size M
#     response = client.get("/api/v1/products/?product_size=M")
#
#     # Assert response
#     assert response.status_code == 200
#     data = response.json()
#     assert len(data["items"]) == 1
#     assert data["items"][0]["id"] == product1.id
#
#     # Filter by size XL
#     response = client.get("/api/v1/products/?product_size=XL")
#
#     # Assert response
#     assert response.status_code == 200
#     data = response.json()
#     assert len(data["items"]) == 1
#     assert data["items"][0]["id"] == product2.id


def test_filter_products_by_price(client: TestClient, db: Session) -> None:
    """
    Test filtering products by price range.
    """
    # Create test category
    category = create_test_category(db)

    # Create test products with different prices
    prices = [10.99, 25.50, 49.99, 75.00, 99.99]
    for price in prices:
        product = Product(
            name=f"Product ${price}",
            description="Test product",
            price=price,
            is_active=True,
            category_id=category.id,
        )
        db.add(product)

    db.commit()

    # Filter by min price
    min_price = 50.0
    response = client.get(f"/api/v1/products/?min_price={min_price}")

    # Assert response
    assert response.status_code == 200
    data = response.json()
    assert len(data["items"]) == 2  # Should return the 75.00 and 99.99 products
    assert all(item["price"] >= min_price for item in data["items"])

    # Filter by max price
    max_price = 30.0
    response = client.get(f"/api/v1/products/?max_price={max_price}")

    # Assert response
    assert response.status_code == 200
    data = response.json()
    assert len(data["items"]) == 2  # Should return the 10.99 and 25.50 products
    assert all(item["price"] <= max_price for item in data["items"])

    # Filter by price range
    min_price = 20.0
    max_price = 80.0
    response = client.get(
        f"/api/v1/products/?min_price={min_price}&max_price={max_price}"
    )

    # Assert response
    assert response.status_code == 200
    data = response.json()
    assert len(data["items"]) == 3  # Should return the 25.50, 49.99, and 75.00 products
    assert all(min_price <= item["price"] <= max_price for item in data["items"])


def test_search_products(client: TestClient, db: Session) -> None:
    """
    Test searching products by name or description.
    """
    # Create test category
    category = create_test_category(db)

    # Create test products with different names and descriptions
    products = [
        Product(
            name="Laptop",
            description="Powerful computing device",
            price=999.99,
            category_id=category.id,
        ),
        Product(
            name="Smartphone",
            description="Mobile phone with smart features",
            price=499.99,
            category_id=category.id,
        ),
        Product(
            name="Smart TV",
            description="Television with internet capabilities",
            price=799.99,
            category_id=category.id,
        ),
        Product(
            name="Tablet",
            description="Portable touchscreen device",
            price=349.99,
            category_id=category.id,
        ),
    ]

    for product in products:
        db.add(product)

    db.commit()

    # Search for "smart" in name or description
    search_term = "smart"
    response = client.get(f"/api/v1/products/?search={search_term}")

    # Assert response
    assert response.status_code == 200
    data = response.json()
    assert len(data["items"]) == 2  # Should return Smartphone and Smart TV
    assert all(
        search_term.lower() in item["name"].lower()
        or search_term.lower() in item["description"].lower()
        for item in data["items"]
    )


def test_get_product(client: TestClient, db: Session) -> None:
    """
    Test getting a specific product.
    """
    # Create test category and product
    category = create_test_category(db)
    product = create_test_product(db, category.id)

    # Send request
    response = client.get(f"/api/v1/products/{product.id}")

    # Assert response
    assert response.status_code == 200
    data = response.json()
    assert data["id"] == product.id
    assert data["name"] == product.name
    assert data["price"] == product.price
    assert data["category_id"] == category.id


def test_get_nonexistent_product(client: TestClient) -> None:
    """
    Test getting a non-existent product.
    """
    # Send request with non-existent ID
    response = client.get("/api/v1/products/9999")

    # Assert response
    assert response.status_code == 404
    assert "Product not found" in response.json()["detail"]


def test_create_product(
    client: TestClient, db: Session, superuser_token_headers: dict
) -> None:
    """
    Test creating a product with variants (admin only).
    """
    # Create test category
    category = create_test_category(db)

    # Prepare product data with variants
    data = {
        "name": "New Product",
        "description": "New product description",
        "price": 149.99,
        "category_id": category.id,
        "image_url": "https://example.com/new-product.jpg",
        "variants": [
            {
                "size": "S",
                "color": "Green",
                "color_hex": "#00FF00",
                "stock": 5,
                "sku": "NEW-S-GREEN",
            },
            {
                "size": "M",
                "color": "Green",
                "color_hex": "#00FF00",
                "stock": 8,
                "sku": "NEW-M-GREEN",
            },
        ],
    }

    # Send request
    response = client.post(
        "/api/v1/products/",
        headers=superuser_token_headers,
        json=data,
    )

    # Assert response
    assert response.status_code == 200
    created_product = response.json()
    assert created_product["name"] == data["name"]
    assert created_product["price"] == data["price"]
    assert created_product["category_id"] == category.id
    assert "id" in created_product
    assert "variants" in created_product
    assert len(created_product["variants"]) == 2


def test_create_product_unauthorized(
    client: TestClient, db: Session, normal_user_token_headers: dict
) -> None:
    """
    Test creating a product with non-admin user fails.
    """
    # Create test category
    category = create_test_category(db)

    # Prepare product data
    data = {
        "name": "New Product",
        "description": "New product description",
        "price": 149.99,
        "stock": 25,
        "category_id": category.id,
    }

    # Send request with normal user token
    response = client.post(
        "/api/v1/products/",
        headers=normal_user_token_headers,
        json=data,
    )

    # Assert response
    assert response.status_code == 403
    assert "Not enough permissions" in response.json()["detail"]


def test_update_product(
    client: TestClient, db: Session, superuser_token_headers: dict
) -> None:
    """
    Test updating a product (admin only).
    """
    # Create test category and product
    category = create_test_category(db)
    product = create_test_product(db, category.id)

    # Prepare update data
    data = {"name": "Updated Product Name", "price": 129.99}

    # Send request
    response = client.put(
        f"/api/v1/products/{product.id}",
        headers=superuser_token_headers,
        json=data,
    )

    # Assert response
    assert response.status_code == 200
    updated_product = response.json()
    assert updated_product["id"] == product.id
    assert updated_product["name"] == data["name"]
    assert updated_product["price"] == data["price"]
    # Other fields should remain unchanged
    assert updated_product["description"] == product.description
    assert updated_product["category_id"] == category.id
