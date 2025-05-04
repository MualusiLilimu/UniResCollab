const request = require('supertest');
const express = require('express');
const router = require('../Routes/projectRouter'); // Adjust the path if needed
const app = express();

// Mock middleware
jest.mock('../middleware/authMiddleware', () => ({
  ensureAuthenticated: jest.fn((req, res, next) => next()),
  ensureResearcher: jest.fn((req, res, next) => next()),
}));

// Mock controllers
jest.mock('../Controllers/projectController', () => ({
  createProject: jest.fn((req, res) => res.status(200).send('Project created')),
  getMyProjects: jest.fn((req, res) => res.status(200).send('My projects')),
  viewProjectDetails: jest.fn((req, res) => res.status(200).send('Project details')),
  deleteProject: jest.fn((req, res) => res.status(200).send('Project deleted')),
  editProject: jest.fn((req, res) => res.status(200).send('Project edited')),
  getEditProjectForm: jest.fn((req, res) => res.status(200).send('Edit form')),
  getInviteCollaboratorsForm: jest.fn((req, res) => res.status(200).send('Invite form')),
  searchUserByUsername: jest.fn((req, res) => res.status(200).send('User searched')),
  addCollaborator: jest.fn((req, res) => res.status(200).send('Collaborator added')),
}));

// Mock models (if needed)
jest.mock('../Models/project', () => ({
  findById: jest.fn(() => ({ collaborators: ['user1', 'user2'] })),
  find: jest.fn(() => [{ name: 'Project 1' }, { name: 'Project 2' }]),
}));

jest.mock('../Models/userModel', () => ({
  findOneAndDelete: jest.fn(() => ({ username: 'user1' })),
  deleteMany: jest.fn(),
}));

// Middleware
app.use('/projects', router);

describe('Project Routes', () => {
  describe('GET /projects/create', () => {
    it('should render the create project form', async () => {
      const res = await request(app).get('/projects/create');
      expect(res.status).toBe(200);
      expect(res.text).toContain('create');
    });
  });

  describe('POST /projects/create', () => {
    it('should create a project', async () => {
      const res = await request(app)
        .post('/projects/create')
        .send({ name: 'Test Project', description: 'A test project' });
      expect(res.status).toBe(200);
      expect(res.text).toBe('Project created');
    });
  });

  describe('GET /projects/my-projects', () => {
    it('should get the user\'s projects', async () => {
      const res = await request(app).get('/projects/my-projects');
      expect(res.status).toBe(200);
      expect(res.text).toBe('My projects');
    });
  });

  describe('GET /projects/project-details/:id', () => {
    it('should return project details', async () => {
      const res = await request(app).get('/projects/project-details/1');
      expect(res.status).toBe(200);
      expect(res.text).toBe('Project details');
    });
  });

  describe('DELETE /projects/project-details/:id/delete', () => {
    it('should delete a project', async () => {
      const res = await request(app).delete('/projects/project-details/1/delete');
      expect(res.status).toBe(200);
      expect(res.text).toBe('Project deleted');
    });
  });

  describe('POST /projects/project-details/:id/edit', () => {
    it('should edit a project', async () => {
      const res = await request(app)
        .post('/projects/project-details/1/edit')
        .send({ name: 'Updated Project' });
      expect(res.status).toBe(200);
      expect(res.text).toBe('Project edited');
    });
  });

  describe('POST /projects/addCollaborator', () => {
    it('should add a collaborator to a project', async () => {
      const res = await request(app)
        .post('/projects/addCollaborator')
        .send({ username: 'newUser', projectId: '1' });
      expect(res.status).toBe(200);
      expect(res.text).toBe('Collaborator added');
    });
  });

  describe('POST /projects/users/remove', () => {
    it('should remove a user and their projects', async () => {
      const res = await request(app)
        .post('/projects/users/remove')
        .send({ username: 'user1' });
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
    });
  });
});
