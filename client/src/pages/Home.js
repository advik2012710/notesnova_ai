import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Home.css';

function Home() {
  return (
    <motion.div
      className="home-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <nav className="navbar">
        <div className="nav-brand">
          <h1>🚀 NotesNova.ai</h1>
        </div>
        <div className="nav-links">
          <Link to="/clock" className="btn-clock">🕐 World Clock</Link>
          <Link to="/login" className="btn-login">Login</Link>
          <Link to="/register" className="btn-register">Sign Up</Link>
        </div>
      </nav>

      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <h2>Your Premium Notes Platform</h2>
          <p>Access 4K premium notes for Classes 1-12</p>
          <p className="subtitle">Share, Learn, and Excel Together 📚✨</p>
          
          <motion.div
            className="cta-buttons"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <Link to="/register" className="btn-primary">Get Started</Link>
            <Link to="/login" className="btn-secondary">Explore Notes</Link>
          </motion.div>
        </motion.div>

        <motion.div
          className="hero-image"
          animate={{ y: [0, 20, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <div className="floating-card">📝</div>
        </motion.div>
      </section>

      <section className="features">
        <motion.div
          className="feature-card"
          whileHover={{ y: -10 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="feature-icon">🎨</div>
          <h3>4K Quality</h3>
          <p>Premium high-quality notes with beautiful formatting</p>
        </motion.div>

        <motion.div
          className="feature-card"
          whileHover={{ y: -10 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="feature-icon">⚡</div>
          <h3>Fast & Smooth</h3>
          <p>Animated interface for seamless browsing experience</p>
        </motion.div>

        <motion.div
          className="feature-card"
          whileHover={{ y: -10 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="feature-icon">🎓</div>
          <h3>Class 1-12</h3>
          <p>Notes for all classes with multiple subjects</p>
        </motion.div>

        <motion.div
          className="feature-card"
          whileHover={{ y: -10 }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="feature-icon">🤖</div>
          <h3>AI Powered</h3>
          <p>Smart search and personalized recommendations</p>
        </motion.div>
      </section>
    </motion.div>
  );
}

export default Home;