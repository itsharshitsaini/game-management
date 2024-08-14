const scoreService = require('../services/score.service');
const gameService = require('../services/game.service');


exports.addScore = async (req, res, next) => {
    try {
        const { gameId, score } = req.body;
        const userId = req.user.id;

        const game = await gameService.getGameById(gameId);
        if (!game) {
            const error = new Error('Game not found');
            error.statusCode = 404;
            throw error;
        }
        const newScore = await scoreService.addScore({
            userId,
            gameId,
            score
        });
        res.status(201).send(newScore);
    } catch (err) {
        next(err);
    }
};

exports.getScoresByUser = async (req, res, next) => {
    try {
        console.log(req.user); 
        const scores = await scoreService.getScoresByUser(req.user.id);
        res.send(scores);
    } catch (err) {
        next(err);
    }
};

exports.getScoresByGame = async (req, res, next) => {
    try {
        const scores = await scoreService.getScoresByGame(req.params.gameId);
        res.send(scores);
    } catch (err) {
        next(err);
    }
};
