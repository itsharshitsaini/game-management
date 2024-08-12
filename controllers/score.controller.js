const Score = require('../models/score.model');
const User = require('../models/user.model');
const Game = require('../models/game.model');

// Add Score
exports.addScore = async (req, res) => {
    try {
        const score = await Score.create({
            userId: req.user.id,
            gameId: req.body.gameId,
            score: req.body.score
        });
        res.status(201).send(score);
    } catch (err) {
        res.status(500).send({ message: 'Error adding score.' });
    }
};

// Get Scores by User
exports.getScoresByUser = async (req, res) => {
    try {
        const scores = await Score.findAll({ where: { userId: req.params.userId } });
        res.send(scores);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching scores.' });
    }
};

// Get Scores by Game
exports.getScoresByGame = async (req, res) => {
    try {
        const scores = await Score.findAll({ where: { gameId: req.params.gameId } });
        res.send(scores);
    } catch (err) {
        res.status(500).send({ message: 'Error fetching scores.' });
    }
}