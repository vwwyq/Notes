const request = require('supertest');
const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const app = require('../../server');
const Note = require('../../models/Note');

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  await mongoose.connect(mongoServer.getUri());
});

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

afterEach(async () => {
  await Note.deleteMany();
});

describe('Notes API - /api/notes', () => {
  it('should create a new note', async () => {
    const res = await request(app).post('/api/notes').send({
      title: 'API Test Note',
      content: 'Content of the note'
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.data.title).toBe('API Test Note');
  });

  it('should return all notes', async () => {
    await Note.create({ title: 'A', content: 'B' });
    const res = await request(app).get('/api/notes');

    expect(res.statusCode).toBe(200);
    expect(res.body.data.length).toBe(1);
  });

  it('should return a note by ID', async () => {
    const note = await Note.create({ title: 'X', content: 'Y' });
    const res = await request(app).get(`/api/notes/${note._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe('X');
  });

  it('should update a note', async () => {
    const note = await Note.create({ title: 'Old', content: 'Old content' });
    const res = await request(app).put(`/api/notes/${note._id}`).send({ title: 'New' });

    expect(res.statusCode).toBe(200);
    expect(res.body.data.title).toBe('New');
  });

  it('should delete a note', async () => {
    const note = await Note.create({ title: 'Delete me', content: 'Bye' });
    const res = await request(app).delete(`/api/notes/${note._id}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/deleted successfully/i);
  });
});
