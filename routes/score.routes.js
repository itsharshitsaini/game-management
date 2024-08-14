const express = require('express');
const router = express.Router();
const scoreController = require('../controllers/score.controller');
const authMiddleware = require('../middleware/auth.middleware');
const rbacMiddleware = require('../middleware/rbac.middleware');

router.post('/', authMiddleware.verifyToken, rbacMiddleware.isPlayer, scoreController.addScore);

router.get('/', authMiddleware.verifyToken, scoreController.getScoresByUser);

router.get('/game/:gameId', authMiddleware.verifyToken, scoreController.getScoresByGame);

module.exports = router;
