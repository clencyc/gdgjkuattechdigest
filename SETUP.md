# GDG JKUAT Tech Digest API Documentation

## 📋 Prerequisites

Before running the application, ensure you have the following installed:

- **Python 3.11 or 3.12** (Python 3.13 may have compatibility issues)
- **PostgreSQL** (or access to a PostgreSQL database like Neon)
- **Git** (for cloning the repository)

## 🚀 Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/clencyc/gdgjkuattechdigest.git
cd gdgjkuattechdigest
```

### 2. Create a Virtual Environment

```bash
# Create virtual environment
python3.11 -m venv venv

# Activate virtual environment
# On Linux/Mac:
source venv/bin/activate

# On Windows:
# venv\Scripts\activate
```

### 3. Install Dependencies

```bash
# Upgrade pip
pip install --upgrade pip

# Install requirements
pip install -r requirements.txt

# If you encounter issues with psycopg2, try:
pip install psycopg2-binary==2.9.9
```

### 4. Environment Configuration

Create a `.env` file in the project root with your database configuration:

```bash
# Copy the example file
cp .env.example .env
```

Edit the `.env` file with your database credentials:

```env
# Database Configuration
DATABASE_URL=postgresql://neondb_owner:your_password@your-host/neondb?sslmode=require&channel_binding=require

# Admin Configuration (for future authentication)
ADMIN_USERNAME=gdg_admin
ADMIN_PASSWORD=your_secure_password_here
ADMIN_EMAIL=gdg.jkuat@gmail.com

# Security
SECRET_KEY=your-super-secret-jwt-key-here
```

### 5. Create Required Directories

Ensure all necessary directories exist:

```bash
# Create __init__.py files for Python packages
touch src/__init__.py
touch src/entities/__init__.py
touch src/database/__init__.py
touch src/endpoints/__init__.py
```

## 🏃‍♂️ Running the Application

### Option 1: Run from src directory (Recommended)

```bash
# Navigate to src directory
cd src

# Update imports in main.py to use relative imports
# Change: from src.database.core import engine, Base
# To: from database.core import engine, Base

# Start the server
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

### Option 2: Run from project root

```bash
# From project root
export PYTHONPATH="${PYTHONPATH}:$(pwd)/src"
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

### Option 3: Using Python module syntax

```bash
# From project root
python -m uvicorn src.main:app --reload --host 0.0.0.0 --port 8000
```

## 📱 Accessing the Application

Once the server is running, you can access:

- **API Documentation (Swagger UI)**: http://localhost:8000/docs
- **Alternative API Documentation (ReDoc)**: http://localhost:8000/redoc
- **API Base URL**: http://localhost:8000
- **Health Check**: http://localhost:8000/

## 🔧 API Endpoints

### Blog Posts

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| `POST` | `/posts/createpost/` | Create a new blog post | Admin |
| `GET` | `/posts/posts/` | Get all published posts with pagination | Public |
| `GET` | `/posts/all/` | Get all posts (including drafts) | Admin |
| `GET` | `/posts/post/{post_id}` | Get a specific post by ID | Public |

### Example API Requests

#### Create a Post
```bash
curl -X POST "http://localhost:8000/posts/createpost/" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Tech Post",
    "content": "This is the content of my first blog post about technology...",
    "excerpt": "A brief introduction to tech",
    "featured_image": "https://example.com/image.jpg",
    "tags": "tech,programming,gdg",
    "is_published": true,
    "is_featured": false
  }'
```

#### Get Published Posts
```bash
curl "http://localhost:8000/posts/posts/?skip=0&limit=10"
```

#### Get a Specific Post
```bash
curl "http://localhost:8000/posts/post/{post_id}"
```

## 🗃️ Database Schema

The application uses the following main tables:

- **blog_posts**: Main blog posts table
- **blog_comments**: Comments on blog posts
- **blog_likes**: Likes/reactions on posts
- **blog_image**: Images associated with posts

## 🛠️ Development

### Project Structure

```
gdgjkuattechdigest/
├── src/
│   ├── __init__.py
│   ├── main.py                 # FastAPI application entry point
│   ├── entities/
│   │   ├── __init__.py
│   │   └── blogmodels.py       # SQLAlchemy models
│   ├── database/
│   │   ├── __init__.py
│   │   ├── core.py             # Database connection
│   │   └── pydanticschemas.py  # Pydantic schemas
│   └── endpoints/
│       ├── __init__.py
│       └── posts.py            # Blog post API routes
├── requirements.txt
├── .env                        # Environment variables
├── .env.example               # Environment template
├── .gitignore
└── README.md
```

### Adding New Features

1. **New API endpoints**: Add to `src/endpoints`
2. **New database models**: Add to `src/entities/blogmodels.py`
3. **New schemas**: Add to `src/database/pydanticschemas.py`

### Database Migrations

For production deployments, consider using Alembic for database migrations:

```bash
pip install alembic
alembic init migrations
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

## 🐛 Troubleshooting

### Common Issues

1. **Import Errors**: Make sure you're running from the correct directory and have all `__init__.py` files

2. **Database Connection Errors**: Verify your `DATABASE_URL` in the `.env` file

3. **Module Not Found**: Ensure virtual environment is activated and dependencies are installed

4. **psycopg2 Installation Issues**: 
   ```bash
   # Try installing binary version
   pip install psycopg2-binary
   
   # Or use psycopg3
   pip install psycopg[binary]
   ```

### Debug Mode

To run with debug logging:

```bash
uvicorn src.main:app --reload --host 0.0.0.0 --port 8000 --log-level debug
```

### Fix Common Import Issues

If you encounter import errors in `src/endpoints/posts.py`, update the following:

```python
# Change this:
from http.client import HTTPException

# To this:
from fastapi import HTTPException

# Fix typos like:
blogmodels.blog_postsosts.is_published

# To:
blogmodels.blog_posts.is_published
```

## 🚀 Production Deployment

For production deployment:

1. Set `DATABASE_URL` to your production database
2. Use a production WSGI server like Gunicorn:
   ```bash
   pip install gunicorn
   gunicorn src.main:app -w 4 -k uvicorn.workers.UvicornWorker
   ```
3. Set up reverse proxy (Nginx)
4. Use environment variables for sensitive configuration
5. Enable HTTPS/TLS

## 📊 Testing the API

### Using curl

```bash
# Test health endpoint
curl http://localhost:8000/

# Test API documentation
curl http://localhost:8000/docs
```

### Using Python requests

```python
import requests

# Test creating a post
response = requests.post(
    "http://localhost:8000/posts/createpost/",
    json={
        "title": "Test Post",
        "content": "This is a test post",
        "is_published": True
    }
)
print(response.json())
```

## 📞 Support

For issues or questions:
- Create an issue on GitHub
- Contact the GDG JKUAT team
- Check the API documentation at `/docs` endpoint

---

**Happy coding! 🚀**

*Built with ❤️ by GDG JKUAT*
