const { DataTypes } = require('sequelize');
const db = require('./db');

const Session = db.define('Session', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    length: {
        type: DataTypes.INTEGER, // in minutes
        allowNull: false
    }
}, {
    timestamps: true
});

// Define associations
const Therapist = require('./therapistModel');
const Client = require('./clientModel');

Session.belongsTo(Therapist, { foreignKey: 'therapistId' });
Session.belongsTo(Client, { foreignKey: 'clientId' });

module.exports = Session;