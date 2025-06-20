const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET /api/notes
router.get('/', async (req, res, next) => {
  try {
    const { search, category, tag, limit, skip } = req.query;
    let query = {};

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    if (category) {
      query.category = category.toLowerCase();
    }

    if (tag) {
      query.tags = { $in: [tag.toLowerCase()] };
    }

    const notes = await Note.find(query)
      .sort({ updatedAt: -1 })
      .limit(parseInt(limit) || 50)
      .skip(parseInt(skip) || 0);

    const count = await Note.countDocuments(query);

    res.json({ success: true, data: notes, count, total: count });
  } catch (error) {
    next(error);
  }
});

// GET /api/notes/stats
router.get('/stats', async (req, res, next) => {
  try {
    const totalNotes = await Note.countDocuments();
    const categoryStats = await Note.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } },
      { $sort: { count: -1 } }
    ]);

    const tagStats = await Note.aggregate([
      { $unwind: '$tags' },
      { $group: { _id: '$tags', count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 10 }
    ]);

    const recentNotes = await Note.find().sort({ updatedAt: -1 }).limit(5).select('title updatedAt');

    res.json({
      success: true,
      data: {
        totalNotes,
        categoryCounts: Object.fromEntries(categoryStats.map(stat => [stat._id, stat.count])),
        tagCounts: Object.fromEntries(tagStats.map(stat => [stat._id, stat.count])),
        recentActivity: recentNotes
      }
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/notes/:id
router.get('/:id', async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ success: false, message: 'Note not found' });
    res.json({ success: true, data: note });
  } catch (error) {
    next(error);
  }
});

// POST /api/notes
router.post('/', async (req, res, next) => {
  try {
    const { title, content, category, tags, color } = req.body;
    if (!title || !content) {
      return res.status(400).json({ success: false, message: 'Title and content are required' });
    }

    const note = new Note({
      title: title.trim(),
      content: content.trim(),
      category: category ? category.toLowerCase().trim() : 'general',
      tags: tags ? tags.map(tag => tag.toLowerCase().trim()) : [],
      color: color || '#FFFFFF'
    });

    const savedNote = await note.save();
    res.status(201).json({ success: true, data: savedNote, message: 'Note created successfully' });
  } catch (error) {
    next(error);
  }
});

// PUT /api/notes/:id
router.put('/:id', async (req, res, next) => {
  try {
    const updates = req.body;
    if (updates.category) updates.category = updates.category.toLowerCase().trim();
    if (updates.tags) updates.tags = updates.tags.map(tag => tag.toLowerCase().trim());
    if (updates.title) updates.title = updates.title.trim();
    if (updates.content) updates.content = updates.content.trim();

    const note = await Note.findByIdAndUpdate(req.params.id, updates, {
      new: true,
      runValidators: true
    });

    if (!note) return res.status(404).json({ success: false, message: 'Note not found' });

    res.json({ success: true, data: note, message: 'Note updated successfully' });
  } catch (error) {
    next(error);
  }
});

// DELETE /api/notes/:id
router.delete('/:id', async (req, res, next) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ success: false, message: 'Note not found' });

    res.json({ success: true, message: 'Note deleted successfully', data: { deletedId: req.params.id } });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
