from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from tests.conftest import create_test_category, create_test_product


def test_add_item_to_cart(
    client: TestClient, db: Session, normal_user_token_headers: dict
) -> None:
    """
    Test adding an item to the cart with specific variant.
    """
    # Create test product with variants
    category = create_test_category(db)
    product = create_test_product(db, category.id)
    variant = product.variants[0]  # Get the first variant

    # Prepare cart item data
    data = {"product_id": product.id, "variant_id": variant.id, "quantity": 2}

    # Send request
    response = client.post(
        "/api/v1/carts/items",
        headers=normal_user_token_headers,
        json=data,
    )

    # Assert response
    assert response.status_code == 200
    cart_item = response.json()
    assert cart_item["product_id"] == product.id
    assert cart_item["variant_id"] == variant.id
    assert cart_item["quantity"] == 2
    assert cart_item["unit_price"] == product.price

    # Check that the variant info is included
    assert "variant_size" in cart_item
    assert "variant_color" in cart_item
    assert cart_item["variant_size"] == variant.size
    assert cart_item["variant_color"] == variant.color


def test_add_item_exceeding_stock_to_cart(
    client: TestClient, db: Session, normal_user_token_headers: dict
) -> None:
    """
    Test that adding an item to the cart with a quantity greater than available stock fails.
    """
    # Create test product and variant
    category = create_test_category(db)
    product = create_test_product(db, category.id)
    variant = product.variants[0]

    # Manually limit stock for the test
    variant.stock = 3
    db.commit()

    # Try to add more than available stock
    data = {
        "product_id": product.id,
        "variant_id": variant.id,
        "quantity": 5,  # Exceeds the 3 in stock
    }

    response = client.post(
        "/api/v1/carts/items",
        headers=normal_user_token_headers,
        json=data,
    )

    # Assert failure due to stock limit
    assert response.status_code in [400, 422]
    assert "stock" in response.text.lower()
