const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleWare/errorHandler');
const notesRouter = require('./routes/notes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/notes', notesRouter);

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Cute Notes API is running! 🌟',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'API endpoint not found' });
});

// Global error handler
app.use(errorHandler);

// Start server
const startServer = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Notes API running at http://localhost:${PORT}`);
  });
};

startServer();

module.exports = app;
