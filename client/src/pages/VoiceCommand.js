import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/VoiceCommand.css';

function VoiceCommand() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Initialize Web Speech API
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert('Speech Recognition not supported in your browser');
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.start();
    setIsListening(true);

    recognition.onresult = (event) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript(transcript);
          handleVoiceCommand(transcript);
        } else {
          interimTranscript += transcript;
        }
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };
  };

  const handleVoiceCommand = (command) => {
    const cmd = command.toLowerCase();
    let result = '';

    if (cmd.includes('hello')) {
      result = 'Hello! Welcome to NotesNova.ai. How can I help you learn today?';
    } else if (cmd.includes('math')) {
      result = 'Great! Let me show you mathematics lessons. Which class are you in?';
    } else if (cmd.includes('science')) {
      result = 'Excellent choice! Science is fascinating. Let\'s explore together!';
    } else if (cmd.includes('time')) {
      result = `The current time is ${new Date().toLocaleTimeString()}`;
    } else if (cmd.includes('joke')) {
      result = 'Why did the student do multiplication problems on the floor? Because the teacher told them not to use tables!';
    } else {
      result = `I heard: "${command}". How can I assist you?`;
    }

    setResponse(result);
    speakResponse(result);
  };

  const speakResponse = (text) => {
    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 1;
    setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    synth.speak(utterance);
  };

  return (
    <motion.div
      className="voice-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <nav className="voice-navbar">
        <Link to="/" className="back-link">← Back</Link>
        <h1>🎤 Voice Command Learning</h1>
      </nav>

      <div className="voice-header">
        <h2>Talk to Your AI Tutor</h2>
        <p>Ask anything and get instant responses</p>
      </div>

      <div className="voice-main">
        <motion.div
          className={`microphone-button ${isListening ? 'listening' : ''}`}
          onClick={startListening}
          animate={isListening ? { scale: [1, 1.1, 1] } : {}}
          transition={{ duration: 0.6, repeat: isListening ? Infinity : 0 }}
        >
          <motion.div className="mic-icon">🎤</motion.div>
          <p>{isListening ? 'Listening...' : 'Tap to Speak'}</p>
        </motion.div>

        {isListening && (
          <motion.div
            className="sound-wave"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                className="wave"
                animate={{ scaleY: [1, 2, 1] }}
                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.1 }}
              />
            ))}
          </motion.div>
        )}
      </div>

      {transcript && (
        <motion.div
          className="transcript-box"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h4>You said:</h4>
          <p>{transcript}</p>
        </motion.div>
      )}

      {response && (
        <motion.div
          className="response-box"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h4>AI Tutor Says:</h4>
          <p>{response}</p>
          {isSpeaking && <div className="speaking-indicator">🔊 Speaking...</div>}
        </motion.div>
      )}

      <div className="voice-commands-help">
        <h3>💡 Try These Voice Commands:</h3>
        <div className="commands-grid">
          {['Hello', 'Math', 'Science', 'What time is it?', 'Tell me a joke', 'Show me notes'].map((cmd, idx) => (
            <motion.button
              key={idx}
              className="command-chip"
              onClick={() => {
                setTranscript(cmd);
                handleVoiceCommand(cmd);
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {cmd}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default VoiceCommand;