const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/score.controller');
const authMiddleware = require('../middleware/auth.middleware');
const rbacMiddleware = require('../middleware/rbac.middleware');

// Add Score (Player only)
router.post('/', authMiddleware.verifyToken, rbacMiddleware.isPlayer, scoreController.addScore);

// Get Scores by User
router.get('/user/:userId', authMiddleware.verifyToken, scoreController.getScoresByUser);

// Get Scores by Game
router.get('/game/:gameId', authMiddleware.verifyToken, scoreController.getScoresByGame);

module.exports = router;
