const request = require('supertest');
const app = require('../server');

// Optional: mock authentication middleware if required
jest.mock('../middleware/authMiddleware', () => ({
  ensureAuthenticated: (req, res, next) => {
    req.isAuthenticated = () => true;
    req.user = { displayName: 'Test User' };
    next();
  },
}));

describe('Server Integration Tests', () => {
  it('GET /researcher/projects/create should return 200', async () => {
    const response = await request(app).get('/researcher/projects/create');

    expect(response.status).toBe(200);
    expect(response.text).toMatch(/create/i); // Check for form text
  });

  it('GET /share should render share page', async () => {
    const response = await request(app).get('/share');
    expect(response.status).toBe(200);
    expect(response.text).toMatch(/share/i);
  });

  it('GET /logout should redirect to /login', async () => {
    const response = await request(app).get('/logout');
    expect(response.status).toBe(302);
    expect(response.header.location).toBe('/login');
  });
});
