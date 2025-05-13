# FastAPI Online Shop API

## Project Structure

```
shop_api/
├── alembic/                    # Database migrations
├── app/                        # Application code
│   ├── core/                   # Core functionality
│   ├── api/routes/             # API endpoints
│   ├── crud/                   # Database operations
│   ├── db/                     # Database setup
│   ├── models/                 # SQLAlchemy models
│   └── schemas/                # Pydantic schemas
├── tests/                      # Test suite
├── data/                       # Test data
├── alembic.ini                 # Alembic configuration
├── pyproject.toml              # Poetry dependencies
└── README.md                   # This file
```

## Database Schema

The application uses the following database tables:

- **users**: Authentication and user information
- **categories**: Product categories with hierarchical structure
- **products**: Product information
- **reviews**: Product reviews and ratings
- **carts** and **cart_items**: Shopping cart functionality
- **promos** and **product_promos**: Promotions and discounts

## Getting Started

### Prerequisites

- Python 3.10+
- PostgreSQL
- Poetry

### Docker Compose

For development with Docker Compose:

```bash
# Start the application and database
docker-compose up -d

# Run migrations
docker-compose exec app poetry run alembic upgrade head

# Load test data
docker-compose exec db psql -U postgres -d shop_db -f /data/test_data.sql

# команда для bash 
# Load test data
docker-compose exec db bash -c "psql -U postgres -d shop_db -f /data/test_data.sql"
```

### Installation

1. Clone the repository:

```bash
git clone git@github.com:neShali/www-online-shop.git
cd shop-api
```

2. Install dependencies with Poetry:

```bash
poetry install
```

3. Create a `.env` file with your configuration:

```env
POSTGRES_SERVER="db"
POSTGRES_PORT=5432
POSTGRES_USER="postgres"
POSTGRES_PASSWORD="postgres"
POSTGRES_DB="shop_db"
```

4. Run the database migrations:

```bash
poetry run alembic upgrade head
```

5. Optionally, load test data:

```bash
psql -U postgres -h localhost -p 5432 -d shop_db -w postgres -f data/test_data.sql
```

6. Start the development server:

```bash
poetry run uvicorn app.main:app --reload
```

The API will be available at http://localhost:8000.

## API Documentation

Once the application is running, you can access the interactive API documentation at:

- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## API Endpoints

### Authentication

- `POST /api/v1/auth/register`: Register a new user
- `POST /api/v1/auth/login`: Login and get access token
- `POST /api/v1/auth/refresh-token`: Refresh access token
- `GET /api/v1/auth/me`: Get current user info
- `PUT /api/v1/auth/me`: Update current user
- `POST /api/v1/auth/password`: Change password

### Products

- `GET /api/v1/products/`: List products with filtering and pagination
- `GET /api/v1/products/{product_id}`: Get a specific product
- `POST /api/v1/products/`: Create a new product (admin only)
- `PUT /api/v1/products/{product_id}`: Update a product (admin only)
- `DELETE /api/v1/products/{product_id}`: Delete a product (admin only)

### Categories

- `GET /api/v1/categories/`: List all categories
- `GET /api/v1/categories/tree`: Get category tree structure
- `GET /api/v1/categories/{category_id}`: Get a specific category
- `POST /api/v1/categories/`: Create a new category (admin only)
- `PUT /api/v1/categories/{category_id}`: Update a category (admin only)
- `DELETE /api/v1/categories/{category_id}`: Delete a category (admin only)

### Reviews

- `GET /api/v1/reviews/product/{product_id}`: Get reviews for a product
- `GET /api/v1/reviews/avg/{product_id}`: Get average rating for a product
- `POST /api/v1/reviews/`: Create a review
- `PUT /api/v1/reviews/{review_id}`: Update a review
- `DELETE /api/v1/reviews/{review_id}`: Delete a review

### Carts

- `GET /api/v1/carts/me`: Get current user's cart
- `POST /api/v1/carts/items`: Add item to cart
- `PUT /api/v1/carts/items/{item_id}`: Update cart item
- `DELETE /api/v1/carts/items/{item_id}`: Remove item from cart
- `DELETE /api/v1/carts/clear`: Clear cart

### Promos

- `GET /api/v1/promos/`: List all promos (admin only)
- `GET /api/v1/promos/active`: List active promos
- `GET /api/v1/promos/code/{code}`: Get promo by code
- `POST /api/v1/promos/`: Create a new promo (admin only)
- `PUT /api/v1/promos/{promo_id}`: Update a promo (admin only)
- `DELETE /api/v1/promos/{promo_id}`: Delete a promo (admin only)
- `GET /api/v1/promos/{promo_id}/products`: Get products for a promo
- `POST /api/v1/promos/product`: Add product to promo
- `DELETE /api/v1/promos/product/{promo_id}/{product_id}`: Remove product from promo

## Testing

```bash
poetry run pytest
```

To run tests with coverage report:

```bash
poetry run pytest --cov=app
```

## Database Migrations

The project uses Alembic for database migrations. To create a new migration after model changes:

```bash
poetry run alembic revision --autogenerate -m "Description of changes"
```

To apply migrations:

```bash
poetry run alembic upgrade head
```

## Development Guidelines

### Code Style

The project follows PEP 8 style guide. Code formatting is managed with Black and isort:

```bash
# Format code
poetry run black .
poetry run isort .

# TODO
# Check code style
poetry run flake8
poetry run mypy app
```

### Adding New Features

When adding new features:

1. Create or update models in `app/models/`
2. Create or update schemas in `app/schemas/`
3. Implement CRUD operations in `app/crud/`
4. Create API endpoints in `app/api/routes/`
5. Generate migrations with Alembic
6. Write tests in `tests/`

## Deployment

### Docker

A Dockerfile is provided for containerized deployment:

```bash
# Build the Docker image
docker build -t shop-api .

# Run the container
docker run -p 8000:8000 --env-file .env shop-api
```


