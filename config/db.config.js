const { Sequelize } = require('sequelize');
require('dotenv').config();

const dbUrl = process.env.DB_URL;
const sequelize = new Sequelize(dbUrl, {
    dialect: 'postgres',
    logging: false,
});

module.exports = sequelize;