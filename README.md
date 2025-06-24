# Notes App

A delightful full-stack notes application with a custom REST API built with Node.js, Express, MongoDB, and a React frontend.
## Features

- Create, read, update, and delete notes
- Categorize notes with colors and tags
- Search functionality
- Responsive design with animations
- RESTful API with comprehensive endpoints

##  Tech Stack

- **Backend**: Node.js, Express.js, MongoDB with Mongoose
- **Frontend**: React, Tailwind CSS, Lucide Icons
- **Database**: MongoDB
- **API Testing**: Built-in endpoints for easy testing

## API Endpoints

### 1. GET /api/notes
**Description**: Retrieve all notes with optional filtering
**Query Parameters**:
- `search` (optional): Search notes by title or content
- `category` (optional): Filter by category
- `tag` (optional): Filter by tag

**Sample Response**:
```json
{
  "success": true,
  "data": [
    {
      "_id": "64a1b2c3d4e5f6789012345",
      "title": "My First Note",
      "content": "This is a sample note content",
      "category": "personal",
      "tags": ["important", "work"],
      "color": "#FFE4E1",
      "createdAt": "2024-01-15T10:30:00.000Z",
      "updatedAt": "2024-01-15T10:30:00.000Z"
    }
  ],
  "count": 1
}
```

### 2. POST /api/notes
**Description**: Create a new note
**Request Body**:
```json
{
  "title": "Note Title",
  "content": "Note content here",
  "category": "work",
  "tags": ["meeting", "important"],
  "color": "#E6F3FF"
}
```

**Sample Response**:
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789012346",
    "title": "Note Title",
    "content": "Note content here",
    "category": "work",
    "tags": ["meeting", "important"],
    "color": "#E6F3FF",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:00:00.000Z"
  }
}
```

### 3. PUT /api/notes/:id
**Description**: Update an existing note
**URL Parameter**: `id` - The note ID
**Request Body**: Same as POST (all fields optional)

**Sample Response**:
```json
{
  "success": true,
  "data": {
    "_id": "64a1b2c3d4e5f6789012346",
    "title": "Updated Note Title",
    "content": "Updated content",
    "category": "personal",
    "tags": ["updated"],
    "color": "#F0F8E6",
    "createdAt": "2024-01-15T11:00:00.000Z",
    "updatedAt": "2024-01-15T11:30:00.000Z"
  }
}
```

### 4. DELETE /api/notes/:id
**Description**: Delete a note
**URL Parameter**: `id` - The note ID

**Sample Response**:
```json
{
  "success": true,
  "message": "Note deleted successfully"
}
```

### 5. GET /api/notes/stats
**Description**: Get statistics about notes
**Sample Response**:
```json
{
  "success": true,
  "data": {
    "totalNotes": 15,
    "categoryCounts": {
      "work": 8,
      "personal": 5,
      "ideas": 2
    },
    "tagCounts": {
      "important": 6,
      "meeting": 4,
      "todo": 3
    }
  }
}
```

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Backend Setup

1. **Clone the repository**:
```bash
git clone https://github.com/vwwyq/Notes.git
cd notes-app
```

2. **Install backend dependencies**:
```bash
cd backend
npm install
```

3. **Environment Setup**:
Create a `.env` file in the backend directory.

4. **Start the backend server**:
```bash
npm start
# or for development with auto-reload:
npm run dev
```

The API server will run on `http://localhost:3001`

### Frontend Setup

1. **Install frontend dependencies**:
```bash
cd frontend
npm install
```

2. **Start the frontend development server**:
```bash
npm start
```

The frontend will run on `http://localhost:3000`

## Testing the API

### Using curl:

1. **Get all notes**:
```bash
curl -X GET http://localhost:3001/api/notes
```

2. **Create a new note**:
```bash
curl -X POST http://localhost:3001/api/notes \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Note",
    "content": "This is a test note",
    "category": "test",
    "tags": ["curl", "testing"],
    "color": "#FFE4E1"
  }'
```

