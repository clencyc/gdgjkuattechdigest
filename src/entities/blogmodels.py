from sqlalchemy import Column, String, Boolean, DateTime, ForeignKey, Enum, Text
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
import uuid
from datetime import datetime, timezone
import enum
import random
from src.database.core import Base

# random comment generator
def generate_random_commenter_name():
    """Generate a random name for anonymous commenters"""
    adjectives = [
        "Tech", "Curious", "Inquisitive", "Silent", "Thoughtful", "Clever", "Witty", "Brave", "Bold", "Swift"
        "cloud", "code", "byte", "script", "debug", "pixel", "data", "node", "loop", "stack"
    ]

    nouns = [
        "Explorer", "Thinker", "Coder", "Hacker", "Ninja", "Guru", "Wizard", "Samurai", "Ranger", "Voyager"
        "hawk", "lion", "tiger", "eagle", "wolf", "dragon", "phoenix", "unicorn", "griffin", "pegasus"
    ]

    numbers = random.randint(10, 99)
    return f"{random.choice(adjectives)}{random.choice(nouns)}{numbers}"


class blog_posts(Base):
    __tablename__ = "blog_posts"

    post_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    author_name = Column(String(100), nullable=False, default="JKUAT TECH DIGEST ADMIN")

    # Optional fields
    excerpt = Column(String(500), nullable=True)
    featured_image = Column(String, nullable=True)
    tags = Column(String, nullable=True)

    # Metadata
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=True)
    published_at = Column(DateTime, nullable=True)

    # status
    is_published = Column(Boolean, default=False)
    is_featured = Column(Boolean, nullable=True)

    # Relationships
    comments = relationship("blog_comments", back_populates="post", cascade="all, delete-orphan")
    likes = relationship("blog_likes", back_populates="post", cascade="all, delete-orphan")
    images = relationship("blog_image", back_populates="post", cascade="all, delete-orphan")

class blog_image(Base):
    __tablename__ = "blog_image"

    image_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    post_id = Column(UUID(as_uuid=True), ForeignKey("blog_posts.post_id"), nullable=False)
    image_url = Column(String, nullable=False)
    alt_text = Column(String, nullable=True)

    # Metadata
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=True)

    # Relationship
    post = relationship("blog_posts", back_populates="images")

class blog_comments(Base):
    __tablename__ = "blog_comments"

    comment_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    post_id = Column(UUID(as_uuid=True), ForeignKey("blog_posts.post_id"), nullable=False)

    commenter_name = Column(String(100), nullable=False, default=generate_random_commenter_name)
    commenter_email = Column(String(100), nullable=True)
    content = Column(Text, nullable=False)

    #  Metadata
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)
    updated_at = Column(DateTime, nullable=True)

    # Relationships
    post = relationship("blog_posts", back_populates="comments")


class blog_likes(Base):
    __tablename__ = "blog_likes"

    like_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    post_id = Column(UUID(as_uuid=True), ForeignKey("blog_posts.post_id"), nullable=False)

    # Metadata
    created_at = Column(DateTime, nullable=False, default=datetime.utcnow)

    # Relationships
    post = relationship("blog_posts", back_populates="likes")