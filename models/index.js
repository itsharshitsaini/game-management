const sequelize = require('../config/db.config');
const User = require('./user.model')(sequelize);
const Game = require('./game.model')(sequelize);
const Score = require('./score.model')(sequelize);

User.hasMany(Score); 
Score.belongsTo(User);

Game.hasMany(Score);
Score.belongsTo(Game);

module.exports = { User, Game, Score, sequelize };
