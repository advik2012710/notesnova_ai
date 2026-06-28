import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import '../styles/Dashboard.css';

function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  useEffect(() => {
    fetchNotes();
  }, [selectedClass, selectedSubject]);

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedClass) params.append('class', selectedClass);
      if (selectedSubject) params.append('subject', selectedSubject);

      const response = await axios.get(`/api/notes?${params.toString()}`);
      setNotes(response.data);
    } catch (error) {
      console.error('Error fetching notes:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="dashboard-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <header className="dashboard-header">
        <h1>📚 NotesNova.ai Dashboard</h1>
        <p>Explore premium notes for your class</p>
      </header>

      <div className="filters">
        <select
          value={selectedClass}
          onChange={(e) => setSelectedClass(e.target.value)}
          className="filter-select"
        >
          <option value="">All Classes</option>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((cls) => (
            <option key={cls} value={cls}>
              Class {cls}
            </option>
          ))}
        </select>

        <select
          value={selectedSubject}
          onChange={(e) => setSelectedSubject(e.target.value)}
          className="filter-select"
        >
          <option value="">All Subjects</option>
          <option value="Math">Math</option>
          <option value="Science">Science</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi</option>
          <option value="Social Studies">Social Studies</option>
          <option value="Computer">Computer</option>
        </select>
      </div>

      <div className="notes-grid">
        {loading ? (
          <div className="loading">Loading notes...</div>
        ) : notes.length === 0 ? (
          <div className="no-notes">No notes found. Try different filters!</div>
        ) : (
          notes.map((note, index) => (
            <motion.div
              key={note._id}
              className="note-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="note-header">
                <h3>{note.title}</h3>
                <span className="note-class">Class {note.class}</span>
              </div>
              <p className="note-subject">{note.subject}</p>
              <p className="note-description">{note.description}</p>
              {note.chapter && <p className="note-chapter">Chapter: {note.chapter}</p>}
              <div className="note-footer">
                <span className="rating">⭐ {note.rating}/5</span>
                <span className="downloads">📥 {note.downloads}</span>
              </div>
              <motion.button
                className="btn-view"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Note
              </motion.button>
            </motion.div>
          ))
        )}
      </div>
    </motion.div>
  );
}

export default Dashboard;