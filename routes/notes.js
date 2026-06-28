const express = require('express');
const Note = require('../models/Note');

const router = express.Router();

// Get all notes with filters
router.get('/', async (req, res) => {
  try {
    const { class: userClass, subject, search } = req.query;
    let filter = {};

    if (userClass) filter.class = userClass;
    if (subject) filter.subject = subject;
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    const notes = await Note.find(filter).populate('uploadedBy', 'name email').sort({ createdAt: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get note by ID
router.get('/:id', async (req, res) => {
  try {
    const note = await Note.findById(req.params.id).populate('uploadedBy');
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json(note);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create new note
router.post('/', async (req, res) => {
  try {
    const { title, description, subject, class: userClass, chapter, fileUrl, fileType, tags, uploadedBy } = req.body;

    const note = new Note({
      title,
      description,
      subject,
      class: userClass,
      chapter,
      fileUrl,
      fileType,
      tags,
      uploadedBy,
    });

    await note.save();
    res.status(201).json({ message: 'Note created successfully ✅', note });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update note
router.put('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note updated successfully ✅', note });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete note
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }
    res.json({ message: 'Note deleted successfully ✅' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

module.exports = router;