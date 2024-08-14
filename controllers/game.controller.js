const gameService = require('../services/game.service');

exports.createGame = async (req, res, next) => {
    try {
        const game = await gameService.createGame(req.body);
        res.status(201).send(game);
    } catch (err) {
        next(err);
    }
};


exports.getAllGames = async (req, res, next) => {
    try {
        const games = await gameService.getAllGames();
        res.send(games);
    } catch (err) {
        next(err);
    }
};

exports.getGameById = async (req, res, next) => {
    try {
        const game = await gameService.getGameById(req.params.id);
        if (!game) return res.status(404).send({ message: 'Game not found.' });
        res.send(game);
    } catch (err) {
        next(err);
    }
};


exports.updateGame = async (req, res, next) => {
    try {
        const game = await gameService.updateGame(req.params.id, req.body);
        res.send(game);
    } catch (err) {
        next(err);
    }
};


exports.deleteGame = async (req, res, next) => {
    try {
        const game = await gameService.getGameById(req.params.id);

        if (!game) {
            const error = new Error('Game not found.');
            error.statusCode = 404;
            throw error;
        }

        await gameService.deleteGame(req.params.id);
        res.status(200).send({ message: 'Game successfully deleted.' });
    } catch (err) {
        next(err);
    }
};

