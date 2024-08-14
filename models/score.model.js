const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    const Score = sequelize.define('Score', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        userId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Users',
                key: 'id',
            },
        },
        gameId: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'Games',
                key: 'id',
            },
        },
    }, {
        timestamps: true,
        updatedAt: false,
    });

    return Score;
};