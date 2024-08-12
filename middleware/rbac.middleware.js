const isAdmin = (req, res, next) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

const isPlayer = (req, res, next) => {
    if (req.user.role !== 'Player') {
        return res.status(403).json({ message: 'Access denied' });
    }
    next();
};

module.exports = { isAdmin, isPlayer };
