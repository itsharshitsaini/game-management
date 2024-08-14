const request = require('supertest');
const app = require('../app'); // Your Express app
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Mock dependencies
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

jest.mock('../models/user.model', () => {
    const mockUserModel = {
        belongsTo: jest.fn(),
        hasMany: jest.fn(),
        create: jest.fn(),
        findOne: jest.fn(),
        findByPk: jest.fn(),
    };
    mockUserModel.init = jest.fn();
    return mockUserModel;
});

jest.mock('../models/game.model', () => {
    const mockGameModel = {
        belongsTo: jest.fn(),
        hasMany: jest.fn(),
    };
    mockGameModel.init = jest.fn();
    return mockGameModel;
});

jest.mock('../models/score.model', () => {
    const mockScoreModel = {
        belongsTo: jest.fn(), // Add belongsTo method here
    };
    mockScoreModel.init = jest.fn();
    return mockScoreModel;
});

describe('User Service and API Tests', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // Unit Tests for User Service
    describe('User Service', () => {

        test('should create a new user', async () => {
            const mockUser = { id: 1, username: 'testuser', email: 'test@example.com', role: 'Player' };
            const User = require('../models/user.model');
            User.create.mockResolvedValue(mockUser);

            const userService = require('../services/user.service');
            const user = await userService.createUser({
                username: 'testuser',
                email: 'test@example.com',
                password: 'password123',
                role: 'Player'
            });

            expect(user).toEqual(mockUser);
            expect(User.create).toHaveBeenCalledWith(expect.objectContaining({
                username: 'testuser',
                email: 'test@example.com',
                role: 'Player'
            }));
        });

        test('should find a user by email', async () => {
            const mockUser = { id: 1, username: 'testuser', email: 'test@example.com', role: 'Player' };
            const User = require('../models/user.model');
            User.findOne.mockResolvedValue(mockUser);

            const userService = require('../services/user.service');
            const user = await userService.findUserByEmail('test@example.com');
            expect(user).toEqual(mockUser);
            expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
        });

        test('should find a user by ID', async () => {
            const mockUser = { id: 1, username: 'testuser', email: 'test@example.com', role: 'Player' };
            const User = require('../models/user.model');
            User.findByPk.mockResolvedValue(mockUser);

            const userService = require('../services/user.service');
            const user = await userService.findUserById(1);
            expect(user).toEqual(mockUser);
            expect(User.findByPk).toHaveBeenCalledWith(1);
        });
    });

    // Integration Tests for User API
    // (commented out in your provided code, you can uncomment and adjust as needed)
    
    describe('User API', () => {

        test('should register a new user', async () => {
            const mockUser = { id: 1, username: 'testuser', email: 'test@example.com', role: 'Player' };

            const User = require('../models/user.model');
            User.create.mockResolvedValue(mockUser);

            const res = await request(app)
                .post('/api/users/register')
                .send({
                    username: 'testuser',
                    email: 'test@example.com',
                    password: 'password',
                    role: 'Player'
                });

            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty('id');
            expect(User.create).toHaveBeenCalledWith(expect.objectContaining({
                username: 'testuser',
                email: 'test@example.com',
                role: 'Player'
            }));
        });

        test('should login a user and return a token', async () => {
            const mockUser = { id: 1, username: 'testuser', email: 'test@example.com', password: 'hashedpassword', role: 'Player' };
            const User = require('../models/user.model');
            User.findOne.mockResolvedValue(mockUser);
            bcrypt.compare.mockResolvedValue(true);
            jwt.sign.mockReturnValue('fake-jwt-token');

            const res = await request(app)
                .post('/api/users/login')
                .send({
                    email: 'test@example.com',
                    password: 'password'
                });

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('token', 'fake-jwt-token');
            expect(User.findOne).toHaveBeenCalledWith({ where: { email: 'test@example.com' } });
            expect(bcrypt.compare).toHaveBeenCalledWith('password', 'hashedpassword');
        });
        
    });
    
});
