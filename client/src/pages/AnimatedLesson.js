import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/AnimatedLesson.css';

function AnimatedLesson() {
  const location = useLocation();
  const { subject, chapter } = location.state || {};
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  // Sample animated lesson content
  const lessonContent = [
    {
      title: 'Introduction to the Topic',
      description: 'Let\'s start with the basics and understand the fundamental concepts',
      animation: '🎓',
      color: '#667eea'
    },
    {
      title: 'Key Concepts',
      description: 'These are the most important points you need to remember',
      animation: '💡',
      color: '#764ba2'
    },
    {
      title: 'Real-World Examples',
      description: 'See how this concept applies in real life situations',
      animation: '🌍',
      color: '#f093fb'
    },
    {
      title: 'Practice Problems',
      description: 'Try these problems to test your understanding',
      animation: '📝',
      color: '#4facfe'
    }
  ];

  return (
    <motion.div
      className="animated-lesson-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <nav className="lesson-navbar">
        <Link to="/subjects" className="back-link">← Back to Subjects</Link>
        <h1>📖 Animated Learning</h1>
      </nav>

      <div className="lesson-header">
        <h2>{subject || 'Lesson'}</h2>
        <p className="lesson-subtitle">{chapter || 'Chapter'}</p>
      </div>

      <div className="lesson-player">
        <motion.div
          className="animation-display"
          style={{ background: `linear-gradient(135deg, ${lessonContent[currentPage].color} 0%, #764ba2 100%)` }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="animation-emoji"
            animate={{ rotate: 360, y: [0, -20, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            {lessonContent[currentPage].animation}
          </motion.div>
        </motion.div>

        <div className="lesson-content">
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            key={currentPage}
          >
            {lessonContent[currentPage].title}
          </motion.h3>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            key={`desc-${currentPage}`}
          >
            {lessonContent[currentPage].description}
          </motion.p>
        </div>
      </div>

      <div className="lesson-controls">
        <motion.button
          className="control-btn prev"
          onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
          disabled={currentPage === 0}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          ← Previous
        </motion.button>

        <motion.button
          className="control-btn play"
          onClick={() => setIsPlaying(!isPlaying)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          {isPlaying ? '⏸️ Pause' : '▶️ Play'}
        </motion.button>

        <motion.button
          className="control-btn next"
          onClick={() => setCurrentPage(Math.min(lessonContent.length - 1, currentPage + 1))}
          disabled={currentPage === lessonContent.length - 1}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Next →
        </motion.button>
      </div>

      <div className="progress-bar">
        {lessonContent.map((_, idx) => (
          <motion.div
            key={idx}
            className={`progress-dot ${idx === currentPage ? 'active' : ''}`}
            onClick={() => setCurrentPage(idx)}
            whileHover={{ scale: 1.2 }}
          />
        ))}
      </div>
    </motion.div>
  );
}

export default AnimatedLesson;