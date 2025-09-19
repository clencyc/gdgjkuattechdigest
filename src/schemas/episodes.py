from pydantic import BaseModel, Field
from datetime import datetime
from typing import List, Optional


# Episode Schemas
class EpisodeBase(BaseModel):
    title: str = Field(..., min_length=1, max_length=255, description="Episode title")
    content: str = Field(..., min_length=1, description="Episode content in Markdown/HTML")
    image_url: Optional[str] = Field(None, description="Optional image URL from Cloudinary")


class EpisodeCreate(EpisodeBase):
    episode_number: int = Field(..., ge=1, description="Unique episode number")


class EpisodeUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=1, max_length=255)
    content: Optional[str] = Field(None, min_length=1)
    image_url: Optional[str] = None


class EpisodeBasic(BaseModel):
    """Basic episode info for list view"""
    id: int
    episode_number: int
    title: str
    like_count: int
    created_at: datetime

    class Config:
        from_attributes = True


class EpisodeDetailed(EpisodeBasic):
    """Detailed episode info including content and comments"""
    content: str
    image_url: Optional[str]
    updated_at: datetime
    comments: List["CommentResponse"] = []

    class Config:
        from_attributes = True


# Comment Schemas
class CommentCreate(BaseModel):
    comment_text: str = Field(..., min_length=1, max_length=1000, description="Comment text")


class CommentResponse(BaseModel):
    id: int
    comment_text: str
    random_name: str
    created_at: datetime

    class Config:
        from_attributes = True


# API Response Schemas
class LikeResponse(BaseModel):
    episode_id: int
    new_like_count: int
    message: str


class MessageResponse(BaseModel):
    message: str
    episode_id: Optional[int] = None


# Update forward references
EpisodeDetailed.model_rebuild()
