const request = require('supertest');
const express = require('express');
const router = require('./projectRoutes');
const Project = require('../Models/project');
const User = require('../Models/userModel');
const projectController = require('../Controllers/projectController');
const { ensureAuthenticated, ensureResearcher } = require('../middleware/authMiddleware');

jest.mock('../Models/project');
jest.mock('../Models/userModel');
jest.mock('../Controllers/projectController');
jest.mock('../middleware/authMiddleware');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

describe('Project Routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    ensureAuthenticated.mockImplementation((req, res, next) => next());
    ensureResearcher.mockImplementation((req, res, next) => next());
  });

  test('GET /create renders create form', async () => {
    const res = await request(app).get('/create');
    expect(res.status).toBe(200);
    expect(res.text).toContain('create');
  });

  test('POST /create calls createProject controller', async () => {
    await request(app).post('/create').send({ title: 'Test Project' });
    expect(projectController.createProject).toHaveBeenCalled();
  });

  test('GET /my-projects calls getMyProjects controller', async () => {
    await request(app).get('/my-projects');
    expect(projectController.getMyProjects).toHaveBeenCalled();
  });

  test('GET /project-details/:id calls viewProjectDetails controller', async () => {
    await request(app).get('/project-details/123');
    expect(projectController.viewProjectDetails).toHaveBeenCalled();
  });

  test('DELETE /project-details/:id/delete calls deleteProject controller', async () => {
    await request(app).delete('/project-details/123/delete');
    expect(projectController.deleteProject).toHaveBeenCalled();
  });

  test('POST /project-details/:id/edit calls editProject controller', async () => {
    await request(app).post('/project-details/123/edit').send({ title: 'Updated Project' });
    expect(projectController.editProject).toHaveBeenCalled();
  });

  test('GET /project-details/:id/edit calls getEditProjectForm controller', async () => {
    await request(app).get('/project-details/123/edit');
    expect(projectController.getEditProjectForm).toHaveBeenCalled();
  });

  test('GET /project-details/:id/invite-collaborators calls getInviteCollaboratorsForm controller', async () => {
    await request(app).get('/project-details/123/invite-collaborators');
    expect(projectController.getInviteCollaboratorsForm).toHaveBeenCalled();
  });

  test('GET /searchUser calls searchUserByUsername controller', async () => {
    await request(app).get('/searchUser').query({ username: 'testuser' });
    expect(projectController.searchUserByUsername).toHaveBeenCalled();
  });

  test('POST /addCollaborator calls addCollaborator controller', async () => {
    await request(app).post('/addCollaborator').send({ username: 'testuser', projectId: '123' });
    expect(projectController.addCollaborator).toHaveBeenCalled();
  });

  test('GET /:projectId/collaborators renders collaborators', async () => {
    const project = { _id: '123', collaborators: ['user1', 'user2'] };
    Project.findById.mockResolvedValue(project);
    const res = await request(app).get('/123/collaborators');
    expect(res.status).toBe(200);
    expect(Project.findById).toHaveBeenCalledWith('123');
  });

  test('GET /:projectId/collaborators returns 404 if project not found', async () => {
    Project.findById.mockResolvedValue(null);
    const res = await request(app).get('/123/collaborators');
    expect(res.status).toBe(404);
    expect(res.text).toBe('Project not found');
  });

  test('POST /removeCollaborator removes collaborator', async () => {
    const project = { _id: '123', collaborators: ['user1', 'user2'], save: jest.fn() };
    Project.findById.mockResolvedValue(project);
    const res = await request(app).post('/removeCollaborator').send({ username: 'user1', projectId: '123' });
    expect(res.status).toBe(200);
    expect(project.collaborators).toEqual(['user2']);
    expect(project.save).toHaveBeenCalled();
    expect(res.body).toEqual({ success: true });
  });

  test('POST /removeCollaborator returns 404 if project not found', async () => {
    Project.findById.mockResolvedValue(null);
    const res = await request(app).post('/removeCollaborator').send({ username: 'user1', projectId: '123' });
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ success: false, message: 'Project not found' });
  });

  test('GET /all renders all projects', async () => {
    const projects = [{ _id: '123', title: 'Test Project' }];
    Project.find.mockResolvedValue(projects);
    const res = await request(app).get('/all');
    expect(res.status).toBe(200);
    expect(Project.find).toHaveBeenCalledWith({});
  });

  test('POST /users/remove deletes user and their projects', async () => {
    const user = { _id: 'user123', username: 'testuser' };
    User.findOneAndDelete.mockResolvedValue(user);
    Project.deleteMany.mockResolvedValue({ deletedCount: 2 });
    const res = await request(app).post('/users/remove').send({ username: 'testuser' });
    expect(res.status).toBe(200);
    expect(User.findOneAndDelete).toHaveBeenCalledWith({ username: 'testuser' });
    expect(Project.deleteMany).toHaveBeenCalledWith({ user: 'user123' });
    expect(res.body).toEqual({ success: true, message: 'User and their projects removed successfully.' });
  });

  test('POST /users/remove returns 404 if user not found', async () => {
    User.findOneAndDelete.mockResolvedValue(null);
    const res = await request(app).post('/users/remove').send({ username: 'testuser' });
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ success: false, message: 'User not found.' });
  });
});