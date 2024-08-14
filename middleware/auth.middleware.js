const jwt = require('jsonwebtoken');
const userService = require('../services/user.service');

module.exports.verifyToken = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1]; // Bearer <token>

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user info to the request
        const user = await userService.findUserById(req.user.id);
        if (!user) return res.status(401).json({ message: 'Invalid token' });

        next();
    } catch (error) {
        console.log(error);
        return res.status(401).json({ message: 'Invalid token' });
    }
};

