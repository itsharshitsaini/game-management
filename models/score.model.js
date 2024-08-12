const { DataTypes } = require('sequelize');
const sequelize = require('../config/db.config');
const User = require('./user.model');
const Game = require('./game.model');

const Score = sequelize.define('Score', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    score: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: true,
    createdAt: 'createdAt'
});

Score.belongsTo(User, { foreignKey: 'userId' });
Score.belongsTo(Game, { foreignKey: 'gameId' });

module.exports = Score;
