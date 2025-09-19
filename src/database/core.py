import os
from typing import Annotated
from fastapi import Depends
from sqlalchemy.orm import sessionmaker, Session
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.pool import QueuePool

load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

# Enhanced engine configuration for Neon database
engine = create_engine(
    DATABASE_URL,
    poolclass=QueuePool,
    pool_size=5,
    max_overflow=10,
    pool_pre_ping=True,  # Validates connections before use
    pool_recycle=3600,   # Recycle connections every hour
    connect_args={
        "sslmode": "require",
        "sslcert": None,
        "sslkey": None,
        "sslrootcert": None,
        "connect_timeout": 10,
        "keepalives_idle": 600,
        "keepalives_interval": 30,
        "keepalives_count": 3,
    }
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Import models to register them with SQLAlchemy Base
from ..entities.blogmodels import *  # Legacy blog models
from ..models.episodes import *      # New episode-based models

def get_db():
    db = SessionLocal()
    try:
        yield db
    except Exception as e:
        db.rollback()
        raise
    finally:
        db.close()

DbSession = Annotated[Session, Depends(get_db)]