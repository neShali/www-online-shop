from typing import Iterator

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import APIRoute         # ← новый импорт

from alembic import command
from alembic.config import Config
from app.api.routes import auth, carts, categories, products, promos, reviews
from app.core.config import settings

def custom_uid(route: APIRoute) -> str:
    """
    Генерация короткого operationId.
    По умолчанию берём имя функции-обработчика.
    Если имён-дубликатов не будет — этого достаточно.
    """
    return route.name           

# Create FastAPI app
app = FastAPI(
    title="Shop API",
    description="API for online shop",
    version="0.1.0",
    generate_unique_id_function=custom_uid,   
)


app.add_middleware(
        CORSMiddleware,
        allow_origins=["http://localhost:5173"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

def lifespan(app: FastAPI) -> Iterator[None]:
    """
    Synchronous lifespan event handler for the FastAPI application.

    Runs before the application starts and after it shuts down.
    """
    run_alembic_upgrade()
    yield

# Include API routes
app.include_router(auth.router,      prefix=f"{settings.API_V1_STR}/auth",      tags=["authentication"])
app.include_router(products.router,  prefix=f"{settings.API_V1_STR}/products",  tags=["products"])
app.include_router(categories.router, prefix=f"{settings.API_V1_STR}/categories", tags=["categories"])
app.include_router(reviews.router,   prefix=f"{settings.API_V1_STR}/reviews",   tags=["reviews"])
app.include_router(carts.router,     prefix=f"{settings.API_V1_STR}/carts",     tags=["carts"])
app.include_router(promos.router,    prefix=f"{settings.API_V1_STR}/promos",    tags=["promos"])

# Root endpoint
@app.get("/")
def root():
    """
    Root endpoint.
    """
    return {
        "message": "Welcome to the Shop API",
        "docs": "/docs",
    }

def run_alembic_upgrade():
    """Runs Alembic upgrade to the latest revision."""
    config = Config("alembic.ini")
    config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)
    command.upgrade(config, "head")
    print("Alembic upgrade completed successfully.")
