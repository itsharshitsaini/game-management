const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');
const authMiddleware = require('../middleware/auth.middleware');
const rbacMiddleware = require('../middleware/rbac.middleware');

// Create Game (Admin only)
router.post('/', authMiddleware.verifyToken, rbacMiddleware.isAdmin, gameController.createGame);

router.get('/', gameController.getAllGames);

router.get('/:id', gameController.getGameById);

router.put('/:id', authMiddleware.verifyToken, rbacMiddleware.isAdmin, gameController.updateGame);

router.delete('/:id', authMiddleware.verifyToken, rbacMiddleware.isAdmin, gameController.deleteGame);

module.exports = router;
