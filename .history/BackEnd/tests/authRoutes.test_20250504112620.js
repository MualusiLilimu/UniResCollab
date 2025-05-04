const request = require('supertest');
const express = require('express');
const passport = require('passport');

jest.mock('passport'); // Prevent real OAuth calls

// Mock the authController
jest.mock('../Controllers/authController', () => ({
  googleCallback: jest.fn((req, res) => res.send('Google callback')),
  loginPage: jest.fn((req, res) => res.send('Login page')),
}));

const authRoutes = require('../Routes/authRoutes');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use('/', authRoutes);

describe('Auth Routes (Google Only)', () => {
  beforeEach(() => {
    // Mock passport.authenticate to respond with a test message
    passport.authenticate.mockImplementation((provider, options) => {
      return (req, res) => {
        res.send(`${provider} auth mock`);
      };
    });
  });

  test('GET /login should call loginPage controller', async () => {
    const res = await request(app).get('/login');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Login page');
  });

  test('GET /google should invoke Google auth', async () => {
    const res = await request(app).get('/google');
    expect(res.status).toBe(200);
    expect(res.text).toBe('google auth mock');
  });

  test('GET /google/callback should invoke googleCallback controller', async () => {
    passport.authenticate.mockImplementationOnce(() => (req, res) => {
      require('../Controllers/authController').googleCallback(req, res);
    });

    const res = await request(app).get('/google/callback');
    expect(res.status).toBe(200);
    expect(res.text).toBe('Google callback');
  });
});
