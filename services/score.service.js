const sequelize = require('../config/db.config');
const Score = require('../models/score.model')(sequelize);

const addScore = async ({ userId, gameId, score }) => {
    try {
        return await Score.create({ userId, gameId, score });
    } catch (error) {
        console.error('Error adding score:', error);
        throw new Error('Error adding score.');
    }
};

const getScoresByUser = async (userId) => {
    try {
        return await Score.findAll({ where: { userId } });
    } catch (error) {
        console.error('Error fetching scores by user:', error);
        throw new Error('Error fetching scores by user.');
    }
};

const getScoresByGame = async (gameId) => {
    try {
        return await Score.findAll({ where: { gameId } });
    } catch (error) {
        console.error('Error fetching scores by game:', error);
        throw new Error('Error fetching scores by game.');
    }
};

module.exports = {
    addScore,
    getScoresByUser,
    getScoresByGame,
};
