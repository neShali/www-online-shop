from fastapi.testclient import TestClient
from sqlalchemy.orm import Session

from app.core.security import get_password_hash
from app.models.user import User


def test_register_user(client: TestClient, db: Session) -> None:
    """
    Test user registration.
    """
    # Prepare test data
    data = {
        "email": "newuser@test.com",
        "username": "newuser",
        "password": "password",
        "is_active": True,
        "is_superuser": False,
    }

    # Send request
    response = client.post(
        "/api/v1/auth/register",
        json=data,
    )

    # Assert response
    assert response.status_code == 200
    created_user = response.json()
    assert created_user["email"] == data["email"]
    assert created_user["username"] == data["username"]
    assert created_user["is_active"] == data["is_active"]
    assert created_user["is_superuser"] == data["is_superuser"]
    assert "id" in created_user
    assert "hashed_password" not in created_user


def test_register_existing_email(client: TestClient, db: Session) -> None:
    """
    Test registering with an existing email fails.
    """
    # Create existing user
    user = User(
        email="existing@test.com",
        username="existing",
        hashed_password=get_password_hash("password"),
        is_active=True,
        is_superuser=False,
    )
    db.add(user)
    db.commit()

    # Prepare test data with same email
    data = {
        "email": "existing@test.com",  # Same email
        "username": "newname",  # Different username
        "password": "password",
        "is_active": True,
        "is_superuser": False,
    }

    # Send request
    response = client.post(
        "/api/v1/auth/register",
        json=data,
    )

    # Assert response
    assert response.status_code == 400
    assert "Email already registered" in response.json()["detail"]


def test_register_existing_username(client: TestClient, db: Session) -> None:
    """
    Test registering with an existing username fails.
    """
    # Create existing user
    user = User(
        email="user1@test.com",
        username="existingname",
        hashed_password=get_password_hash("password"),
        is_active=True,
        is_superuser=False,
    )
    db.add(user)
    db.commit()

    # Prepare test data with same username
    data = {
        "email": "newemail@test.com",  # Different email
        "username": "existingname",  # Same username
        "password": "password",
        "is_active": True,
        "is_superuser": False,
    }

    # Send request
    response = client.post(
        "/api/v1/auth/register",
        json=data,
    )

    # Assert response
    assert response.status_code == 400
    assert "Username already taken" in response.json()["detail"]


def test_login_success(client: TestClient, db: Session) -> None:
    """
    Test successful login.
    """
    # Create user
    user = User(
        email="logintest@test.com",
        username="loginuser",
        hashed_password=get_password_hash("testpassword"),
        is_active=True,
        is_superuser=False,
    )
    db.add(user)
    db.commit()

    # Login with form data
    login_data = {
        "username": "loginuser",
        "password": "testpassword",
    }

    response = client.post(
        "/api/v1/auth/login",
        data=login_data,  # Form data, not JSON
    )

    # Assert response
    assert response.status_code == 200
    token_data = response.json()
    assert "access_token" in token_data
    assert token_data["token_type"] == "bearer"


def test_login_wrong_password(client: TestClient, db: Session) -> None:
    """
    Test login with wrong password.
    """
    # Create user
    user = User(
        email="wrongpw@test.com",
        username="wrongpw",
        hashed_password=get_password_hash("correctpw"),
        is_active=True,
        is_superuser=False,
    )
    db.add(user)
    db.commit()

    # Login with wrong password
    login_data = {
        "username": "wrongpw",
        "password": "wrongpassword",  # Wrong password
    }

    response = client.post(
        "/api/v1/auth/login",
        data=login_data,
    )

    # Assert response
    assert response.status_code == 401
    assert "Incorrect username or password" in response.json()["detail"]


def test_login_inactive_user(client: TestClient, db: Session) -> None:
    """
    Test login with inactive user.
    """
    # Create inactive user
    user = User(
        email="inactive@test.com",
        username="inactive",
        hashed_password=get_password_hash("password"),
        is_active=False,  # Inactive
        is_superuser=False,
    )
    db.add(user)
    db.commit()

    # Login with inactive user
    login_data = {
        "username": "inactive",
        "password": "password",
    }

    response = client.post(
        "/api/v1/auth/login",
        data=login_data,
    )

    # Assert response
    assert response.status_code == 400
    assert "Inactive user" in response.json()["detail"]


def test_get_me(client: TestClient, normal_user_token_headers: dict) -> None:
    """
    Test getting current user profile.
    """
    response = client.get(
        "/api/v1/auth/me",
        headers=normal_user_token_headers,
    )

    # Assert response
    assert response.status_code == 200
    user_data = response.json()
    assert user_data["email"] == "user@test.com"
    assert user_data["username"] == "testuser"
    assert user_data["is_active"] is True
    assert user_data["is_superuser"] is False


def test_update_me(client: TestClient, normal_user_token_headers: dict) -> None:
    """
    Test updating current user profile.
    """
    # Update data
    data = {"email": "updated@test.com", "username": "updateduser"}

    response = client.put(
        "/api/v1/auth/me",
        headers=normal_user_token_headers,
        json=data,
    )

    # Assert response
    assert response.status_code == 200
    user_data = response.json()
    assert user_data["email"] == "updated@test.com"
    assert user_data["username"] == "updateduser"


def test_change_password(client: TestClient, normal_user_token_headers: dict) -> None:
    """
    Test changing password.
    """
    # Password change data
    data = {"current_password": "password", "new_password": "newpassword"}

    response = client.post(
        "/api/v1/auth/password",
        headers=normal_user_token_headers,
        json=data,
    )

    # Assert response
    assert response.status_code == 200

    # Verify can login with new password
    login_data = {
        "username": "testuser",
        "password": "newpassword",
    }

    login_response = client.post(
        "/api/v1/auth/login",
        data=login_data,
    )

    assert login_response.status_code == 200
