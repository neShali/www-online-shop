from datetime import timedelta
from typing import Any

from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.core.config import settings
from app.core.dependencies import get_current_active_superuser, get_current_user
from app.core.security import create_access_token
from app.crud.user import user
from app.db.session import get_db
from app.schemas.token import Token
from app.schemas.user import User, UserCreate, UserUpdate

router = APIRouter()


@router.post("/register", response_model=User)
def register_user(
    *,
    db: Session = Depends(get_db),
    user_in: UserCreate,
) -> Any:
    """
    Register a new user.
    """
    # Prevent creating admin users through this endpoint
    if user_in.is_superuser:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Cannot register as superuser through this endpoint",
        )

    # Check if email already exists
    if user.get_by_email(db, email=user_in.email):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already registered",
        )

    # Check if username already exists
    if user.get_by_username(db, username=user_in.username):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already taken",
        )

    # Create the user
    return user.create(db, obj_in=user_in)


@router.post("/login", response_model=Token)
def login(
    *,
    db: Session = Depends(get_db),
    form_data: OAuth2PasswordRequestForm = Depends(),
) -> Any:
    """
    OAuth2 compatible token login, get an access token for future requests.
    """
    # Try to authenticate
    authenticated_user = user.authenticate(
        db, username=form_data.username, password=form_data.password
    )

    # Handle failed authentication
    if not authenticated_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )

    # Check if user is active
    if not user.is_active(authenticated_user):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, detail="Inactive user"
        )

    # Create access token
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": create_access_token(
            authenticated_user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }


@router.post("/refresh-token", response_model=Token)
def refresh_token(
    *,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Refresh token for current user.
    """
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    return {
        "access_token": create_access_token(
            current_user.id, expires_delta=access_token_expires
        ),
        "token_type": "bearer",
    }


@router.get("/me", response_model=User)
def read_users_me(
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Get current user.
    """
    return current_user


@router.put("/me", response_model=User)
def update_user_me(
    *,
    db: Session = Depends(get_db),
    user_in: UserUpdate,
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Update current user.
    """
    # Check for email uniqueness if changing email
    if user_in.email and user_in.email != current_user.email:
        if user.get_by_email(db, email=user_in.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )

    # Check for username uniqueness if changing username
    if user_in.username and user_in.username != current_user.username:
        if user.get_by_username(db, username=user_in.username):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken",
            )

    return user.update(db, db_obj=current_user, obj_in=user_in)


@router.post("/password", response_model=User)
def change_password(
    *,
    db: Session = Depends(get_db),
    current_password: str = Body(...),
    new_password: str = Body(...),
    current_user: User = Depends(get_current_user),
) -> Any:
    """
    Change current user password.
    """
    # Verify current password
    if not user.authenticate(
        db, username=current_user.username, password=current_password
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Incorrect password",
        )

    # Update with new password
    return user.update(db, db_obj=current_user, obj_in={"password": new_password})


@router.put("/{user_id}", response_model=User)
def update_user_by_superuser(
    *,
    db: Session = Depends(get_db),
    user_id: Any,
    user_in: UserUpdate,
    current_user: User = Depends(get_current_active_superuser),
) -> Any:
    """
    Update a user by superuser.
    """
    user_to_update = user.get(db, id=user_id)
    if not user_to_update:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"User with ID {user_id} not found",
        )

    # Prevent non-superusers from demoting themselves
    if (
        current_user.is_superuser
        and user_to_update.id == current_user.id
        and user_in.is_superuser is False
    ):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Superuser cannot remove their own superuser privileges",
        )

    # Check for email uniqueness if changing email
    if user_in.email and user_in.email != user_to_update.email:
        if user.get_by_email(db, email=user_in.email):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered",
            )

    # Check for username uniqueness if changing username
    if user_in.username and user_in.username != user_to_update.username:
        if user.get_by_username(db, username=user_in.username):
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Username already taken",
            )

    return user.update(db, db_obj=user_to_update, obj_in=user_in)
