const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true,
    maxlength: 5000
  },
  category: {
    type: String,
    default: 'general',
    trim: true,
    lowercase: true
  },
  tags: [{
    type: String,
    trim: true,
    lowercase: true
  }],
  color: {
    type: String,
    default: '#FFFFFF',
    match: /^#[0-9A-F]{6}$/i
  }
}, {
  timestamps: true
});

noteSchema.index({ title: 'text', content: 'text' });

module.exports = mongoose.model('Note', noteSchema);
