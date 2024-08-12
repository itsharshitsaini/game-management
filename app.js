const express = require('express');
const sequelize = require('./config/db.config');
const User = require('./models/user.model');
const Game = require('./models/game.model');
const Score = require('./models/score.model');

// Initialize Express
const app = express();
app.use(express.json());

// Define routes
const userRoutes = require('./routes/user.routes');
const gameRoutes = require('./routes/game.routes');
const scoreRoutes = require('./routes/score.routes');

app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/scores', scoreRoutes);

// Sync models with database
(async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Synchronize models with the database
        await sequelize.sync({ alter: true }); // `alter` updates existing tables without dropping them
        console.log('Models synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})();

app.get("/",(req,res)=>{
    res.send("hi");
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
