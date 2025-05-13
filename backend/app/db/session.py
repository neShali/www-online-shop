from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

from app.core.config import settings

# Create SQLAlchemy engine - convert PostgresDsn to string
database_url = str(settings.DATABASE_URI)
engine = create_engine(
    database_url,
    pool_pre_ping=True,  # This helps with connection drops
)

# Create session factory
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
