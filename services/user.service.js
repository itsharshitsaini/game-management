const sequelize = require('../config/db.config');
const User = require('../models/user.model')(sequelize);
const bcrypt = require('bcryptjs');

const findUserByEmail = async (email) => {
    try {
        return await User.findOne({ where: { email } });
    } catch (error) {
        console.error('Error finding user by email:', error);
        throw new Error('Error finding user by email.');
    }
};

const createUser = async ({ username, email, password, role }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return await User.create({ username, email, password: hashedPassword, role });
    } catch (error) {
        console.error('Error creating user:', error);
        throw new Error('Error creating user.');
    }
};

const findUserById = async (id) => {
    try {
        return await User.findByPk(id);
    } catch (error) {
        console.error('Error finding user by ID:', error);
        throw new Error('Error finding user by ID.');
    }
};

module.exports = {
    findUserByEmail,
    createUser,
    findUserById,
};
