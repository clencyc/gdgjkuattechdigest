from fastapi import FastAPI
from src.database.core import engine, Base
from src.endpoints.posts import router as posts_router

app = FastAPI(
    title="GDG JKUAT Tech Digest API",
    description="API for the GDG JKUAT Tech Digest blog platform",
    version="1.0.0"
)

# Create tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(posts_router)

@app.get("/")
async def root():
    return {
        "message": "Welcome to GDG JKUAT Tech Digest API!",
        "docs": "/docs",
        "status": "active"
    }