from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from datetime import datetime
import random

from ..database.core import Base


class Episode(Base):
    """Episode model for the GDG blog system"""
    __tablename__ = "episodes"

    id = Column(Integer, primary_key=True, index=True)
    episode_number = Column(Integer, unique=True, nullable=False, index=True)
    title = Column(String(255), nullable=False)
    content = Column(Text, nullable=False)
    image_url = Column(String, nullable=True)
    like_count = Column(Integer, default=0, nullable=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now(), nullable=False)

    # Relationships
    comments = relationship("Comment", back_populates="episode", cascade="all, delete-orphan")


class Comment(Base):
    """Comment model for episodes"""
    __tablename__ = "comments"

    id = Column(Integer, primary_key=True, index=True)
    episode_id = Column(Integer, ForeignKey("episodes.id"), nullable=False)
    comment_text = Column(Text, nullable=False)
    random_name = Column(String(50), nullable=False)
    created_at = Column(DateTime, default=func.now(), nullable=False)

    # Relationships
    episode = relationship("Episode", back_populates="comments")

    def __init__(self, **kwargs):
        if "random_name" not in kwargs:
            kwargs["random_name"] = self.generate_random_name()
        super().__init__(**kwargs)

    @staticmethod
    def generate_random_name():
        """Generate a random name for anonymous comments"""
        prefixes = [
            "Guest", "Anonymous", "Student", "Techie", "Coder", "Developer",
            "Learner", "Builder", "Maker", "Explorer", "Innovator"
        ]
        number = random.randint(1000, 9999)
        return f"{random.choice(prefixes)}{number}"
