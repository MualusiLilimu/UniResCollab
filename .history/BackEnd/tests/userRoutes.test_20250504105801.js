const request = require('supertest');
const app = require('../server');  // Replace with the path to your Express app
const ensureAuthenticated = require('./');
const ensureResearcher = require('./mocks/ensureResearcher');

// Example of a route that uses these middlewares
describe('GET /create', () => {
    it('should return the create project page if authenticated and a researcher', async () => {
        // Mocking the middleware behavior
        app.get('/create', ensureAuthenticated, ensureResearcher, (req, res) => {
            res.status(200).send('Create Project Page');
        });

        // Sending a request to the route and checking the response
        const response = await request(app).get('/create');
        expect(response.status).toBe(200);
        expect(response.text).toBe('Create Project Page');
    });

    it('should return 403 if the user is not a researcher', async () => {
        // Modify the mock to simulate a non-researcher user
        app.get('/create', (req, res, next) => {
            req.user = { id: 2, role: 'user' };  // Not a researcher
            next();
        }, ensureResearcher, (req, res) => {
            res.status(200).send('Create Project Page');
        });

        // Sending a request to the route and checking the response
        const response = await request(app).get('/create');
        expect(response.status).toBe(403);  // Forbidden response
        expect(response.text).toBe('Forbidden');
    });
});
