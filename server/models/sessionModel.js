const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Session = sequelize.define('Session', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    notes: { type: DataTypes.TEXT, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    length: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1 } } // minutes
}, {
    timestamps: true
});

module.exports = Session;
