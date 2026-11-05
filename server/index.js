const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const express = require('express');
const cors = require('cors');
const { sequelize, ensureDatabaseExists } = require('./models');
const therapistRoutes = require('./routes/therapists');
const clientRoutes = require('./routes/clients');
const sessionRoutes = require('./routes/sessions');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ status: 'ok' }));
app.use('/api/therapists', therapistRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/sessions', sessionRoutes);

async function start() {
    try {
        await ensureDatabaseExists();
        await sequelize.authenticate();
        await sequelize.sync();
        const PORT = process.env.PORT || 5000;
        app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));
    } catch (error) {
        console.error('Could not start the server. Is MySQL running and are the details in server/.env correct?');
        console.error(error.message);
        process.exit(1);
    }
}

start();

module.exports = app;
