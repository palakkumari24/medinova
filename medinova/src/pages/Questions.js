import React, { useState, useEffect } from 'react';
import '../style.css';
import '../App.css';
import '../questions.css';

const Questions = () => {
  const [questions, setQuestions] = useState([]);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [sortType, setSortType] = useState('votes');
  const [userVotes, setUserVotes] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    loadQuestions();
    loadUserVotes();
  }, []);

  const loadQuestions = () => {
    const saved = localStorage.getItem('questions');
    if (saved) {
      const allQuestions = JSON.parse(saved);
      setQuestions(allQuestions.filter(q => !q.answered));
      setAnsweredQuestions(allQuestions.filter(q => q.answered && q.answer));
    } else {
      // Sample questions
      const sampleQuestions = [
        {
          id: 1,
          text: "What are the early signs of heart disease that I should watch out for?",
          category: "cardiology",
          votes: 45,
          author: "RK",
          authorName: "Rajesh Kumar",
          date: "2024-01-15",
          answered: false
        },
        {
          id: 2,
          text: "How can I improve my skin health naturally?",
          category: "dermatology",
          votes: 32,
          author: "PS",
          authorName: "Priya Sharma",
          date: "2024-01-14",
          answered: false
        },
        {
          id: 3,
          text: "What is the recommended daily water intake for adults?",
          category: "general",
          votes: 28,
          author: "AS",
          authorName: "Amit Singh",
          date: "2024-01-13",
          answered: true,
          answer: {
            doctor: "Dr. Sarah Johnson",
            doctorInitials: "SJ",
            specialization: "General Medicine",
            text: "The general recommendation is 8-10 glasses (about 2-2.5 liters) of water per day for adults. However, this can vary based on activity level, climate, and individual health conditions. It's best to drink water throughout the day and listen to your body's thirst signals."
          }
        }
      ];
      setQuestions(sampleQuestions.filter(q => !q.answered));
      setAnsweredQuestions(sampleQuestions.filter(q => q.answered && q.answer));
      localStorage.setItem('questions', JSON.stringify(sampleQuestions));
    }
  };

  const loadUserVotes = () => {
    const saved = localStorage.getItem('userVotes');
    if (saved) {
      setUserVotes(JSON.parse(saved));
    }
  };

  const handleVote = (questionId) => {
    const updatedQuestions = questions.map(q => {
      if (q.id === questionId) {
        const isVoted = userVotes.includes(questionId);
        return {
          ...q,
          votes: isVoted ? q.votes - 1 : q.votes + 1
        };
      }
      return q;
    });

    const updatedVotes = userVotes.includes(questionId)
      ? userVotes.filter(id => id !== questionId)
      : [...userVotes, questionId];

    setQuestions(updatedQuestions);
    setUserVotes(updatedVotes);
    localStorage.setItem('userVotes', JSON.stringify(updatedVotes));
    
    // Save updated questions
    const allQuestions = [...updatedQuestions, ...answeredQuestions];
    localStorage.setItem('questions', JSON.stringify(allQuestions));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!questionText.trim() || !category) return;

    const newQuestion = {
      id: Date.now(),
      text: questionText,
      category: category,
      votes: 0,
      author: 'U' + Math.floor(Math.random() * 100),
      authorName: 'You',
      date: new Date().toISOString().split('T')[0],
      answered: false
    };

    const updatedQuestions = [newQuestion, ...questions];
    setQuestions(updatedQuestions);
    
    const allQuestions = [...updatedQuestions, ...answeredQuestions];
    localStorage.setItem('questions', JSON.stringify(allQuestions));

    setQuestionText('');
    setCategory('');
  };

  const getCategoryName = (cat) => {
    const categories = {
      general: 'General Health',
      cardiology: 'Cardiology',
      dermatology: 'Dermatology',
      neurology: 'Neurology',
      pediatrics: 'Pediatrics',
      orthopedics: 'Orthopedics',
      other: 'Other'
    };
    return categories[cat] || cat;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const sortedQuestions = [...questions].sort((a, b) => {
    if (sortType === 'votes') return b.votes - a.votes;
    if (sortType === 'recent') return new Date(b.date) - new Date(a.date);
    return 0;
  });

  return (
    <>
      {/* Hero Section */}
      <section className="questions-hero">
        <div className="questions-hero-content">
          <h1>Ask Your Health Questions</h1>
          <p>
            Get answers from verified doctors. Ask questions, vote for important ones, and get expert medical advice.
          </p>
        </div>
      </section>

      {/* Question Submission Form */}
      <section className="question-form-section">
        <div className="question-form-container">
          <h2>Ask a Question</h2>
          <form onSubmit={handleSubmit} className="question-form">
            <div className="form-group">
              <label htmlFor="questionText">Your Question</label>
              <textarea
                id="questionText"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                rows="4"
                placeholder="Type your health-related question here..."
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="questionCategory">Category</label>
              <select
                id="questionCategory"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category</option>
                <option value="general">General Health</option>
                <option value="cardiology">Cardiology</option>
                <option value="dermatology">Dermatology</option>
                <option value="neurology">Neurology</option>
                <option value="pediatrics">Pediatrics</option>
                <option value="orthopedics">Orthopedics</option>
                <option value="other">Other</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary">Submit Question</button>
          </form>
        </div>
      </section>

      {/* Top Questions Section */}
      <section className="top-questions-section">
        <div className="top-questions-container">
          <div className="section-header">
            <h2>Top Questions</h2>
            <div className="sort-options">
              <button
                className={`sort-btn ${sortType === 'votes' ? 'active' : ''}`}
                onClick={() => setSortType('votes')}
              >
                Most Voted
              </button>
              <button
                className={`sort-btn ${sortType === 'recent' ? 'active' : ''}`}
                onClick={() => setSortType('recent')}
              >
                Most Recent
              </button>
            </div>
          </div>
          <div className="questions-list">
            {sortedQuestions.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">❓</div>
                <h3>No questions yet</h3>
                <p>Be the first to ask a question!</p>
              </div>
            ) : (
              sortedQuestions.map(question => (
                <div key={question.id} className="question-card">
                  <div className="question-header">
                    <div className="question-content">
                      <p className="question-text">{question.text}</p>
                      <div className="question-meta">
                        <span className="question-category">{getCategoryName(question.category)}</span>
                        <span className="question-date">{formatDate(question.date)}</span>
                      </div>
                    </div>
                    <div className="vote-section">
                      <button
                        className={`vote-btn ${userVotes.includes(question.id) ? 'voted' : ''}`}
                        onClick={() => handleVote(question.id)}
                      >
                        {userVotes.includes(question.id) ? '✓' : '↑'}
                      </button>
                      <span className="vote-count">{question.votes}</span>
                    </div>
                  </div>
                  <div className="question-footer">
                    <div className="question-author">
                      <div className="author-avatar-small">{question.author}</div>
                      <span>{question.authorName}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Answered Questions Section */}
      <section className="answered-questions-section">
        <div className="answered-questions-container">
          <h2>Answered by Verified Doctors</h2>
          <div className="answered-questions-list">
            {answeredQuestions.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">💬</div>
                <h3>No answered questions yet</h3>
                <p>Top voted questions will be answered by verified doctors.</p>
              </div>
            ) : (
              answeredQuestions.map(question => (
                <div key={question.id} className="answered-question-card">
                  <div className="answered-question-header">
                    <p className="answered-question-text">{question.text}</p>
                    <div className="question-meta">
                      <span className="question-category">{getCategoryName(question.category)}</span>
                      <span className="question-date">{formatDate(question.date)}</span>
                      <span className="vote-count">👍 {question.votes} votes</span>
                    </div>
                  </div>
                  <div className="doctor-answer">
                    <div className="doctor-info">
                      <div className="doctor-avatar-verified">{question.answer.doctorInitials}</div>
                      <div className="doctor-details">
                        <h4>{question.answer.doctor} <span className="verified-badge">✓ Verified</span></h4>
                        <p>{question.answer.specialization}</p>
                      </div>
                    </div>
                    <p className="answer-text">{question.answer.text}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Questions;
