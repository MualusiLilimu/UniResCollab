const request = require('supertest');
const app = require('../app'); // Your Express app
const mongoose = require('mongoose');
const User = require('../Models/userm');
const Project = require('../models/project');

beforeEach(async () => {
  // Clear test database before each test
  await User.deleteMany({});
  await Project.deleteMany({});
});

afterEach(async () => {
  // Clean up after each test
  await User.deleteMany({});
  await Project.deleteMany({});
});

describe('Project Routes', () => {
  it('should render the create project form', async () => {
    const res = await request(app).get('/projects/create');
    expect(res.status).toBe(200);
    expect(res.text).toContain('create'); // Ensure the form is rendered
  });

  it('should remove a user and their projects', async () => {
    const user = new User({ username: 'user1', email: 'user1@example.com' });
    await user.save();

    const project = new Project({ user: user._id, name: 'Test Project' });
    await project.save();

    const res = await request(app)
      .post('/projects/users/remove')
      .send({ username: 'user1' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toBe("User and their projects removed successfully.");
  });
});
