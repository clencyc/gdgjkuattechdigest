#!/bin/bash

# GDG JKUAT Tech Digest Episode API Testing Script
# Make sure your server is running: uvicorn src.main:app --host 0.0.0.0 --port 8000 --reload

BASE_URL="http://localhost:8000"
API_KEY="gdg-jkuat-2024-admin-secure-key-xyz789ABC"

echo "🚀 Testing GDG JKUAT Tech Digest Episode API"
echo "============================================="

# Test 1: Root endpoint
echo -e "\n📍 1. Testing Root Endpoint"
curl -s "$BASE_URL/" | jq .

# Test 2: Get all episodes (should be empty initially)
echo -e "\n📍 2. Get All Episodes (Public)"
curl -s -X GET "$BASE_URL/episodes/" | jq .

# Test 3: Create Episode 1 (Admin)
echo -e "\n📍 3. Create Episode 1 (Admin)"
curl -s -X POST "$BASE_URL/episodes/" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "episode_number": 1,
    "title": "Welcome to GDG JKUAT Tech Digest!",
    "content": "## Welcome to our first episode!\n\nThis is the inaugural episode of the GDG JKUAT Tech Digest. We are excited to share tech news, community highlights, and project showcases with you!\n\n### What to Expect:\n- Weekly tech updates\n- Community project highlights\n- Developer stories\n- Event announcements\n\nStay tuned for more amazing content!",
    "image_url": "https://via.placeholder.com/800x400?text=GDG+JKUAT+Episode+1"
  }' | jq .

# Test 4: Create Episode 2 (Admin)
echo -e "\n📍 4. Create Episode 2 (Admin)"
curl -s -X POST "$BASE_URL/episodes/" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "episode_number": 2,
    "title": "Web Development Trends 2024",
    "content": "## Latest Web Development Trends\n\nIn this episode, we explore the cutting-edge technologies shaping web development in 2024:\n\n### Frontend Trends:\n- React Server Components\n- Svelte 4.0\n- Web Assembly integration\n\n### Backend Innovations:\n- Edge computing with Cloudflare Workers\n- Serverless databases\n- GraphQL federation\n\n### Developer Tools:\n- AI-powered code completion\n- Enhanced debugging tools\n- Performance monitoring solutions\n\nJoin us as we dive deep into these exciting developments!",
    "image_url": "https://via.placeholder.com/800x400?text=Web+Dev+Trends+2024"
  }' | jq .

# Test 5: Get all episodes (should show 2 episodes)
echo -e "\n📍 5. Get All Episodes After Creation"
curl -s -X GET "$BASE_URL/episodes/" | jq .

# Test 6: Get specific episode
echo -e "\n📍 6. Get Episode 1 Details (Public)"
curl -s -X GET "$BASE_URL/episodes/1" | jq .

# Test 7: Like Episode 1
echo -e "\n📍 7. Like Episode 1 (Public)"
curl -s -X POST "$BASE_URL/episodes/1/like" | jq .

# Test 8: Like Episode 1 again (increment)
echo -e "\n📍 8. Like Episode 1 Again"
curl -s -X POST "$BASE_URL/episodes/1/like" | jq .

# Test 9: Add comment to Episode 1
echo -e "\n📍 9. Add Comment to Episode 1 (Public)"
curl -s -X POST "$BASE_URL/episodes/1/comments" \
  -H "Content-Type: application/json" \
  -d '{
    "comment_text": "Great first episode! Looking forward to more content from GDG JKUAT. Keep up the excellent work!"
  }' | jq .

# Test 10: Add another comment
echo -e "\n📍 10. Add Another Comment to Episode 1"
curl -s -X POST "$BASE_URL/episodes/1/comments" \
  -H "Content-Type: application/json" \
  -d '{
    "comment_text": "This is exactly what the tech community needed. Thank you for starting this initiative!"
  }' | jq .

# Test 11: Get Episode 1 with comments
echo -e "\n📍 11. Get Episode 1 With Comments"
curl -s -X GET "$BASE_URL/episodes/1" | jq .

# Test 12: Update Episode 2 (Admin)
echo -e "\n📍 12. Update Episode 2 (Admin)"
curl -s -X PUT "$BASE_URL/episodes/2" \
  -H "Authorization: Bearer $API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Web Development Trends 2024 - Updated",
    "content": "## Latest Web Development Trends - UPDATED VERSION\n\nIn this updated episode, we explore even more cutting-edge technologies...\n\n### New Addition - AI Integration:\n- ChatGPT API in web apps\n- AI-powered content generation\n- Machine learning in the browser\n\n[Previous content remains the same...]"
  }' | jq .

# Test 13: Try to access admin endpoint without auth (should fail)
echo -e "\n📍 13. Test Unauthorized Access (Should Fail)"
curl -s -X POST "$BASE_URL/episodes/" \
  -H "Content-Type: application/json" \
  -d '{
    "episode_number": 3,
    "title": "Should Fail",
    "content": "This should not work"
  }' | jq .

# Test 14: Try with wrong API key (should fail)
echo -e "\n📍 14. Test Wrong API Key (Should Fail)"
curl -s -X POST "$BASE_URL/episodes/" \
  -H "Authorization: Bearer wrong-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "episode_number": 3,
    "title": "Should Fail",
    "content": "This should not work"
  }' | jq .

# Test 15: Try to get non-existent episode (should fail)
echo -e "\n📍 15. Get Non-existent Episode (Should Fail)"
curl -s -X GET "$BASE_URL/episodes/999" | jq .

# Test 16: Get final state of all episodes
echo -e "\n📍 16. Final State - All Episodes"
curl -s -X GET "$BASE_URL/episodes/" | jq .

echo -e "\n✅ Testing Complete!"
echo "=============================="
echo "Summary of what was tested:"
echo "- ✅ Root endpoint"
echo "- ✅ Episode creation (admin)"
echo "- ✅ Episode listing (public)"
echo "- ✅ Episode details (public)"
echo "- ✅ Episode liking (public)"
echo "- ✅ Comment creation (public)"
echo "- ✅ Episode updates (admin)"
echo "- ✅ Authentication failures"
echo "- ✅ Error handling"
