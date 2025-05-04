// userRoutes.test.js

const request = require('supertest');
const app = require('../app'); // Assuming your Express app is exported from this file
const controller = require('../Controllers/userController');
const OAuthUser = require('../Models/userModel');

// Mock controller methods
jest.mock('../Controllers/userController', () => ({
  welcome: jest.fn((req, res) => res.status(200).send('Welcome')),
  roles: jest.fn((req, res) => res.status(200).send('Roles Page')),
  AdminHome: jest.fn((req, res) => res.status(200).send('Admin Home')),
  ResearcherHome: jest.fn((req, res) => res.status(200).send('Researcher Home')),
  ReviewerHome: jest.fn((req, res) => res.status(200).send('Reviewer Home')),
  login: jest.fn((req, res) => res.status(200).send('Login')),
  register: jest.fn((req, res) => res.status(200).send('Register')),
}));

// Mock OAuthUser model methods
jest.mock('../Models/userModel', () => ({
  findOneAndUpdate: jest.fn(),
}));

describe('User Routes', () => {
  
  // Test for /about route
  test('GET /about renders about.ejs', async () => {
    const res = await request(app).get('/about');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Roles Page');
  });

  // Test for /roles route
  test('GET /roles renders roles.ejs', async () => {
    const res = await request(app).get('/roles');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Roles Page');
  });

  // Test for /set-role route
  test('GET /set-role sets user role and redirects to /username', async () => {
    const res = await request(app)
      .get('/set-role?role=Admin')
      .set('Cookie', 'your-authentication-cookie-here'); // Add cookie for authenticated user
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Username');
  });

  // Test for /username POST route when username is too short
  test('POST /username fails if username too short', async () => {
    const res = await request(app)
      .post('/username')
      .send({ username: 'abc' })
      .set('Cookie', 'your-authentication-cookie-here');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Username must be at least 6 characters');
  });

  // Test for /username POST route when username is valid
  test('POST /username updates the username and redirects correctly', async () => {
    OAuthUser.findOneAndUpdate.mockResolvedValue({
      providerId: 'test-id',
      username: 'newUsername',
      role: 'Admin',
    });

    const res = await request(app)
      .post('/username')
      .send({ username: 'newUsername' })
      .set('Cookie', 'your-authentication-cookie-here');
    
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Admin Home');
  });
  
});
