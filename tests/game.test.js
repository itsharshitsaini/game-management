const request = require('supertest');
const app = require('../app');
const User = require('../models/user.model');
const Game = require('../models/game.model');
const Score = require('../models/score.model');

// Mock the models
jest.mock('../models/user.model', () => {
    const mockUserModel = {
        belongsTo: jest.fn(),
        hasMany: jest.fn(),
        create: jest.fn(),
        findOne: jest.fn(),
        findByPk: jest.fn(),
    };
    return mockUserModel;
});

jest.mock('../models/game.model', () => {
    const mockGameModel = {
        belongsTo: jest.fn(),
        hasMany: jest.fn(),
        create: jest.fn(),
        findByPk: jest.fn(),
    };
    return mockGameModel;
});

jest.mock('../models/score.model', () => {
    const mockScoreModel = {
        belongsTo: jest.fn(), 
    };
    return mockScoreModel;
});

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Mywicm9sZSI6IkFkbWluIiwiaWF0IjoxNzIzNTM1NjYxLCJleHAiOjE3MjM1MzkyNjF9.kJXfvHJ0uc6fi7eGNlbXG5dkjEIorfbR8YmW39QZ8Do'; 

describe('Game Model and API', () => {

    // Unit Tests for Game Model
    describe('Game Model', () => {

        test('should create a new game', async () => {
            const mockGame = { id: 1, name: 'Test Game', genre: 'Action' };
            Game.create.mockResolvedValue(mockGame);

            const game = await Game.create({ name: 'Test Game', genre: 'Action' });

            expect(game).toEqual(mockGame);
            expect(Game.create).toHaveBeenCalledWith({ name: 'Test Game', genre: 'Action' });
        });

        test('should find a game by ID', async () => {
            const mockGame = { id: 1, name: 'Test Game', genre: 'Action' };
            Game.findByPk.mockResolvedValue(mockGame);

            const game = await Game.findByPk(1);

            expect(game).toEqual(mockGame);
            expect(Game.findByPk).toHaveBeenCalledWith(1);
        });

    });

    // Integration Tests for Game API
    describe('Game API', () => {

        test('should create a new game', async () => {
            const mockGame = { id: 1, name: 'Test Game', genre: 'Action' };
            Game.create.mockResolvedValue(mockGame);

            const res = await request(app)
                .post('/api/games')
                .set('Authorization', `Bearer ${token}`)
                .send({ name: 'Test Game', genre: 'Action' });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toEqual(mockGame);
            expect(Game.create).toHaveBeenCalledWith({ name: 'Test Game', genre: 'Action' });
        });

        test('should get a game by ID', async () => {
            const mockGame = { id: 1, name: 'Test Game', genre: 'Action' };
            Game.findByPk.mockResolvedValue(mockGame);

            const res = await request(app)
                .get('/api/games/1');

            expect(res.statusCode).toEqual(200);
            expect(res.body).toEqual(mockGame);
            expect(Game.findByPk).toHaveBeenCalledWith(1);
        });

    });

});
