#  Complete Setup Guide for this App

This guide will walk you through setting up the Notes application from scratch.

##  Prerequisites

Before you begin, ensure the following is installed:

- **Node.js** (v14 or higher) 
- **MongoDB** - Choose one option:
  - Local installation 
  - MongoDB Atlas (cloud) 
- **Code Editor** (VS Code recommended) 


##  Step-by-Step Setup

### Step 1: Create Project Directory

```bash
mkdir notes-app
cd notes-app
```

### Step 2: Set Up Backend

```bash
# Create backend directory
mkdir backend
cd backend

# Initialize npm project
npm init -y

# Install dependencies
npm install express mongoose cors dotenv helmet express-rate-limit

# Install development dependencies
npm install --save-dev nodemon jest supertest

# Create server.js file (copy the provided server.js code)
touch server.js

# Create environment file
cp .env.template .env
# Edit .env with your MongoDB connection string
```

**Important**: Update your `.env` file with the correct MongoDB URI:

```env
PORT=3001
MONGODB_URI=mongodb://localhost:27017/cute-notes-app
```

### Step 3: Set Up Frontend

```bash
# Go back to project root
cd ..

# Create React app
npx create-react-app frontend
cd frontend

# Install additional dependencies
npm install lucide-react

# Install Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

**Configure Tailwind CSS** by updating `tailwind.config.js`:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**Update `src/index.css`** to include Tailwind:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```


### Step 4: Database Setup

#### Option A: Local MongoDB

1. **Install MongoDB Community Edition**
2. **Start MongoDB service:**
   ```bash
   # On macOS with Homebrew:
   brew services start mongodb/brew/mongodb-community
   
   # On Ubuntu:
   sudo systemctl start mongod
   
   # On Windows:
   # Start MongoDB service from Services panel
   ```

3. **Verify MongoDB is running:**
   ```bash
   mongosh
   # You should see MongoDB shell prompt
   ```

#### Option B: MongoDB Atlas (Cloud)

1. **Create account** at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. **Create a new cluster** (free tier available)
3. **Create database user** with read/write permissions
4. **Whitelist your IP address** (or use 0.0.0.0/0 for development)
5. **Get connection string** from "Connect" button
6. **Update `.env` file** with your Atlas connection string:
   ```env
   MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cute-notes-app?retryWrites=true&w=majority
   ```

### Step 5: Running the Application

#### Start Backend Server

```bash
cd backend
npm start
# or for development with auto-reload:
npm run dev
```

You should see:
```
 Connected to MongoDB
 Notes API server running on http://localhost:3001
```

#### Start Frontend Development Server

```bash
# In a new terminal window
cd frontend
npm start
```

The React app will open at `http://localhost:3000`

### Step 6: Test the API

Make the test script executable and run it:

```bash
chmod +x test-api.sh
./test-api.sh
```

Or test manually with curl:

```bash
# Health check
curl http://localhost:3001/api/health

# Create a note
curl -X POST http://localhost:3001/api/notes \
  -H "Content-Type: application/json" \
  -d '{"title":"Test Note","content":"Hello World","category":"test"}'

# Get all notes
curl http://localhost:3001/api/notes
```
