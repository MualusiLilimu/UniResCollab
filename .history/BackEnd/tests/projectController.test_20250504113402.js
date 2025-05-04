const request = require('supertest');
const app = require('../../app'); // your Express app
const Project = require('../../Models/project');
const User = require('../../Models/userModel');

jest.mock('../../Models/project'); // mock the model

describe('POST /projects/create', () => {
  let mockUser;

  beforeEach(() => {
    mockUser = {
      _id: 'user123',
      username: 'johndoe',
      role: 'Researcher'
    };
  });

  it('should create a new project and redirect', async () => {
    const mockSave = jest.fn().mockResolvedValue({});
    Project.mockImplementation(() => ({ save: mockSave }));

    const projectData = {
      title: 'Test Project',
      domain: 'AI',
      abstract: 'This is a test project',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      methodology: ['ML'],
      pi: 'Dr. Smith',
      institution: 'Test University',
      visibility: 'Public',
      ethics: 'Approved',
      dataPolicy: 'Compliant',
      collaborators: 'alice,bob'
    };

    const agent = request.agent(app);
    // Simulate a logged-in user
    app.use((req, res, next) => {
      req.user = mockUser;
      next();
    });

    const res = await agent
      .post('/projects/create') // Update path if yours differs
      .send(projectData);

    expect(Project).toHaveBeenCalledWith(expect.objectContaining({
      title: projectData.title,
      domain: projectData.domain,
      user: mockUser._id
    }));

    expect(mockSave).toHaveBeenCalled();
    expect(res.statusCode).toBe(302); // redirect status
    expect(res.header.location).toBe('/researcher/Home');
  });

  it('should return 400 if required fields are missing', async () => {
    const agent = request.agent(app);
    app.use((req, res, next) => {
      req.user = mockUser;
      next();
    });

    const res = await agent
      .post('/projects/create')
      .send({
        title: '', // missing required fields
        domain: '',
        abstract: ''
      });

    expect(res.statusCode).toBe(400);
    expect(res.text).toBe('All required fields must be filled.');
  });

  it('should return 500 if save throws an error', async () => {
    Project.mockImplementation(() => ({
      save: jest.fn().mockRejectedValue(new Error('DB Error'))
    }));

    const agent = request.agent(app);
    app.use((req, res, next) => {
      req.user = mockUser;
      next();
    });

    const res = await agent.post('/projects/create').send({
      title: 'Test',
      domain: 'AI',
      abstract: 'Abstract',
      startDate: '2025-01-01',
      endDate: '2025-12-31',
      methodology: ['ML'],
      pi: 'Dr. Smith',
      institution: 'University',
      visibility: 'Public',
      ethics: '',
      dataPolicy: '',
      collaborators: ''
    });

    expect(res.statusCode).toBe(500);
    expect(res.text).toBe('Error creating project');
  });
});

