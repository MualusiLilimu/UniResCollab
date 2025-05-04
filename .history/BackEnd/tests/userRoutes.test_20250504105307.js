const request = require('supertest');
const app = require('../server');
const controller = require('../Controllers/userController');
const OAuthUser = require('../Models/userModel');

// Mock authentication middleware
jest.mock('../middleware/authMiddleware', () => ({
  ensureAuthenticated: (req, res, next) => {
    req.user = { id: 'test-id', role: 'Admin' }; // Simulate authenticated user
    next();
  },
}));

// Mock controller methods
jest.mock('../Controllers/userController', () => ({
  welcome: jest.fn((req, res) => res.status(200).send('Welcome')),
  roles: jest.fn((req, res) => res.render('roles.ejs')),
  about: jest.fn((req, res) => res.render('about.ejs')),
  setRole: jest.fn((req, res) => res.redirect('/username')),
  updateUsername: jest.fn((req, res) => res.redirect('/AdminHome')),
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
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /about renders about.ejs', async () => {
    const res = await request(app).get('/about');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Why BuildUniResCollab?');
    expect(controller.about).toHaveBeenCalled();
  });

  test('GET /roles renders roles.ejs', async () => {
    const res = await request(app).get('/roles');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Select your role to continue');
    expect(controller.roles).toHaveBeenCalled();
  });

  test('GET /set-role sets user role and redirects to /username', async () => {
    const res = await request(app).get('/set-role?role=Admin');
    expect(res.statusCode).toBe(302);
    expect(res.header.location).toBe('/username');
    expect(controller.setRole).toHaveBeenCalled();
  });

  test('POST /username fails if username too short', async () => {
    const res = await request(app)
      .post('/username')
      .send({ username: 'abc' });
    expect(res.statusCode).toBe(302);
    expect(res.header.location).toContain('username');
    expect(controller.updateUsername).toHaveBeenCalled();
  });

  test('POST /username updates the username and redirects correctly', async () => {
    OAuthUser.findOneAndUpdate.mockResolvedValue({
      providerId: 'test-id',
      username: 'newUsername',
      role: 'Admin',
    });

    const res = await request(app)
      .post('/username')
      .send({ username: 'newUsername' });
    expect(res.statusCode).toBe(302);
    expect(res.header.location).toBe('/AdminHome');
    expect(OAuthUser.findOneAndUpdate).toHaveBeenCalled();
    expect(controller.updateUsername).toHaveBeenCalled();
  });
});