const request = require('supertest');
const app = require('../server');
const controller = require('../Controllers/userController');
const OAuthUser = require('../Models/userModel');

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

  // Test for /about route
  test('GET /about renders about.ejs', async () => {
    const res = await request(app).get('/about');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Why Build UniResCollab?'); // Match actual content
    expect(controller.about).toHaveBeenCalled();
  });

  // Test for /roles route
  test('GET /roles renders roles.ejs', async () => {
    const res = await request(app).get('/roles');
    expect(res.statusCode).toBe(200);
    expect(res.text).toContain('Select your role to continue'); // Match actual content
    expect(controller.roles).toHaveBeenCalled();
  });

  // Test for /set-role route
  test('GET /set-role sets user role and redirects to /username', async () => {
    const res = await request(app)
      .get('/set-role?role=Admin')
      .set('Cookie', 'your-authentication-cookie-here');
    expect(res.statusCode).toBe(302); // Expect redirect
    expect(res.header.location).toBe('/username');
    expect(controller.setRole).toHaveBeenCalled();
  });

  // Test for /username POST route when username is too short
  test('POST /username fails if username too short', async () => {
    const res = await request(app)
      .post('/username')
      .send({ username: 'abc' })
      .set('Cookie', 'your-authentication-cookie-here');
    expect(res.statusCode).toBe(302); // Expect redirect on failure
    expect(res.header.location).toContain('username'); // Redirects back to username page
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
    expect(res.statusCode).toBe(302); // Expect redirect
    expect(res.header.location).toBe('/AdminHome');
    expect(OAuthUser.findOneAndUpdate).toHaveBeenCalled();
    expect(controller.updateUsername).toHaveBeenCalled();
  });
});
