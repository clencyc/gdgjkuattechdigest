from fastapi import FastAPI
from src.database.core import engine, Base
from src.endpoints.episodes import router as episodes_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="GDG JKUAT Tech Digest API",
    description="Episode-based blog platform for GDG JKUAT Tech Digest",
    version="2.0.0"
)

# Include routers
app.include_router(episodes_router)  # Only episode-based API



origins = [
    "http://localhost:3000", 
    "http://localhost:5173", 
    "http://127.0.0.1:5173", 
    "https://gdgjkuattechdigest.onrender.com",
    "https://gdgjkuattechdigest.vercel.app"
    # add the frontend live URL here

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



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
