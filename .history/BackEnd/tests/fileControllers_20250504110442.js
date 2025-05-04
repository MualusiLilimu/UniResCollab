const request = require('supertest');
const app = require('../server'); // Assuming you have a server.js file to start the app
const File = require('../Models/fileModel');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

// Mock the File model
jest.mock('../Models/fileModel');

describe('File Controller Tests', () => {
  // Set up a test database before tests
  beforeAll(async () => {
    const db = await mongoose.connect('mongodb://localhost:27017/test_db', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    await File.deleteMany(); // Clear previous data
  });

  // Clean up after tests
  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('GET /share (showSharePage)', () => {
    it('should render the share page with files', async () => {
      // Mock File.find to return some files
      const mockFiles = [{ _id: '1', name: 'testfile.txt', contentType: 'text/plain' }];
      File.find.mockResolvedValue(mockFiles);

      const response = await request(app).get('/share');
      
      expect(response.status).toBe(200);
      expect(response.text).toContain('testfile.txt');
    });

    it('should handle errors when loading the page', async () => {
      File.find.mockRejectedValue(new Error('DB Error'));

      const response = await request(app).get('/share');
      
      expect(response.status).toBe(500);
      expect(response.text).toContain('Error loading page.');
    });
  });

  describe('POST /upload (uploadFile)', () => {
    it('should upload a file successfully', async () => {
      // Mock file upload handling
      const fileData = {
        originalname: 'testfile.txt',
        buffer: Buffer.from('test content'),
        mimetype: 'text/plain',
      };

      // Mock the File.save method
      const mockSave = jest.fn().mockResolvedValue();
      File.prototype.save = mockSave;

      const response = await request(app)
        .post('/upload')
        .attach('file', fileData.buffer, { filename: fileData.originalname });

      expect(response.status).toBe(302); // Redirect status
      expect(mockSave).toHaveBeenCalled();
      expect(response.header.location).toBe('/share');
    });

    it('should handle errors during file upload', async () => {
      File.prototype.save.mockRejectedValue(new Error('DB Error'));

      const response = await request(app).post('/upload').attach('file', Buffer.from('test'), 'testfile.txt');

      expect(response.status).toBe(500);
      expect(response.text).toContain('Error uploading the file.');
    });
  });

  describe('GET /files (listFiles)', () => {
    it('should return a list of files in JSON format', async () => {
      const mockFiles = [{ _id: '1', name: 'testfile.txt', contentType: 'text/plain' }];
      File.find.mockResolvedValue(mockFiles);

      const response = await request(app).get('/files');
      
      expect(response.status).toBe(200);
      expect(response.body).toEqual(mockFiles);
    });

    it('should handle errors while fetching files', async () => {
      File.find.mockRejectedValue(new Error('DB Error'));

      const response = await request(app).get('/files');
      
      expect(response.status).toBe(500);
      expect(response.text).toContain('Error retrieving files.');
    });
  });

  describe('GET /files/:id/download (downloadFile)', () => {
    it('should download a file by ID', async () => {
      const mockFile = { _id: '1', name: 'testfile.txt', contentType: 'text/plain', data: Buffer.from('file data') };
      File.findById.mockResolvedValue(mockFile);

      const response = await request(app).get('/files/1/download');
      
      expect(response.status).toBe(200);
      expect(response.header['content-type']).toBe('text/plain');
      expect(response.body).toEqual(mockFile.data);
    });

    it('should return 404 if the file is not found', async () => {
      File.findById.mockResolvedValue(null);

      const response = await request(app).get('/files/1/download');
      
      expect(response.status).toBe(404);
      expect(response.text).toContain('File not found');
    });

    it('should handle errors during file download', async () => {
      File.findById.mockRejectedValue(new Error('DB Error'));

      const response = await request(app).get('/files/1/download');
      
      expect(response.status).toBe(500);
      expect(response.text).toContain('Error retrieving file.');
    });
  });
});
