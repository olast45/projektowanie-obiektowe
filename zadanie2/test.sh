#!/bin/bash

BASE_URL="${BASE_URL:-http://localhost:8000}/product"

echo "=== Testing Product Endpoints ==="

echo ""
echo "--- POST /product/create (Create Product) ---"
CREATE_RESPONSE=$(curl -s -X POST "$BASE_URL/create" \
  -H "Content-Type: application/json" \
  -d '{"name": "Laptop", "price": 2999.99, "description": "Powerful work laptop"}')
echo "$CREATE_RESPONSE"

PRODUCT_ID=$(echo "$CREATE_RESPONSE" | grep -o '"id":[0-9]*' | cut -d: -f2)
echo "Created product ID: $PRODUCT_ID"

echo ""
echo "--- GET /product/ (List All Products) ---"
curl -s -X GET "$BASE_URL/"

echo ""
echo "--- GET /product/{id} (Get Single Product) ---"
curl -s -X GET "$BASE_URL/$PRODUCT_ID"

echo ""
echo "--- PUT /product/{id} (Update Product) ---"
curl -s -X PUT "$BASE_URL/$PRODUCT_ID" \
  -H "Content-Type: application/json" \
  -d '{"name": "Laptop Pro", "price": 3499.99, "description": "Updated description"}'

echo ""
echo "--- GET /product/{id} (After Update) ---"
curl -s -X GET "$BASE_URL/$PRODUCT_ID"

echo ""
echo "--- DELETE /product/{id} (Delete Product) ---"
curl -s -X DELETE "$BASE_URL/$PRODUCT_ID"

echo ""
echo "--- GET /product/{id} (After Deletion, should fail) ---"
curl -s -X GET "$BASE_URL/$PRODUCT_ID"

echo ""
echo "--- GET /product/ (List All Products After Deletion) ---"
curl -s -X GET "$BASE_URL/"

echo ""
echo "=== Product Endpoint Tests Completed ==="
