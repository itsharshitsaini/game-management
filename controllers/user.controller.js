const userService = require('../services/user.service');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


exports.register = async (req, res, next) => {
    try {
        const { username, email, password, role } = req.body;
        console.log(req.body);
        const user = await userService.createUser({ username, email, password, role });
        res.status(201).send(user);
    } catch (err) {
        next(err);
    }
};

exports.login = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await userService.findUserByEmail(email);

        if (!user || !await bcrypt.compare(password, user.password)) {
            const error = new Error('Invalid email or password.');
            error.statusCode = 400;
            throw error;
        }

        const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.send({ token });
    } catch (error) {
        next(error);
    }
};

exports.getProfile = async (req, res, next) => {
    try {
        const user = await userService.findUserById(req.user.id);

        if (!user) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }

        res.send(user);
    } catch (err) {
        next(err);
    }
};
