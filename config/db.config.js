const { Sequelize } = require('sequelize');
require('dotenv').config();
let db_url  = "postgresql://postgres.axylkdzkddvszxaizyyg:8$RNnKQU.3cQh5f@aws-0-ap-south-1.pooler.supabase.com:6543/postgres";
const sequelize = new Sequelize(db_url, {
    dialect: 'postgres',
    logging: false,
});

// console.log({sequelize : sequelize})

module.exports = sequelize;