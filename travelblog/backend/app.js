const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Database connection
require('./db');

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/travel-logs', require('./routes/travelLogRoutes'));
app.use('/api/journey-plans', require('./routes/journeyPlanRoutes'));

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!' });
});

// Test route
app.get('/', (req, res) => {
    res.send('Travel Blog API is running...');
});

module.exports = app;