import os
import sys
from datetime import datetime, timedelta, timezone
import uuid
import random

# Add src to path
sys.path.append(os.path.join(os.path.dirname(__file__), 'src'))

from sqlalchemy.orm import sessionmaker
from src.database.core import engine, Base
from src.entities.blogmodels import blog_posts, blog_comments, blog_likes, blog_image, generate_random_commenter_name

# Create session
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

def seed_database():
    """Seed the database with sample data for GDG JKUAT Tech Digest"""
    db = SessionLocal()
    
    try:
        print("🌱 Starting database seeding...")
        
        # Clear existing data (optional - comment out if you want to keep existing data)
        print("🗑️  Clearing existing data...")
        db.query(blog_likes).delete()
        db.query(blog_comments).delete()
        db.query(blog_image).delete()
        db.query(blog_posts).delete()
        db.commit()
        
        # Sample blog posts data (keeping your existing sample_posts array...)
        sample_posts = [
            {
                "title": "Welcome to GDG JKUAT Tech Digest",
                "content": """
# Welcome to Our Tech Community! 🚀

We're excited to launch the GDG JKUAT Tech Digest - your go-to source for tech insights, tutorials, and community stories from Jomo Kenyatta University of Agriculture and Technology.

## What You Can Expect

- **Weekly Tech Tutorials**: From beginner to advanced levels
- **Project Showcases**: Amazing projects by our community members  
- **Industry Insights**: Career advice and tech trends
- **Event Coverage**: Recaps from our workshops and hackathons

## Join Our Community

Whether you're a beginner or an experienced developer, there's something here for everyone. Let's build the future of technology together!

Stay tuned for exciting content coming your way! 💻✨
                """,
                "excerpt": "Introducing the GDG JKUAT Tech Digest - your new home for tech content, tutorials, and community stories.",
                "featured_image": "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800",
                "tags": "welcome,community,gdg,jkuat",
                "is_published": True,
                "is_featured": True
            },
            {
                "title": "Getting Started with Python: A Beginner's Guide",
                "content": """
# Python Programming for Beginners 🐍

Python is one of the most popular programming languages in the world, and for good reason! It's beginner-friendly, powerful, and versatile.

## Why Choose Python?

1. **Easy to Learn**: Clean and readable syntax
2. **Versatile**: Web development, data science, AI, automation
3. **Great Community**: Lots of resources and support
4. **Job Opportunities**: High demand in the market

## Your First Python Program

```python
print("Hello, GDG JKUAT!")

# Variables and data types
name = "Student"
age = 20
is_learning = True

print(f"Hi {name}, you are {age} years old!")
```

## Next Steps

1. Install Python from python.org
2. Try our interactive coding challenges
3. Join our Python study group every Thursday!

Happy coding! 🎉
                """,
                "excerpt": "Learn Python programming from scratch with this comprehensive beginner's guide from GDG JKUAT.",
                "featured_image": "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=800",
                "tags": "python,programming,tutorial,beginners",
                "is_published": True,
                "is_featured": True
            },
            # ... rest of your sample posts
        ]
        
        # Create blog posts
        print("📝 Creating blog posts...")
        created_posts = []
        for i, post_data in enumerate(sample_posts):
            # Create post with different publication dates - FIX: Use timezone-aware datetime
            days_ago = len(sample_posts) - i
            created_date = datetime.utcnow() - timedelta(days=days_ago)
            published_date = created_date if post_data["is_published"] else None
            
            post = blog_posts(
                title=post_data["title"],
                content=post_data["content"],
                excerpt=post_data["excerpt"],
                featured_image=post_data["featured_image"],
                tags=post_data["tags"],
                is_published=post_data["is_published"],
                is_featured=post_data["is_featured"],
                created_at=created_date,
                published_at=published_date
            )
            db.add(post)
            created_posts.append(post)
        
        db.commit()
        print(f"✅ Created {len(created_posts)} blog posts")
        
        # Create sample images for posts
        print("🖼️  Adding post images...")
        sample_images = [
            {"alt_text": "GDG JKUAT Community Event", "url": "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=600"},
            {"alt_text": "Python Code Example", "url": "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=600"},
            {"alt_text": "FastAPI Documentation", "url": "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600"},
            {"alt_text": "Git Workflow Diagram", "url": "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=600"},
        ]
        
        for i, post in enumerate(created_posts[:4]):  # Add images to first 4 posts
            if i < len(sample_images):
                image = blog_image(
                    post_id=post.post_id,
                    image_url=sample_images[i]["url"],
                    alt_text=sample_images[i]["alt_text"]
                )
                db.add(image)
        
        db.commit()
        print("✅ Added post images")
        
        # Create sample comments
        print("💬 Creating comments...")
        
        # Sample comment templates
        comment_templates = [
            "Great article! This really helped me understand the concepts. Thanks for sharing!",
            "Excellent tutorial! Can't wait to try this out. Do you have any advanced tips?",
            "This is exactly what I was looking for. The code examples are super clear.",
            "Thanks for this comprehensive guide. Very well explained!",
            "Awesome content! When will you be covering advanced techniques?",
            "Perfect timing for this post! I was just working on a similar project.",
            "Love the step-by-step approach. Makes it easy to follow along.",
            "This tutorial saved me hours of research. Thank you so much!",
            "Clear and concise explanation. Looking forward to more content like this.",
            "Great job on this article! The examples really bring the concepts to life."
        ]
        
        for post in created_posts:
            # Add 3-8 comments per post
            num_comments = random.randint(3, 8)
            for _ in range(num_comments):
                template = random.choice(comment_templates)
                
                # Random comment date between post creation and now - FIX: Use timezone-aware datetime
                max_hours = max(1, int((datetime.utcnow() - post.created_at).total_seconds() // 3600))
                comment_date = post.created_at + timedelta(hours=random.randint(1, max_hours))
                
                comment = blog_comments(
                    post_id=post.post_id,
                    content=template,
                    created_at=comment_date
                )
                db.add(comment)
        
        db.commit()
        print("✅ Created sample comments")
        
        # Create sample likes - FIX: Use only fields that exist in your model
        print("👍 Creating likes...")
        
        for post in created_posts:
            # Add 10-50 likes per post
            num_likes = random.randint(10, 50)
            for i in range(num_likes):
                # Random like date between post creation and now - FIX: Use timezone-aware datetime
                max_hours = max(1, int((datetime.utcnow() - post.created_at).total_seconds() // 3600))
                like_date = post.created_at + timedelta(hours=random.randint(1, max_hours))
                
                # FIX: Only use fields that exist in your blog_likes model
                like = blog_likes(
                    post_id=post.post_id,
                    created_at=like_date
                )
                db.add(like)
        
        db.commit()
        print("✅ Created sample likes")
        
        # Update post statistics
        print("📊 Updating post statistics...")
        for post in created_posts:
            comment_count = db.query(blog_comments).filter(blog_comments.post_id == post.post_id).count()
            like_count = db.query(blog_likes).filter(blog_likes.post_id == post.post_id).count()
            
            # Only update if these fields exist in your model
            if hasattr(post, 'comment_count'):
                post.comment_count = comment_count
            if hasattr(post, 'like_count'):
                post.like_count = like_count
            if hasattr(post, 'view_count'):
                post.view_count = random.randint(like_count * 2, like_count * 5)
        
        db.commit()
        print("✅ Updated post statistics")
        
        print("\n🎉 Database seeding completed successfully!")
        print("\n📊 Summary:")
        print(f"   • {len(created_posts)} blog posts created")
        print(f"   • {db.query(blog_comments).count()} comments added")
        print(f"   • {db.query(blog_likes).count()} likes generated")
        print(f"   • {db.query(blog_image).count()} images attached")
        
        print("\n🚀 Your GDG JKUAT Tech Digest is ready!")
        print("   Start your server and visit http://localhost:8000/docs to explore the API")
        
    except Exception as e:
        print(f"❌ Error during seeding: {e}")
        db.rollback()
        raise
    finally:
        db.close()

if __name__ == "__main__":
    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)
    
    # Seed the database
    seed_database()