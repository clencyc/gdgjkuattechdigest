from fastapi import FastAPI
from src.database.core import engine, Base
from src.endpoints.episodes import router as episodes_router

app = FastAPI(
    title="GDG JKUAT Tech Digest API",
    description="Episode-based blog platform for GDG JKUAT Tech Digest",
    version="2.0.0"
)

# Create tables
Base.metadata.create_all(bind=engine)

# Include routers
app.include_router(episodes_router)  # Only episode-based API

@app.get("/")
async def root():
    return {
        "message": "Welcome to GDG JKUAT Tech Digest - Episode-Based Blog!",
        "docs": "/docs",
        "status": "active",
        "version": "2.0.0",
        "features": [
            "Episode-based content management",
            "Public viewing and interaction", 
            "Admin authentication with API key",
            "Image upload via Cloudinary",
            "Anonymous commenting system"
        ],
        "api": {
            "episodes": "/episodes",
            "docs": "/docs",
            "openapi": "/openapi.json"
        }
    }