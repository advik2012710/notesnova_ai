import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import '../styles/Quiz.css';

function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const quizData = [
    {
      question: 'What is the capital of India?',
      options: ['Mumbai', 'New Delhi', 'Kolkata', 'Chennai'],
      correct: 1,
      emoji: '🇮🇳'
    },
    {
      question: 'What is 2 + 2?',
      options: ['3', '4', '5', '6'],
      correct: 1,
      emoji: '🔢'
    },
    {
      question: 'What is the powerhouse of the cell?',
      options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Chloroplast'],
      correct: 1,
      emoji: '🧬'
    },
    {
      question: 'Who wrote Romeo and Juliet?',
      options: ['Jane Austen', 'William Shakespeare', 'Charles Dickens', 'Mark Twain'],
      correct: 1,
      emoji: '📚'
    },
    {
      question: 'What is the fastest land animal?',
      options: ['Lion', 'Cheetah', 'Horse', 'Gazelle'],
      correct: 1,
      emoji: '🐆'
    }
  ];

  const handleAnswerClick = (index) => {
    setSelectedAnswer(index);
    setAnswered(true);

    if (index === quizData[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
      setAnswered(false);
      setSelectedAnswer(null);
    } else {
      setShowScore(true);
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setAnswered(false);
    setSelectedAnswer(null);
  };

  return (
    <motion.div
      className="quiz-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <nav className="quiz-navbar">
        <Link to="/" className="back-link">← Back</Link>
        <h1>🎯 Knowledge Quiz</h1>
      </nav>

      {showScore ? (
        <motion.div
          className="score-section"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="score-circle">
            <motion.div
              className="score-text"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <span className="final-score">{score}</span>
              <span className="total-questions">/ {quizData.length}</span>
            </motion.div>
          </div>
          <h2>Quiz Complete! 🎉</h2>
          <p className="result-message">
            {score === quizData.length
              ? '🏆 Perfect Score! You\'re a genius!'
              : score >= quizData.length * 0.8
              ? '🌟 Excellent work! Keep it up!'
              : score >= quizData.length * 0.5
              ? '👍 Good effort! Practice more!'
              : '💪 Keep learning! You\'ll improve!'}
          </p>
          <motion.button
            className="restart-btn"
            onClick={resetQuiz}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Try Again
          </motion.button>
        </motion.div>
      ) : (
        <motion.div
          className="quiz-section"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="quiz-header">
            <div className="progress">
              <span className="current">{currentQuestion + 1}</span>
              <span className="total">/ {quizData.length}</span>
            </div>
            <div className="progress-bar-full">
              <motion.div
                className="progress-bar-fill"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestion + 1) / quizData.length) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>

          <motion.div
            className="question-section"
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="question-emoji">{quizData[currentQuestion].emoji}</div>
            <h2 className="question-text">{quizData[currentQuestion].question}</h2>

            <div className="options">
              {quizData[currentQuestion].options.map((option, index) => (
                <motion.button
                  key={index}
                  className={`option-btn ${
                    selectedAnswer === index
                      ? index === quizData[currentQuestion].correct
                        ? 'correct'
                        : 'incorrect'
                      : answered && index === quizData[currentQuestion].correct
                      ? 'correct'
                      : ''
                  }`}
                  onClick={() => handleAnswerClick(index)}
                  disabled={answered}
                  whileHover={{ scale: answered ? 1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  {option}
                </motion.button>
              ))}
            </div>
          </motion.div>

          {answered && (
            <motion.div
              className="feedback"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {selectedAnswer === quizData[currentQuestion].correct ? (
                <p className="correct-feedback">✅ Correct Answer!</p>
              ) : (
                <p className="incorrect-feedback">❌ Wrong! The correct answer is: {quizData[currentQuestion].options[quizData[currentQuestion].correct]}</p>
              )}
              <motion.button
                className="next-btn"
                onClick={handleNext}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {currentQuestion === quizData.length - 1 ? 'See Results' : 'Next Question'}
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

export default Quiz;