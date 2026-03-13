// Questions Page Functionality

// Sample questions data (in real app, this would come from a backend)
let questions = [
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
  },
  {
    id: 4,
    text: "Is it safe to exercise with high blood pressure?",
    category: "cardiology",
    votes: 38,
    author: "MK",
    authorName: "Mohan Kumar",
    date: "2024-01-12",
    answered: true,
    answer: {
      doctor: "Dr. Ramesh Patel",
      doctorInitials: "RP",
      specialization: "Cardiology",
      text: "Yes, regular exercise is generally safe and beneficial for people with high blood pressure. However, it's important to consult with your doctor first. Start with low to moderate intensity activities like walking, swimming, or cycling. Avoid high-intensity exercises initially and monitor your blood pressure regularly."
    }
  }
];

// User's voted questions (stored in localStorage)
let userVotes = JSON.parse(localStorage.getItem('userVotes')) || [];

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
  loadQuestions();
  loadUserVotes();
  renderQuestions();
  renderAnsweredQuestions();
  setupEventListeners();
  
  // Apply language on load
  if (typeof getCurrentLanguage === 'function' && typeof applyLanguage === 'function') {
    const currentLang = getCurrentLanguage();
    applyLanguage(currentLang);
  }
});

// Setup event listeners
function setupEventListeners() {
  // Question form submission
  const questionForm = document.getElementById('questionForm');
  if (questionForm) {
    questionForm.addEventListener('submit', handleQuestionSubmit);
  }

  // Sort buttons
  const sortButtons = document.querySelectorAll('.sort-btn');
  sortButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      sortButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sortType = btn.dataset.sort;
      sortQuestions(sortType);
    });
  });
}

