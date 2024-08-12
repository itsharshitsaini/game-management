const express = require('express');
const router = express.Router();
const gameController = require('../controllers/game.controller');
const authMiddleware = require('../middleware/auth.middleware');
const rbacMiddleware = require('../middleware/rbac.middleware');

// Create Game (Admin only)
router.post('/', authMiddleware.verifyToken, rbacMiddleware.isAdmin, gameController.createGame);

// Get All Games
router.get('/', gameController.getAllGames);

// Get Game by ID
router.get('/:id', gameController.getGameById);

// Update Game (Admin only)
router.put('/:id', authMiddleware.verifyToken, rbacMiddleware.isAdmin, gameController.updateGame);

// Delete Game (Admin only)
router.delete('/:id', authMiddleware.verifyToken, rbacMiddleware.isAdmin, gameController.deleteGame);

module.exports = router;
