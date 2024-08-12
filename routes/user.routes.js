const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const authMiddleware = require('../middleware/auth.middleware');
const rbacMiddleware = require('../middleware/rbac.middleware');

// User Registration
router.post('/register', userController.register);

// User Login
router.post('/login', userController.login);

// Get User Profile
router.get('/profile', authMiddleware.verifyToken, userController.getProfile);

module.exports = router;
