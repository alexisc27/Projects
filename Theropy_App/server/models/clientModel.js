const { DataTypes } = require('sequelize');
const db = require('./db');

const Client = db.define('Client', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    phoneNumber: {
        type: DataTypes.STRING,
        allowNull: false
    },
    regularity: {
        type: DataTypes.ENUM('WEEKLY', 'MONTHLY'),
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Client;