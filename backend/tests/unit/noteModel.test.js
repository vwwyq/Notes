const Note = require('../../models/Note');

describe('Note Model - Unit Tests', () => {
  it('should be invalid if title is missing', done => {
    const note = new Note({ content: 'Content only' });
    note.validate(err => {
      expect(err.errors.title).toBeDefined();
      done();
    });
  });

  it('should be invalid if content is missing', done => {
    const note = new Note({ title: 'Title only' });
    note.validate(err => {
      expect(err.errors.content).toBeDefined();
      done();
    });
  });

  it('should set default category to "general"', () => {
    const note = new Note({ title: 'Sample', content: 'Text' });
    expect(note.category).toBe('general');
  });

  it('should convert tags to lowercase', () => {
    const note = new Note({ title: 't', content: 'c', tags: ['TagOne', 'TagTwo'] });
    expect(note.tags).toEqual(['tagone', 'tagtwo']);
  });
});
