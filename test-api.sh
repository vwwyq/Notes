#!/bin/bash

# Cute Notes API Test Script
# This script tests all the API endpoints

API_BASE="http://localhost:3001/api"
echo " Testing  Notes API endpoints..."
echo "API Base URL: $API_BASE"
echo ""

# Test 1: Health Check
echo "1 Testing Health Check..."
curl -s "$API_BASE/health" | jq .
echo -e "\n"

# Test 2: Get all notes (should be empty initially)
echo "2 Getting all notes (should be empty initially)..."
curl -s "$API_BASE/notes" | jq .
echo -e "\n"

# Test 3: Create a new note
echo "3 Creating a new note..."
NOTE_ID=$(curl -s -X POST "$API_BASE/notes" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "My First Test Note",
    "content": "This is a test note created via API testing script!",
    "category": "test",
    "tags": ["api", "testing", "curl"],
    "color": "#FFE4E1"
  }' | jq -r '.data._id')

echo "Created note with ID: $NOTE_ID"
echo -e "\n"

# Test 4: Get all notes (should show our new note)
echo "4 Getting all notes (should show our new note)..."
curl -s "$API_BASE/notes" | jq .
echo -e "\n"

# Test 5: Get single note by ID
echo "5 Getting single note by ID..."
curl -s "$API_BASE/notes/$NOTE_ID" | jq .
echo -e "\n"

# Test 6: Update the note
echo "6 Updating the note..."
curl -s -X PUT "$API_BASE/notes/$NOTE_ID" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Test Note",
    "content": "This note has been updated via API!",
    "tags": ["api", "testing", "updated"]
  }' | jq .
echo -e "\n"

# Test 7: Create another note for better testing
echo "7 Creating another note..."
curl -s -X POST "$API_BASE/notes" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Work Meeting Notes",
    "content": "Discussed project roadmap and deadlines",
    "category": "work",
    "tags": ["meeting", "important"],
    "color": "#E6F3FF"
  }' | jq .
echo -e "\n"

# Test 8: Search functionality
echo "8 Testing search functionality..."
echo "Searching for 'test':"
curl -s "$API_BASE/notes?search=test" | jq .
echo -e "\n"

# Test 9: Filter by category
echo "9 Testing category filter..."
echo "Filtering by 'work' category:"
curl -s "$API_BASE/notes?category=work" | jq .
echo -e "\n"

# Test 10: Get statistics
echo "10 Getting statistics..."
curl -s "$API_BASE/notes/stats" | jq .
echo -e "\n"

# Test 11: Delete the note
echo "11 Deleting the first note..."
curl -s -X DELETE "$API_BASE/notes/$NOTE_ID" | jq .
echo -e "\n"

# Test 12: Verify deletion
echo "12 Verifying deletion (should return 404)..."
curl -s "$API_BASE/notes/$NOTE_ID" | jq .
echo -e "\n"

echo " API testing completed!"
echo ""
echo " Tips:"
echo "- Make sure your MongoDB is running"
echo "- Make sure your server is running on port 3001"