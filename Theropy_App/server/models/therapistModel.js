const { DataTypes } = require('sequelize');
const db = require('./db');

const Therapist = db.define('Therapist', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
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
    location: {
        type: DataTypes.STRING,
        allowNull: false
    },
    yearsOfPractice: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    availability: {
        type: DataTypes.ENUM('TAKING CLIENTS', 'NOT TAKING CLIENTS'),
        allowNull: false
    }
}, {
    timestamps: true
});

module.exports = Therapist;