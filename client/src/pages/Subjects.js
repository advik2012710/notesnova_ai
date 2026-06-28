import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Subjects.css';

function Subjects() {
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');

  const subjects = {
    1: ['English', 'Math', 'Science', 'Social Studies'],
    2: ['English', 'Math', 'Science', 'Social Studies'],
    3: ['English', 'Math', 'Science', 'Social Studies', 'Computer'],
    4: ['English', 'Math', 'Science', 'Social Studies', 'Computer'],
    5: ['English', 'Math', 'Science', 'Social Studies', 'Computer', 'Hindi'],
    6: ['English', 'Math', 'Science', 'Social Studies', 'Computer', 'Hindi', 'History'],
    7: ['English', 'Math', 'Science', 'Social Studies', 'Computer', 'Hindi', 'History', 'Geography'],
    8: ['English', 'Math', 'Science', 'Social Studies', 'Computer', 'Hindi', 'History', 'Geography'],
    9: ['English', 'Math', 'Science', 'Social Studies', 'Computer', 'Hindi', 'History', 'Chemistry', 'Physics'],
    10: ['English', 'Math', 'Science', 'Social Studies', 'Computer', 'Hindi', 'History', 'Chemistry', 'Physics', 'Biology'],
    11: ['English', 'Math', 'Science', 'Computer', 'Chemistry', 'Physics', 'Biology', 'Economics', 'Accountancy'],
    12: ['English', 'Math', 'Science', 'Computer', 'Chemistry', 'Physics', 'Biology', 'Economics', 'Accountancy', 'Psychology']
  };

  const subjectEmojis = {
    'English': '📚',
    'Math': '🔢',
    'Science': '🔬',
    'Social Studies': '🌍',
    'Computer': '💻',
    'Hindi': '🇮🇳',
    'History': '🏛️',
    'Geography': '🗺️',
    'Chemistry': '⚗️',
    'Physics': '⚡',
    'Biology': '🧬',
    'Economics': '💰',
    'Accountancy': '📊',
    'Psychology': '🧠'
  };

  return (
    <motion.div
      className="subjects-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <nav className="subjects-navbar">
        <Link to="/" className="back-link">← Back</Link>
        <h1>📚 Learning Path</h1>
      </nav>

      <div className="subjects-header">
        <h2>Select Your Class & Subject</h2>
        <p>Choose what you want to learn today</p>
      </div>

      <div className="selection-container">
        <motion.div
          className="class-selector"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3>Select Class</h3>
          <div className="class-grid">
            {[...Array(12)].map((_, i) => (
              <motion.button
                key={i + 1}
                className={`class-btn ${selectedClass === i + 1 ? 'active' : ''}`}
                onClick={() => {
                  setSelectedClass(i + 1);
                  setSelectedSubject('');
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {i + 1}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {selectedClass && (
          <motion.div
            className="subject-selector"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <h3>Select Subject</h3>
            <div className="subject-grid">
              {subjects[selectedClass]?.map((subject, idx) => (
                <motion.button
                  key={subject}
                  className={`subject-btn ${selectedSubject === subject ? 'active' : ''}`}
                  onClick={() => setSelectedSubject(subject)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <span className="emoji">{subjectEmojis[subject]}</span>
                  <span>{subject}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {selectedSubject && (
        <motion.div
          className="action-buttons"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <motion.button
            className="btn-animated-lessons"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            ✨ View Animated Lessons
          </motion.button>
          <motion.button
            className="btn-voice-learn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎤 Voice Learning
          </motion.button>
          <motion.button
            className="btn-quiz"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎯 Take Quiz
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  );
}

export default Subjects;