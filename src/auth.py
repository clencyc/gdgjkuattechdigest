"""
Authentication middleware for the Episode Blog API.
Provides admin authentication using API key.
"""

from fastapi import HTTPException, status, Depends
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from typing import Optional
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize security scheme
security = HTTPBearer(auto_error=False)

# Admin API key from environment
ADMIN_API_KEY = os.getenv("ADMIN_API_KEY", "your-super-secure-admin-key-here")


def get_admin_key(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> str:
    """
    Verify admin API key from Authorization header.
    
    Args:
        credentials: Bearer token from Authorization header
        
    Returns:
        str: Validated API key
        
    Raises:
        HTTPException: If API key is missing or invalid
    """
    if not credentials:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authorization header required",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    if credentials.credentials != ADMIN_API_KEY:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid API key",
            headers={"WWW-Authenticate": "Bearer"},
        )
    
    return credentials.credentials


def verify_admin_access(api_key: str = Depends(get_admin_key)) -> bool:
    """
    Dependency to verify admin access.
    
    Args:
        api_key: Validated API key from get_admin_key
        
    Returns:
        bool: True if authenticated
    """
    return True


# Optional: Create a dependency that doesn't raise an error for public endpoints
def get_optional_admin(credentials: Optional[HTTPAuthorizationCredentials] = Depends(security)) -> bool:
    """
    Check if request has valid admin credentials without raising error.
    
    Args:
        credentials: Bearer token from Authorization header
        
    Returns:
        bool: True if valid admin credentials, False otherwise
    """
    if not credentials:
        return False
    
    return credentials.credentials == ADMIN_API_KEY
