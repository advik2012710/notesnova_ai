import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Clock.css';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const timeZones = [
    { name: 'New York', zone: 'America/New_York', emoji: '🗽', offset: 'UTC-5' },
    { name: 'London', zone: 'Europe/London', emoji: '🇬🇧', offset: 'UTC+0' },
    { name: 'Tokyo', zone: 'Asia/Tokyo', emoji: '🗾', offset: 'UTC+9' },
    { name: 'Dubai', zone: 'Asia/Dubai', emoji: '🌆', offset: 'UTC+4' },
    { name: 'Sydney', zone: 'Australia/Sydney', emoji: '🦘', offset: 'UTC+11' },
    { name: 'Mumbai', zone: 'Asia/Kolkata', emoji: '🇮🇳', offset: 'UTC+5:30' },
    { name: 'Los Angeles', zone: 'America/Los_Angeles', emoji: '🌴', offset: 'UTC-8' },
    { name: 'Singapore', zone: 'Asia/Singapore', emoji: '🇸🇬', offset: 'UTC+8' },
    { name: 'Paris', zone: 'Europe/Paris', emoji: '🗼', offset: 'UTC+1' },
    { name: 'Toronto', zone: 'America/Toronto', emoji: '🍁', offset: 'UTC-5' },
    { name: 'Mexico City', zone: 'America/Mexico_City', emoji: '🌮', offset: 'UTC-6' },
    { name: 'Bangkok', zone: 'Asia/Bangkok', emoji: '🇹🇭', offset: 'UTC+7' },
  ];

  const getTimeInZone = (zone) => {
    return new Date(time.toLocaleString('en-US', { timeZone: zone }));
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <motion.div
      className="clock-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <nav className="clock-navbar">
        <Link to="/" className="back-link">← Back to Home</Link>
        <h1>🕐 NotesNova World Clock</h1>
      </nav>

      <div className="clock-header">
        <h2>Check the time across the globe</h2>
        <p>Real-time synchronized world clock</p>
      </div>

      <motion.div
        className="main-clock"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <div className="clock-display">
          <div className="time-large">
            {time.toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
              hour12: true,
            })}
          </div>
          <div className="date-display">
            {time.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </div>
        </div>
      </motion.div>

      <div className="timezone-grid">
        {timeZones.map((tz, index) => {
          const tzTime = getTimeInZone(tz.zone);
          return (
            <motion.div
              key={tz.zone}
              className="timezone-card"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * index, duration: 0.5 }}
              whileHover={{ y: -10, transition: { duration: 0.2 } }}
            >
              <div className="tz-emoji">{tz.emoji}</div>
              <div className="tz-name">{tz.name}</div>
              <div className="tz-time">{formatTime(tzTime)}</div>
              <div className="tz-date">{formatDate(tzTime)}</div>
              <div className="tz-offset">{tz.offset}</div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

export default Clock;