const sequelize = require('./database');
const Therapist = require('./therapistModel');
const Client = require('./clientModel');
const Session = require('./sessionModel');

// Sync all models with the database
const syncDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection to database has been established successfully.');

        // Sync all models
        await sequelize.sync({ alter: true });
        console.log('All models were synchronized successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
};

module.exports = {
    sequelize,
    syncDB,
    Therapist,
    Client,
    Session
};