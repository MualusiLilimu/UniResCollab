const request = require('supertest');
const app = require('../server'); // Assuming your Express app is in server.js
const { googleCallback, githubCallback, loginPage } = require('../Controllers/authController');

// Mock the express response object to test redirects
jest.mock('express', () => ({
  ...jest.requireActual('express'),
  Router: jest.fn().mockImplementation(() => ({
    get: jest.fn(),
    post: jest.fn(),
    use: jest.fn(),
  })),
}));

describe('AuthController Tests', () => {

  // Test googleCallback and githubCallback redirection logic
  describe('GET /google/callback', () => {

    it('should redirect to Admin home if user role is Admin', async () => {
      const req = { user: { role: 'Admin' } };
      const res = {
        redirect: jest.fn(),
      };

      await googleCallback(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/Admin/Home');
    });

    it('should redirect to Reviewer home if user role is Reviewer', async () => {
      const req = { user: { role: 'Reviewer' } };
      const res = {
        redirect: jest.fn(),
      };

      await googleCallback(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/Reviewer/Home');
    });

    it('should redirect to Researcher home if user role is Researcher', async () => {
      const req = { user: { role: 'Researcher' } };
      const res = {
        redirect: jest.fn(),
      };

      await googleCallback(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/Researcher/Home');
    });

    it('should redirect to /roles if user role is not defined', async () => {
      const req = { user: { role: null } };
      const res = {
        redirect: jest.fn(),
      };

      await googleCallback(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/roles');
    });

    it('should redirect to /roles if user is not authenticated', async () => {
      const req = { user: null };
      const res = {
        redirect: jest.fn(),
      };

      await googleCallback(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/roles');
    });
  });

  describe('GET /github/callback', () => {

    it('should redirect to Admin home if user role is Admin', async () => {
      const req = { user: { role: 'Admin' } };
      const res = {
        redirect: jest.fn(),
      };

      await githubCallback(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/Admin/Home');
    });

    it('should redirect to Reviewer home if user role is Reviewer', async () => {
      const req = { user: { role: 'Reviewer' } };
      const res = {
        redirect: jest.fn(),
      };

      await githubCallback(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/Reviewer/Home');
    });

    it('should redirect to Researcher home if user role is Researcher', async () => {
      const req = { user: { role: 'Researcher' } };
      const res = {
        redirect: jest.fn(),
      };

      await githubCallback(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/Researcher/Home');
    });

    it('should redirect to /roles if user role is not defined', async () => {
      const req = { user: { role: null } };
      const res = {
        redirect: jest.fn(),
      };

      await githubCallback(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/roles');
    });

    it('should redirect to /roles if user is not authenticated', async () => {
      const req = { user: null };
      const res = {
        redirect: jest.fn(),
      };

      await githubCallback(req, res);
      expect(res.redirect).toHaveBeenCalledWith('/roles');
    });
  });

  // Test login page rendering
  describe('GET /login', () => {

    it('should render the login page', async () => {
      const res = await request(app).get('/login');
      expect(res.status).toBe(200);
      expect(res.text).toContain('login');
    });

  });
});
