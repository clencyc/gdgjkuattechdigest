"""
Episode endpoints for the GDG JKUAT Tech Digest Blog API.
Provides CRUD operations for episodes with admin authentication.
"""

from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlalchemy.orm import Session
from sqlalchemy import desc
from typing import List, Optional
import random
import string

from ..database.core import get_db
from ..models.episodes import Episode, Comment
from ..schemas.episodes import (
    EpisodeCreate, EpisodeUpdate, EpisodeBasic, EpisodeDetailed,
    CommentCreate, CommentResponse, LikeResponse, MessageResponse
)
from ..auth import verify_admin_access
from ..services.cloudinary_service import CloudinaryService

router = APIRouter(prefix="/episodes", tags=["episodes"])


def generate_random_name() -> str:
    """Generate a random name for anonymous comments."""
    adjectives = ["Anonymous", "Secret", "Hidden", "Mystery", "Unknown", "Shadow", "Silent", "Invisible"]
    numbers = ''.join(random.choices(string.digits, k=3))
    return f"{random.choice(adjectives)}{numbers}"


# Public Endpoints (No Authentication Required)

@router.get("/", response_model=List[EpisodeBasic])
def get_all_episodes(
    skip: int = 0,
    limit: int = 20,
    db: Session = Depends(get_db)
):
    """
    Get all episodes with basic information (public endpoint).
    
    Args:
        skip: Number of episodes to skip for pagination
        limit: Maximum number of episodes to return
        db: Database session
        
    Returns:
        List[EpisodeBasic]: List of episodes with basic info
    """
    episodes = db.query(Episode).order_by(desc(Episode.episode_number)).offset(skip).limit(limit).all()
    return episodes


@router.get("/{episode_number}", response_model=EpisodeDetailed)
def get_episode_by_number(
    episode_number: int,
    db: Session = Depends(get_db)
):
    """
    Get detailed information about a specific episode (public endpoint).
    
    Args:
        episode_number: The episode number to retrieve
        db: Database session
        
    Returns:
        EpisodeDetailed: Detailed episode information including comments
        
    Raises:
        HTTPException: If episode not found
    """
    episode = db.query(Episode).filter(Episode.episode_number == episode_number).first()
    if not episode:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Episode {episode_number} not found"
        )
    return episode


@router.post("/{episode_number}/like", response_model=LikeResponse)
def like_episode(
    episode_number: int,
    db: Session = Depends(get_db)
):
    """
    Like an episode (public endpoint).
    
    Args:
        episode_number: The episode number to like
        db: Database session
        
    Returns:
        LikeResponse: Updated like count and confirmation message
        
    Raises:
        HTTPException: If episode not found
    """
    episode = db.query(Episode).filter(Episode.episode_number == episode_number).first()
    if not episode:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Episode {episode_number} not found"
        )
    
    episode.like_count += 1
    db.commit()
    db.refresh(episode)
    
    return LikeResponse(
        episode_id=episode.id,
        new_like_count=episode.like_count,
        message="Episode liked successfully!"
    )


@router.post("/{episode_number}/comments", response_model=CommentResponse)
def add_comment(
    episode_number: int,
    comment: CommentCreate,
    db: Session = Depends(get_db)
):
    """
    Add a comment to an episode (public endpoint).
    
    Args:
        episode_number: The episode number to comment on
        comment: Comment data
        db: Database session
        
    Returns:
        CommentResponse: Created comment with random name
        
    Raises:
        HTTPException: If episode not found
    """
    episode = db.query(Episode).filter(Episode.episode_number == episode_number).first()
    if not episode:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Episode {episode_number} not found"
        )
    
    new_comment = Comment(
        episode_id=episode.id,
        comment_text=comment.comment_text,
        random_name=generate_random_name()
    )
    
    db.add(new_comment)
    db.commit()
    db.refresh(new_comment)
    
    return new_comment


# Admin Endpoints (Authentication Required)