// Handle question form submission
function handleQuestionSubmit(e) {
  e.preventDefault();
  
  const questionText = document.getElementById('questionText').value.trim();
  const category = document.getElementById('questionCategory').value;
  
  if (!questionText || !category) {
    showNotification('Please fill in all fields', 'error');
    return;
  }

  // Create new question
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

  // Add to questions array
  questions.unshift(newQuestion);
  
  // Save to localStorage (in real app, send to backend)
  saveQuestions();
  
  // Re-render questions
  renderQuestions();
  
  // Reset form
  e.target.reset();
  
  showNotification('Question submitted successfully!', 'success');
  
  // Scroll to questions list
  document.getElementById('questionsList').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Render questions list
function renderQuestions() {
  const questionsList = document.getElementById('questionsList');
  if (!questionsList) return;

  // Filter out answered questions
  const unansweredQuestions = questions.filter(q => !q.answered);
  
  if (unansweredQuestions.length === 0) {
    questionsList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">❓</div>
        <h3>No questions yet</h3>
        <p>Be the first to ask a question!</p>
      </div>
    `;
    return;
  }

  questionsList.innerHTML = unansweredQuestions.map(question => `
    <div class="question-card" data-id="${question.id}">
      <div class="question-header">
        <div class="question-content">
          <p class="question-text">${question.text}</p>
          <div class="question-meta">
            <span class="question-category">${getCategoryName(question.category)}</span>
            <span class="question-date">${formatDate(question.date)}</span>
          </div>
        </div>
        <div class="vote-section">
          <button class="vote-btn ${userVotes.includes(question.id) ? 'voted' : ''}" 
                  data-question-id="${question.id}"
                  onclick="handleVote(${question.id})">
            ${userVotes.includes(question.id) ? '✓' : '↑'}
          </button>
          <span class="vote-count">${question.votes}</span>
        </div>
      </div>
      <div class="question-footer">
        <div class="question-author">
          <div class="author-avatar-small">${question.author}</div>
          <span>${question.authorName}</span>
        </div>
      </div>
    </div>
  `).join('');
}

// Render answered questions
function renderAnsweredQuestions() {
  const answeredList = document.getElementById('answeredQuestionsList');
  if (!answeredList) return;

  const answeredQuestions = questions.filter(q => q.answered && q.answer);
  
  if (answeredQuestions.length === 0) {
    answeredList.innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">💬</div>
        <h3>No answered questions yet</h3>
        <p>Top voted questions will be answered by verified doctors.</p>
      </div>
    `;
    return;
  }

  answeredList.innerHTML = answeredQuestions.map(question => `
    <div class="answered-question-card">
      <div class="answered-question-header">
        <p class="answered-question-text">${question.text}</p>
        <div class="question-meta">
          <span class="question-category">${getCategoryName(question.category)}</span>
          <span class="question-date">${formatDate(question.date)}</span>
          <span class="vote-count">👍 ${question.votes} votes</span>
        </div>
      </div>
      <div class="doctor-answer">
        <div class="doctor-info">
          <div class="doctor-avatar-verified">${question.answer.doctorInitials}</div>
          <div class="doctor-details">
            <h4>${question.answer.doctor} <span class="verified-badge">✓ Verified</span></h4>
            <p>${question.answer.specialization}</p>
          </div>
        </div>
        <p class="answer-text">${question.answer.text}</p>
      </div>
    </div>
  `).join('');
}

// Handle vote
function handleVote(questionId) {
  const question = questions.find(q => q.id === questionId);
  if (!question) return;

  const voteIndex = userVotes.indexOf(questionId);
  
  if (voteIndex > -1) {
    // Unvote
    userVotes.splice(voteIndex, 1);
    question.votes = Math.max(0, question.votes - 1);
  } else {
    // Vote
    userVotes.push(questionId);
    question.votes += 1;
  }

  // Save to localStorage
  localStorage.setItem('userVotes', JSON.stringify(userVotes));
  saveQuestions();
  
  // Re-render
  renderQuestions();
  
  // Check if question should be moved to answered (if votes >= threshold)
  if (question.votes >= 30 && !question.answered) {
    // In real app, this would trigger notification to doctors
    showNotification('This question has reached high votes! Doctors will review it soon.', 'info');
  }
}

// Sort questions
function sortQuestions(sortType) {
  const unansweredQuestions = questions.filter(q => !q.answered);
  
  switch(sortType) {
    case 'votes':
      unansweredQuestions.sort((a, b) => b.votes - a.votes);
      break;
    case 'recent':
      unansweredQuestions.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'answered':
      // This would show answered questions, but we filter them out
      break;
  }
  
  // Temporarily update questions order
  const answeredQuestions = questions.filter(q => q.answered);
  questions = [...unansweredQuestions, ...answeredQuestions];
  
  renderQuestions();
}

// Get category name
function getCategoryName(category) {
  const categories = {
    general: 'General Health',
    cardiology: 'Cardiology',
    dermatology: 'Dermatology',
    neurology: 'Neurology',
    pediatrics: 'Pediatrics',
    orthopedics: 'Orthopedics',
    other: 'Other'
  };
  return categories[category] || category;
}

// Format date
function formatDate(dateString) {
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

// Save questions to localStorage
function saveQuestions() {
  localStorage.setItem('questions', JSON.stringify(questions));
}

// Load questions from localStorage
function loadQuestions() {
  const saved = localStorage.getItem('questions');
  if (saved) {
    questions = JSON.parse(saved);
  }
}

// Load user votes
function loadUserVotes() {
  const saved = localStorage.getItem('userVotes');
  if (saved) {
    userVotes = JSON.parse(saved);
  }
}

// Notification function
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button type="button">&times;</button>
    </div>
  `;

  const bgColor = type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6';
  
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${bgColor};
    color: #fff;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    z-index: 1001;
    animation: slideInRight 0.3s ease;
  `;

  const closeButton = notification.querySelector('button');
  closeButton.addEventListener('click', () => notification.remove());

  document.body.appendChild(notification);

  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

// Initialize on load
loadQuestions();
loadUserVotes();
