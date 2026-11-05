const { sequelize, ensureDatabaseExists } = require('../config/database');
const Therapist = require('./therapistModel');
const Client = require('./clientModel');
const Session = require('./sessionModel');

// Associations live in one place to avoid circular requires between model files.
// Deleting a therapist or client also deletes their sessions.
Therapist.hasMany(Session, { foreignKey: { name: 'therapistId', allowNull: false }, onDelete: 'CASCADE' });
Session.belongsTo(Therapist, { foreignKey: { name: 'therapistId', allowNull: false } });

Client.hasMany(Session, { foreignKey: { name: 'clientId', allowNull: false }, onDelete: 'CASCADE' });
Session.belongsTo(Client, { foreignKey: { name: 'clientId', allowNull: false } });

module.exports = { sequelize, ensureDatabaseExists, Therapist, Client, Session };
