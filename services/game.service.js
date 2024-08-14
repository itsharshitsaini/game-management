const sequelize = require('../config/db.config');
const Game = require('../models/game.model')(sequelize);

const createGame = async (gameData) => {
    try {
        return await Game.create(gameData);
    } catch (error) {
        console.error('Error creating game:', error);
        throw new Error('Error creating game.');
    }
};

const getAllGames = async () => {
    try {
        return await Game.findAll();
    } catch (error) {
        console.error('Error fetching games:', error);
        throw new Error('Error fetching games.');
    }
};

const getGameById = async (id) => {
    try {
        return await Game.findByPk(id);
    } catch (error) {
        console.error('Error fetching game:', error);
        throw new Error('Error fetching game.');
    }
};

const updateGame = async (id, gameData) => {
    try {
        const [updated] = await Game.update(gameData, { where: { id } });
        if (!updated) {
            throw new Error('Game not found.');
        }
        return await Game.findByPk(id);
    } catch (error) {
        console.error('Error updating game:', error);
        throw new Error('Error updating game.');
    }
};

const deleteGame = async (id) => {
    try {
        const deleted = await Game.destroy({ where: { id } });
        if (!deleted) {
            throw new Error('Game not found.');
        }
        return deleted;
    } catch (error) {
        console.error('Error deleting game:', error);
        throw new Error('Error deleting game.');
    }
};

module.exports = {
    createGame,
    getAllGames,
    getGameById,
    updateGame,
    deleteGame,
};
