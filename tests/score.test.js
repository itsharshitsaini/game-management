const request = require('supertest');
const app = require('../app'); // Your Express app
const scoreService = require('../services/score.service');
const gameService = require('../services/game.service');
const { sequelize } = require('../models');
const { addScore, getScoresByUser, getScoresByGame } = require('../controllers/score.controller');

jest.mock('../services/score.service');
jest.mock('../services/game.service');

describe('Score Controller and API', () => {
    
    // Unit Tests for Controller Functions
    describe('Controller Functions', () => {
        describe('addScore', () => {
            it('should add a score successfully if the game exists', async () => {
                const req = {
                    body: { gameId: 1, score: 100 },
                    user: { id: 1 }
                };
                const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
                const next = jest.fn();

                gameService.getGameById.mockResolvedValue({ id: 1, name: 'Test Game' });
                scoreService.addScore.mockResolvedValue({ id: 1, userId: 1, gameId: 1, score: 100 });

                await addScore(req, res, next);

                expect(gameService.getGameById).toHaveBeenCalledWith(1);
                expect(scoreService.addScore).toHaveBeenCalledWith({ userId: 1, gameId: 1, score: 100 });
                expect(res.status).toHaveBeenCalledWith(201);
                expect(res.send).toHaveBeenCalledWith({ id: 1, userId: 1, gameId: 1, score: 100 });
            });

            it('should return 404 if the game does not exist', async () => {
                const req = {
                    body: { gameId: 1, score: 100 },
                    user: { id: 1 }
                };
                const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
                const next = jest.fn();

                gameService.getGameById.mockResolvedValue(null);

                await addScore(req, res, next);

                expect(next).toHaveBeenCalledWith(expect.objectContaining({ statusCode: 404 }));
            });
        });

        describe('getScoresByUser', () => {
            it('should get scores by user successfully', async () => {
                const req = { user: { id: 1 } };
                const res = { send: jest.fn() };
                const next = jest.fn();

                scoreService.getScoresByUser.mockResolvedValue([{ id: 1, score: 100, gameId: 1 }]);

                await getScoresByUser(req, res, next);

                expect(scoreService.getScoresByUser).toHaveBeenCalledWith(1);
                expect(res.send).toHaveBeenCalledWith([{ id: 1, score: 100, gameId: 1 }]);
            });
        });

        describe('getScoresByGame', () => {
            it('should get scores by game successfully', async () => {
                const req = { params: { gameId: 1 } };
                const res = { send: jest.fn() };
                const next = jest.fn();

                scoreService.getScoresByGame.mockResolvedValue([{ id: 1, score: 100, userId: 1 }]);

                await getScoresByGame(req, res, next);

                expect(scoreService.getScoresByGame).toHaveBeenCalledWith(1);
                expect(res.send).toHaveBeenCalledWith([{ id: 1, score: 100, userId: 1 }]);
            });
        });
    });
});