3. **Update a note** (replace `NOTE_ID` with actual ID):
```bash
curl -X PUT http://localhost:3001/api/notes/NOTE_ID \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Updated Test Note",
    "content": "This note has been updated"
  }'
```

4. **Delete a note** (replace `NOTE_ID` with actual ID):
```bash
curl -X DELETE http://localhost:3001/api/notes/NOTE_ID
```

### Using the Frontend:
1. Open `http://localhost:3000` in your browser
2. Use the intuitive interface to create, edit, and delete notes
3. Try the search functionality and category filtering

##  Database Schema

The MongoDB collection uses the following schema:

```javascript
{
  title: String (required),
  content: String (required),
  category: String (default: 'general'),
  tags: [String],
  color: String (default: '#FFFFFF'),
  createdAt: Date,
  updatedAt: Date
}
```
##  Project Structure
```
notes-app/
├── backend/
│   ├── config/
│   │   └── database.js
│   ├── middleware/
│   │   └── errorHandler.js
│   ├── models/
│   │   └── Note.js
│   ├── routes/
│   │   └── notes.js
│   ├── tests/
│   │   ├── api/
│   │   │   └── notesApi.test.js
│   │   ├── integration/
│   │   │   └── dbOperations.test.js
│   │   └── unit/
│   │       └── noteModel.test.js
│   ├── coverage/
│   │   └── lcov-report/
│   │       └── index.html
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
└── README.md
```
---

## API Testing & Code Coverage

**Unit**, **integration**, and **API tests** for the  Notes App backend using **Jest**, **Supertest**, and **mongodb-memory-server**.

###  Tech Stack

- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Testing Frameworks**: Jest, Supertest, mongodb-memory-server

---

### Test Structure
```
backend/
├── tests/
│ ├── unit/
│ │ └── noteModel.test.js # Unit tests for model logic
│ ├── integration/
│ │ └── dbOperations.test.js # Tests for DB interaction
│ └── api/
│ └── notesApi.test.js # Tests for API endpoints
```
---

### Test Types

| Test Type      | Description                                                                 |
|----------------|-----------------------------------------------------------------------------|
| Unit Tests     | Validations and logic of the Note model (e.g. required fields, defaults)  |
| Integration    | Database operations tested using in-memory MongoDB                          |
| API Tests      | CRUD + stats endpoints tested via HTTP calls (/api/notes)                 |

---

### How to Run the Tests

1. Install dependencies (inside `/backend`):

```bash
npm install
```
Run all tests with coverage report:
```bash
npm test
```
coverage/lcov-report/index.html


## Test Coverage Report
```bash
> notes-app-backend@1.0.0 test
> jest --coverage

 PASS  tests/unit/noteModel.test.js
 PASS  tests/integration/dbOperations.test.js
 PASS  tests/api/notesApi.test.js

Test Suites: 3 passed, 3 total  
Tests:       10 passed, 10 total  
Snapshots:   0 total  
Time:        1.942s  
Ran all test suites.

-----------------------|---------|----------|---------|---------|-------------------
File                   | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
-----------------------|---------|----------|---------|---------|-------------------
All files              | 85.71   | 75       | 83.33   | 85.71   |                   
 models/Note.js        | 100     | 100      | 100     | 100     |                   
 routes/notes.js       | 82.5    | 72.73    | 85.71   | 82.5    | 23-25, 57         
 server.js             | 66.67   | 50       | 66.67   | 66.67   | 21-22             
-----------------------|---------|----------|---------|---------|-------------------

Done in 1.94s.
```
--

##  Features Highlight

- **CRUD Operations**: Full Create, Read, Update, Delete functionality
- **Search & Filter**: Search by title/content, filter by category/tags
- **Responsive Design**: Works on desktop and mobile
- **Color Coding**: Organize notes with beautiful colors
- **Tags System**: Flexible tagging for better organization

### Backend Deployment (Heroku example):
1. Add `"start": "node server.js"` to package.json scripts
2. Set environment variables in Heroku dashboard
3. Deploy using Git or Heroku CLI

### Frontend Deployment (Netlify/Vercel):
1. Build the project: `npm run build`
2. Deploy the `build` folder to your hosting service
