from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from typing import List, Optional
from pydantic import BaseModel
from datetime import datetime
import uuid


class PostCreate(BaseModel):
    title: str
    content: str
    author_name: Optional[str] = "JKUAT TECH DIGEST ADMIN"
    excerpt: Optional[str] = None
    featured_image: Optional[str] = None
    tags: Optional[str] = None
    is_published: bool = False
    is_featured: bool = None

class PostResponse(BaseModel):
    post_id: uuid.UUID
    title: str
    content: str
    author_name: str
    excerpt: Optional[str]
    featured_image: Optional[str]
    tags: Optional[str]
    created_at: datetime
    updated_at: Optional[datetime]
    published_at: Optional[datetime]
    is_published: bool
    is_featured: Optional[bool]

    class Config:
        orm_mode = True

class PostUpdate(BaseModel):
    title: Optional[str] = None
    content: Optional[str] = None
    excerpt: Optional[str] = None
    featured_image: Optional[str] = None
    tags: Optional[str] = None
    is_published: Optional[bool] = None
    is_featured: Optional[bool] = None