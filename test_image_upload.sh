#!/bin/bash

# Test image upload endpoint
# First create a simple test image file

echo "🖼️ Testing Image Upload Endpoint"
echo "================================"

API_KEY="gdg-jkuat-2024-admin-secure-key-xyz789ABC"
BASE_URL="http://localhost:8000"

# Create a simple test image (1x1 pixel PNG)
echo "Creating test image..."
echo -n -e '\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x01\x00\x00\x00\x01\x08\x02\x00\x00\x00\x90wS\xde\x00\x00\x00\tpHYs\x00\x00\x0b\x13\x00\x00\x0b\x13\x01\x00\x9a\x9c\x18\x00\x00\x00\nIDATx\x9cc\xf8\x00\x00\x00\x01\x00\x01\x00\x00\x00\x00IEND\xaeB`\x82' > test_image.png

echo "Testing image upload..."
curl -X POST "$BASE_URL/episodes/upload-image" \
  -H "Authorization: Bearer $API_KEY" \
  -F "image=@test_image.png" \
  -v

echo -e "\n\nCleaning up..."
rm -f test_image.png

echo "Test complete!"
