import os
import cloudinary
import cloudinary.uploader
import cloudinary.api
from dotenv import load_dotenv
from typing import Optional, Dict, Any
import uuid

load_dotenv()

# Configure Cloudinary
cloudinary.config(
    cloud_name=os.getenv("CLOUDINARY_CLOUD_NAME", "dsuzvrur2"),
    api_key=os.getenv("CLOUDINARY_API_KEY"),
    api_secret=os.getenv("CLOUDINARY_API_SECRET"),
    secure=True
)

class CloudinaryService:
    """Service for handling image uploads and operations with Cloudinary"""
    
    @staticmethod
    def upload_image(
        file_content: bytes,
        filename: str,
        folder: str = "gdg-jkuat-blog",
        public_id: Optional[str] = None
    ) -> Dict[str, Any]:
        """
        Upload an image to Cloudinary
        
        Args:
            file_content: The image file content as bytes
            filename: Original filename
            folder: Cloudinary folder to store the image
            public_id: Custom public ID (optional)
            
        Returns:
            Dictionary with upload result including URL, public_id, etc.
        """
        try:
            # Generate unique public_id if not provided
            if not public_id:
                file_extension = filename.split('.')[-1] if '.' in filename else 'jpg'
                public_id = f"{uuid.uuid4().hex[:12]}.{file_extension}"
            
            # Upload configuration
            upload_result = cloudinary.uploader.upload(
                file_content,
                folder=folder,
                public_id=public_id,
                resource_type="image",
                transformation=[
                    {"quality": "auto"},
                    {"fetch_format": "auto"}
                ],
                tags=["gdg-jkuat", "blog", "auto-upload"]
            )
            
            return {
                "success": True,
                "url": upload_result.get("secure_url"),
                "public_id": upload_result.get("public_id"),
                "width": upload_result.get("width"),
                "height": upload_result.get("height"),
                "format": upload_result.get("format"),
                "bytes": upload_result.get("bytes"),
                "created_at": upload_result.get("created_at")
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    @staticmethod
    def upload_featured_image(
        file_content: bytes,
        filename: str,
        post_id: str
    ) -> Dict[str, Any]:
        """
        Upload a featured image for a blog post
        
        Args:
            file_content: The image file content
            filename: Original filename
            post_id: The blog post ID
            
        Returns:
            Upload result dictionary
        """
        public_id = f"featured_{post_id}_{uuid.uuid4().hex[:8]}"
        
        try:
            upload_result = cloudinary.uploader.upload(
                file_content,
                folder="gdg-jkuat-blog/featured",
                public_id=public_id,
                transformation=[
                    {"width": 1200, "height": 630, "crop": "fill"},
                    {"quality": "auto"},
                    {"fetch_format": "auto"}
                ],
                tags=["gdg-jkuat", "blog", "featured-image"]
            )
            
            return {
                "success": True,
                "url": upload_result.get("secure_url"),
                "public_id": upload_result.get("public_id"),
                "width": upload_result.get("width"),
                "height": upload_result.get("height")
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    @staticmethod
    def upload_content_image(
        file_content: bytes,
        filename: str,
        post_id: str
    ) -> Dict[str, Any]:
        """
        Upload an image for blog post content
        
        Args:
            file_content: The image file content
            filename: Original filename
            post_id: The blog post ID
            
        Returns:
            Upload result dictionary
        """
        public_id = f"content_{post_id}_{uuid.uuid4().hex[:8]}"
        
        try:
            upload_result = cloudinary.uploader.upload(
                file_content,
                folder="gdg-jkuat-blog/content",
                public_id=public_id,
                transformation=[
                    {"width": 800, "crop": "scale"},
                    {"quality": "auto"},
                    {"fetch_format": "auto"}
                ],
                tags=["gdg-jkuat", "blog", "content-image"]
            )
            
            return {
                "success": True,
                "url": upload_result.get("secure_url"),
                "public_id": upload_result.get("public_id"),
                "alt_text": filename.split('.')[0].replace('-', ' ').replace('_', ' ').title()
            }
            
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    @staticmethod
    def delete_image(public_id: str) -> Dict[str, Any]:
        """
        Delete an image from Cloudinary
        
        Args:
            public_id: The Cloudinary public ID of the image
            
        Returns:
            Deletion result dictionary
        """
        try:
            result = cloudinary.uploader.destroy(public_id)
            return {
                "success": result.get("result") == "ok",
                "result": result.get("result")
            }
        except Exception as e:
            return {
                "success": False,
                "error": str(e)
            }
    
    @staticmethod
    def get_image_url(
        public_id: str,
        transformation: Optional[Dict] = None
    ) -> str:
        """
        Get optimized image URL with transformations
        
        Args:
            public_id: The Cloudinary public ID
            transformation: Optional transformation parameters
            
        Returns:
            Optimized image URL
        """
        if transformation:
            return cloudinary.CloudinaryImage(public_id).build_url(**transformation)
        else:
            return cloudinary.CloudinaryImage(public_id).build_url(
                quality="auto",
                fetch_format="auto"
            )
    
    @staticmethod
    def get_responsive_urls(public_id: str) -> Dict[str, str]:
        """
        Get multiple responsive image URLs for different screen sizes
        
        Args:
            public_id: The Cloudinary public ID
            
        Returns:
            Dictionary with different sized image URLs
        """
        base_image = cloudinary.CloudinaryImage(public_id)
        
        return {
            "thumbnail": base_image.build_url(width=150, height=150, crop="thumb", quality="auto"),
            "small": base_image.build_url(width=400, crop="scale", quality="auto"),
            "medium": base_image.build_url(width=800, crop="scale", quality="auto"),
            "large": base_image.build_url(width=1200, crop="scale", quality="auto"),
            "original": base_image.build_url(quality="auto", fetch_format="auto")
        }