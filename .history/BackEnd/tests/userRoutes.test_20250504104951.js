const request = require('supertest');
const express = require('express');
const app = express();

// Import your middleware mocks
const ensureAuthenticated = require('./mocks/ensureAuthenticated');
const ensureResearcher = require('./mocks/ensureResearcher');

// Import your route handler
const projectRouter = require('../routes/projectRouter');

// Use mocked middleware in the app
app.use('/projects', ensureAuthenticated, ensureResearcher, projectRouter);

describe('GET /projects/create', () => {
    it('should render the create project page for authenticated researchers', async () => {
        // Simulate a successful authenticated researcher
        ensureAuthenticated.mockImplementationOnce((req, res, next) => {
            req.user = { id: 1, role: 'researcher' }; // Mock user as researcher
            next();
        });

        const response = await request(app).get('/projects/create');
        expect(response.status).toBe(200);
        expect(response.text).toContain('Create Project');
    });

    it('should return 403 for non-researcher users', async () => {
        // Simulate a non-researcher
        ensureAuthenticated.mockImplementationOnce((req, res, next) => {
            req.user = { id: 1, role: 'user' }; // Mock user as regular user
            next();
        });

        const response = await request(app).get('/projects/create');
        expect(response.status).toBe(403);
        expect(response.text).toContain('Forbidden');
    });

    it('should return 401 for unauthenticated users', async () => {
        // Simulate unauthenticated user
        ensureAuthenticated.mockImplementationOnce((req, res, next) => {
            req.user = undefined; // No user
            next();
        });

        const response = await request(app).get('/projects/create');
        expect(response.status).toBe(401);
        expect(response.text).toContain('Unauthorized');
    });
});
