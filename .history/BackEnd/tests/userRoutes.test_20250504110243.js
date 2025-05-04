const request = require('supertest');
const app = require('../server');  // Replace with the path to your Express app
const ensureAuthenticated = require('./mocks/ensureAuthenticated');
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

    
});