@router.post("/", response_model=EpisodeDetailed, status_code=status.HTTP_201_CREATED)
def create_episode(
    episode: EpisodeCreate,
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin_access)
):
    """
    Create a new episode (admin only).
    
    Args:
        episode: Episode data to create
        db: Database session
        _: Admin verification dependency
        
    Returns:
        EpisodeDetailed: Created episode with full details
        
    Raises:
        HTTPException: If episode number already exists
    """
    # Check if episode number already exists
    existing_episode = db.query(Episode).filter(Episode.episode_number == episode.episode_number).first()
    if existing_episode:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Episode {episode.episode_number} already exists"
        )
    
    new_episode = Episode(**episode.dict())
    db.add(new_episode)
    db.commit()
    db.refresh(new_episode)
    
    return new_episode


@router.post("/upload-image", response_model=dict)
def upload_episode_image(
    image: UploadFile = File(...),
    _: bool = Depends(verify_admin_access)
):
    """
    Upload an image for an episode (admin only).
    
    Args:
        image: Image file to upload
        _: Admin verification dependency
        
    Returns:
        dict: Upload result with image URL
        
    Raises:
        HTTPException: If upload fails
    """
    try:
        result = CloudinaryService.upload_image(image.file.read(), image.filename)
        
        if not result.get("success"):
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to upload image: {result.get('error', 'Unknown error')}"
            )
        
        return {
            "message": "Image uploaded successfully",
            "image_url": result["url"],
            "public_id": result["public_id"],
            "width": result.get("width"),
            "height": result.get("height"),
            "format": result.get("format")
        }
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to upload image: {str(e)}"
        )


@router.put("/{episode_number}", response_model=EpisodeDetailed)
def update_episode(
    episode_number: int,
    episode_update: EpisodeUpdate,
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin_access)
):
    """
    Update an existing episode (admin only).
    
    Args:
        episode_number: The episode number to update
        episode_update: Updated episode data
        db: Database session
        _: Admin verification dependency
        
    Returns:
        EpisodeDetailed: Updated episode with full details
        
    Raises:
        HTTPException: If episode not found
    """
    episode = db.query(Episode).filter(Episode.episode_number == episode_number).first()
    if not episode:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Episode {episode_number} not found"
        )
    
    # Update only provided fields
    update_data = episode_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(episode, field, value)
    
    db.commit()
    db.refresh(episode)
    
    return episode


@router.delete("/{episode_number}", response_model=MessageResponse)
def delete_episode(
    episode_number: int,
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin_access)
):
    """
    Delete an episode and all its comments (admin only).
    
    Args:
        episode_number: The episode number to delete
        db: Database session
        _: Admin verification dependency
        
    Returns:
        MessageResponse: Confirmation message
        
    Raises:
        HTTPException: If episode not found
    """
    episode = db.query(Episode).filter(Episode.episode_number == episode_number).first()
    if not episode:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Episode {episode_number} not found"
        )
    
    # Delete all comments for this episode first
    db.query(Comment).filter(Comment.episode_id == episode.id).delete()
    
    # Delete the episode
    db.delete(episode)
    db.commit()
    
    return MessageResponse(
        message=f"Episode {episode_number} and all its comments deleted successfully"
    )


@router.delete("/{episode_number}/comments/{comment_id}", response_model=MessageResponse)
def delete_comment(
    episode_number: int,
    comment_id: int,
    db: Session = Depends(get_db),
    _: bool = Depends(verify_admin_access)
):
    """
    Delete a specific comment from an episode (admin only).
    
    Args:
        episode_number: The episode number
        comment_id: The comment ID to delete
        db: Database session
        _: Admin verification dependency
        
    Returns:
        MessageResponse: Confirmation message
        
    Raises:
        HTTPException: If episode or comment not found
    """
    episode = db.query(Episode).filter(Episode.episode_number == episode_number).first()
    if not episode:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Episode {episode_number} not found"
        )
    
    comment = db.query(Comment).filter(
        Comment.id == comment_id,
        Comment.episode_id == episode.id
    ).first()
    
    if not comment:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"Comment {comment_id} not found in episode {episode_number}"
        )
    
    db.delete(comment)
    db.commit()
    
    return MessageResponse(
        message=f"Comment {comment_id} deleted successfully",
        episode_id=episode.id
    )
