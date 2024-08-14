const express = require('express');
const { sequelize } = require('./models');

const loggingMiddleware = require('./middleware/logging.middleware');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();
app.use(express.json());
app.use(loggingMiddleware);


const userRoutes = require('./routes/user.routes');
const gameRoutes = require('./routes/game.routes');
const scoreRoutes = require('./routes/score.routes');

app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);
app.use('/api/scores', scoreRoutes);

app.use(errorMiddleware);

if (process.env.NODE_ENV !== 'test') {
sequelize.sync()
  .then(() => {
    console.log('Database synced');
  })
  .catch((err) => {
    console.error('Error syncing database:', err);
  });
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

module.exports = app;
