# routes for creating, reading, updating and deleting posts

from fastapi import HTTPException
from typing import List
from fastapi import FastAPI, Query, APIRouter
from fastapi.params import Depends
from src.entities import blogmodels
from sqlalchemy.orm import Session
from src.database import pydanticschemas
from src.database.core import SessionLocal, get_db
from src.database.pydanticschemas import PostResponse, PostCreate, PostUpdate
import uuid
from datetime import datetime

app = FastAPI(title = "JKUAT Tech Digest API Server")
router = APIRouter(prefix="/posts", tags=["posts"])

@router.post('/createpost/', response_model=PostResponse, status_code=201)
async def createpost(
    post_data: PostCreate,
    db: Session = Depends(get_db)
): 
    """Create a new blog post"""
    try:
        new_post = blogmodels.blog_posts(
            title=post_data.title,
            content=post_data.content,
            author_name=post_data.author_name,
            excerpt=post_data.excerpt,
            featured_image=post_data.featured_image,
            tags=post_data.tags,
            is_published=post_data.is_published,
            is_featured=post_data.is_featured,
            published_at=datetime.utcnow() if post_data.is_published else None
        )
        db.add(new_post)
        db.commit()
        db.refresh(new_post)
        return PostResponse(
            post_id=str(new_post.post_id),
            title=new_post.title,
            content=new_post.content,
            author_name=new_post.author_name,
            excerpt=new_post.excerpt,
            featured_image=new_post.featured_image,
            tags=new_post.tags,
            created_at=new_post.created_at,
            updated_at=new_post.updated_at,
            published_at=new_post.published_at,
            is_published=new_post.is_published,
            is_featured=new_post.is_featured
        )

    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=f"Failed to create post: {str(e)}")


# get all posts
@router.get('/posts/', response_model=List[PostResponse])
async def get_posts(
    skip: int = Query(0, ge=0, description="Number of records to skip"),
    limit: int = Query(10, ge=1, le=100, description="Maximum number of records to return"),
    db: Session = Depends(get_db)
):
    """Get all published blog posts with pagination"""
    posts = (
        db.query(blogmodels.blog_posts)
        .filter(blogmodels.blog_posts.is_published == True)
        .order_by(blogmodels.blog_posts.published_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

    return [
        PostResponse(
            post_id=str(post.post_id),
            title=post.title,
            content=post.content,
            author_name=post.author_name,
            excerpt=post.excerpt,
            featured_image=post.featured_image,
            tags=post.tags,
            created_at=post.created_at,
            updated_at=post.updated_at,
            published_at=post.published_at,
            is_published=post.is_published,
            is_featured=post.is_featured
        )
        for post in posts
    ]

@router.get('/all/', response_model=List[PostResponse])
async def get_all_posts(
    skip:int = Query(0, ge=0),
    limit: int = Query(10, ge=1, le=50),
    db: Session = Depends(get_db)
):
    """Get all blog posts, including unpublished ones, with pagination"""
    posts = (
        db.query(blogmodels.blog_posts)
        .order_by(blogmodels.blog_posts.created_at.desc())
        .offset(skip)
        .limit(limit)
        .all()
    )

    return [
        PostResponse(
            post_id=str(post.post_id),
            title=post.title,
            content=post.content,
            author_name=post.author_name,
            excerpt=post.excerpt,
            featured_image=post.featured_image,
            tags=post.tags,
            created_at=post.created_at,
            updated_at=post.updated_at,
            published_at=post.published_at,
            is_published=post.is_published,
            is_featured=post.is_featured
        )
        for post in posts
    ]

@router.get('/post/{post_id}', response_model=PostResponse)
async def get_post(
    post_id: str,
    db: Session = Depends(get_db)
):
    """Get a single blog post by ID"""
    post = db.query(blogmodels.blog_posts).filter(blogmodels.blog_posts.post_id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    try:
        post_uuid = uuid.UUID(post_id)

        post = db.query(blogmodels.blog_posts).filter(blogmodels.blog_posts.post_id == post_uuid).first()
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
        
        if not post.is_published:
            raise HTTPException(status_code=403, detail="Post is not published")
            
        return PostResponse(
            post_id=str(post.post_id),
            title=post.title,
            content=post.content,
            author_name=post.author_name,
            excerpt=post.excerpt,
            featured_image=post.featured_image,
            tags=post.tags,
            created_at=post.created_at,
            updated_at=post.updated_at,
            published_at=post.published_at,
            is_published=post.is_published,
            is_featured=post.is_featured
        )
    except ValueError:
        raise HTTPException(status_code=400, detail="Invalid post ID format")
    
#  TODO: Delete post endpoint for only the admin

app.include_router(router)
#  TODO: Delete post endpoint for only the admin