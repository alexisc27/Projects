const { Sequelize } = require('sequelize');
const mysql = require('mysql2/promise');

const config = {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'therapy_management'
};

const sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',
    logging: false
});

// Creates the database the first time the app runs, so there's no manual setup.
async function ensureDatabaseExists() {
    const connection = await mysql.createConnection({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password
    });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${config.database}\``);
    await connection.end();
}

module.exports = { sequelize, ensureDatabaseExists };
