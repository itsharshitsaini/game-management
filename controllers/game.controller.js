const Game = require('../models/game.model');

// Create Game
exports.createGame = async (req, res) => {
    try {
        const game = await Game.create(req.body);
        res.status(201).send(game);
    } catch (err) {
        res.status(500).send({ message: 'Error creating game.' });
    }
};

// Get All Games
exports.getAllGames = async (req, res) => {
    try {
        const games = await Game.findAll();
        res.send(games);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching games.' });
    }
};

// Get Game by ID
exports.getGameById = async (req, res) => {
    try {
        const game = await Game.findByPk(req.params.id);
        if (!game) return res.status(404).send({ message: 'Game not found.' });
        res.send(game);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching game.' });
    }
};

// Update Game
exports.updateGame = async (req, res) => {
    try {
        const [updated] = await Game.update(req.body, { where: { id: req.params.id } });
        if (!updated) return res.status(404).send({ message: 'Game not found.' });
        const game = await Game.findByPk(req.params.id);
        res.send(game);
    } catch (err) {
        res.status(500).send({ message: 'Error updating game.' });
    }
};

// Delete Game
exports.deleteGame = async (req, res) => {
    try {
        const deleted = await Game.destroy({ where: { id: req.params.id } });
        if (!deleted) return res.status(404).send({ message: 'Game not found.' });
        res.status(204).send();
    } catch (err) {
        res.status(500).send({ message: 'Error deleting game.' });
    }
};
