const express = require('express');
const request = require('supertest');
const session = require('express-session');
const flash = require('express-flash');
const userRouter = require('../Routes/userRoutes');
const OAuthUser = require('../Models/userModel');

jest.mock('../Models/userModel'); // mock Mongoose model

// Setup a basic app using your router
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'test', resave: false, saveUninitialized: false }));
app.use(flash());

// Fake isAuthenticated and req.user middleware
app.use((req, res, next) => {
  req.isAuthenticated = () => true;
  req.user = { providerId: 'test-id' };
  next();
});

app.set('view engine', 'ejs'); // even if EJS is not actually rendered
app.use('/', userRouter);

describe('User Routes', () => {

  test('GET /about renders about.ejs', async () => {
    const res = await request(app).get('/about');
    expect(res.statusCode).toBe(200);
  });

  test('GET /roles renders roles.ejs', async () => {
    const res = await request(app).get('/roles');
    expect(res.statusCode).toBe(200);
  });

  test('GET /set-role sets user role and redirects to /username', async () => {
    OAuthUser.findOneAndUpdate.mockResolvedValueOnce({ providerId: 'test-id', role: 'Admin' });

    const res = await request(app).get('/set-role?role=Admin');
    expect(res.statusCode).toBe(302);
    expect(res.header.location).toBe('/username');
    expect(OAuthUser.findOneAndUpdate).toHaveBeenCalledWith(
      { providerId: 'test-id' },
      { role: 'Admin' }
    );
  });

  test('POST /username updates username and redirects to correct home page', async () => {
    OAuthUser.findOneAndUpdate.mockResolvedValueOnce({
      providerId: 'test-id',
      username: 'testuser',
      role: 'Reviewer'
    });

    const res = await request(app)
      .post('/username')
      .send({ username: 'testuser' });

    expect(res.statusCode).toBe(302);
    expect(res.header.location).toBe('/Reviewer/Home');
  });

  test('POST /username fails if username too short', async () => {
    const res = await request(app)
      .post('/username')
      .send({ username: 'abc' });

    // We expect it to render with an error (since res.render is not actually mocked, response will be 200)
    expect(res.statusCode).toBe(200);
  });

});
