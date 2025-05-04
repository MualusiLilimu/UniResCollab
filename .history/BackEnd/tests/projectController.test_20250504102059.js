const request = require('supertest');
const express = require('express');
const router = require('../routes/projectRoutes');
const User = require('../Models/userModel');
const Project = require('../Models/project');

jest.mock('../Models/userModel');
jest.mock('../Models/project');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', router);

describe('Project Routes', () => {

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /users/remove', () => {
    it('should remove user and their projects', async () => {
      const mockUser = { _id: '123', username: 'testuser' };

      User.findOneAndDelete.mockResolvedValue(mockUser);
      Project.deleteMany.mockResolvedValue({ deletedCount: 2 });

      const response = await request(app)
        .post('/users/remove')
        .send({ username: 'testuser' });

      expect(User.findOneAndDelete).toHaveBeenCalledWith({ username: 'testuser' });
      expect(Project.deleteMany).toHaveBeenCalledWith({ user: mockUser._id });

      expect(response.status).toBe(200);
      expect(response.body.success).toBe(true);
      expect(response.body.message).toBe("User and their projects removed successfully.");
    });

    it('should return 404 if user is not found', async () => {
      User.findOneAndDelete.mockResolvedValue(null);

      const response = await request(app)
        .post('/users/remove')
        .send({ username: 'nonexistent' });

      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
      expect(response.body.message).toBe("User not found.");
    });

    it('should handle server error', async () => {
      User.findOneAndDelete.mockRejectedValue(new Error('DB error'));

      const response = await request(app)
        .post('/users/remove')
        .send({ username: 'testuser' });

      expect(response.status).toBe(500);
      expect(response.body.success).toBe(false);
    });
  });

  describe('GET /all', () => {
    it('should render all projects', async () => {
      Project.find.mockResolvedValue([
        { title: 'Project A' },
        { title: 'Project B' }
      ]);

      const res = await request(app).get('/all');

      expect(Project.find).toHaveBeenCalled();
      expect(res.status).toBe(200);
      expect(res.text).toContain('Project'); // crude check for rendering
    });

    it('should return 500 if project fetch fails', async () => {
      Project.find.mockRejectedValue(new Error('DB failure'));

      const res = await request(app).get('/all');
      expect(res.status).toBe(500);
    });
  });
});
