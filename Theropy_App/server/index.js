const express = require('express');
const cors = require('cors');
const therapistRoutes = require('./routes/therapists');
const clientRoutes = require('./routes/clients');
const sessionRoutes = require('./routes/sessions');
const db = require('./models/db');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/therapists', therapistRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/sessions', sessionRoutes);

// Database connection and server start
db.sync().then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Database connection error:', err);
});

module.exports = app;