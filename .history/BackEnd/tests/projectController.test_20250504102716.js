const express = require('express');
const projectRouter = require('../Routes/projectRouter');
const Project = require('../Models/project');
const httpMocks = require('node-mocks-http');
const jestMock = require('jest-mock');

// Mock the Project model
jest.mock('../Models/project');

describe('Project Routes', () => {
  describe('GET /all', () => {
    it('should render all projects', async () => {
      const mockProjects = [
        { title: 'Project A', description: 'A test project' },
        { title: 'Project B', description: 'Another project' }
      ];

      Project.find.mockResolvedValue(mockProjects);

      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/all',
      });

      const res = httpMocks.createResponse();
      res.render = jest.fn();

      await new Promise((resolve) => {
        const next = () => resolve();
        projectRouter.handle(req, res, next);
      });

      expect(Project.find).toHaveBeenCalled();
      expect(res.render).toHaveBeenCalledWith('all-projects', { projects: mockProjects });
    });

    it('should handle DB errors and send 500', async () => {
      Project.find.mockRejectedValue(new Error('DB failure'));

      const req = httpMocks.createRequest({
        method: 'GET',
        url: '/all',
      });

      const res = httpMocks.createResponse();
      res.status = jest.fn().mockReturnThis();
      res.send = jest.fn();

      await new Promise((resolve) => {
        const next = () => resolve();
        projectRouter.handle(req, res, next);
      });

      expect(Project.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.send).toHaveBeenCalledWith('Server error');
    });
  });
});
