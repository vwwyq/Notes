const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
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

describe('Database Operations - Integration Tests', () => {
  it('should save a note to the database', async () => {
    const note = new Note({ title: 'Test', content: 'Hello world' });
    const saved = await note.save();

    expect(saved._id).toBeDefined();
    expect(saved.title).toBe('Test');
  });

  it('should find a note by ID', async () => {
    const note = await Note.create({ title: 'Test', content: 'Find me' });
    const found = await Note.findById(note._id);

    expect(found.title).toBe('Test');
  });
});
