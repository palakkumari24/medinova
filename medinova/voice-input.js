// Voice Input Page Functionality

let recognition = null;
let isRecording = false;
let recordingStartTime = null;
let timerInterval = null;
let transcribedText = '';
let translatedText = '';

// Translation dictionary for common medical terms (Hindi to English)
const translationDictionary = {
  'hi': {
    'मुझे': 'I have',
    'बुखार': 'fever',
    'सिरदर्द': 'headache',
    'पेट दर्द': 'stomach pain',
    'खांसी': 'cough',
    'जुकाम': 'cold',
    'दर्द': 'pain',
    'कमजोरी': 'weakness',
    'चक्कर': 'dizziness',
    'उल्टी': 'vomiting',
    'दस्त': 'diarrhea',
    'सांस लेने में तकलीफ': 'breathing difficulty',
    'सीने में दर्द': 'chest pain',
    'बेचैनी': 'restlessness',
    'नींद न आना': 'insomnia',
    'दवा': 'medicine',
    'एलर्जी': 'allergy',
    'मधुमेह': 'diabetes',
    'उच्च रक्तचाप': 'high blood pressure',
    'दिल की बीमारी': 'heart disease'
  }
};

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  initializeVoiceRecognition();
  setupEventListeners();
  
  // Apply language on load
  if (typeof getCurrentLanguage === 'function' && typeof applyLanguage === 'function') {
    const currentLang = getCurrentLanguage();
    applyLanguage(currentLang);
  }
});

// Initialize Web Speech API
function initializeVoiceRecognition() {
  if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SpeechRecognition();
    
    recognition.continuous = true;
    recognition.interimResults = true;
    
    recognition.onstart = () => {
      isRecording = true;
      updateRecordingStatus(true);
      startTimer();
    };
    
    recognition.onresult = (event) => {
      let interimTranscript = '';
      let finalTranscript = '';
      
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' ';
        } else {
          interimTranscript += transcript;
        }
      }
      
      transcribedText = finalTranscript || interimTranscript;
      updateTranscriptionBox(transcribedText);
      
      if (finalTranscript) {
        translateText(finalTranscript.trim());
      }
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      showNotification('Speech recognition error: ' + event.error, 'error');
      stopRecording();
    };
    
    recognition.onend = () => {
      if (isRecording) {
        // Restart recognition if still recording
        try {
          recognition.start();
        } catch (e) {
          stopRecording();
        }
      }
    };
  } else {
    showNotification('Speech recognition is not supported in your browser. Please use Chrome or Edge.', 'error');
    document.getElementById('startRecording').disabled = true;
  }
}

// Setup event listeners
function setupEventListeners() {
  const startBtn = document.getElementById('startRecording');
  const stopBtn = document.getElementById('stopRecording');
  const clearBtn = document.getElementById('clearText');
  const fillBtn = document.getElementById('fillFromVoice');
  const languageSelect = document.getElementById('inputLanguage');
  const medicalForm = document.getElementById('medicalForm');
  
  if (startBtn) {
    startBtn.addEventListener('click', startRecording);
  }
  
  if (stopBtn) {
    stopBtn.addEventListener('click', stopRecording);
  }
  
  if (clearBtn) {
    clearBtn.addEventListener('click', clearAll);
  }
  
  if (fillBtn) {
    fillBtn.addEventListener('click', () => {
      fillFormFromVoice();
    });
  }
  
  if (languageSelect) {
    languageSelect.addEventListener('change', (e) => {
      if (recognition) {
        recognition.lang = e.target.value;
      }
    });
  }
  
  if (medicalForm) {
    medicalForm.addEventListener('submit', handleFormSubmit);
  }
}

// Start recording
function startRecording() {
  if (!recognition) {
    showNotification('Speech recognition not available', 'error');
    return;
  }
  
  const languageSelect = document.getElementById('inputLanguage');
  if (languageSelect && recognition) {
    recognition.lang = languageSelect.value;
  }
  
  try {
    recognition.start();
    transcribedText = '';
    translatedText = '';
    updateTranscriptionBox('');
    updateTranslationBox('');
  } catch (e) {
    console.error('Error starting recognition:', e);
    showNotification('Error starting voice recognition', 'error');
  }
}

// Stop recording
function stopRecording() {
  if (recognition && isRecording) {
    recognition.stop();
    isRecording = false;
    updateRecordingStatus(false);
    stopTimer();
    
    // Finalize translation if we have text
    if (transcribedText) {
      translateText(transcribedText);
    }
  }
}

// Update recording status
function updateRecordingStatus(recording) {
  const statusDiv = document.getElementById('recordingStatus');
  const startBtn = document.getElementById('startRecording');
  const stopBtn = document.getElementById('stopRecording');
  const timer = document.getElementById('recordingTimer');
  
  if (statusDiv) {
    if (recording) {
      statusDiv.classList.add('recording');
      statusDiv.querySelector('.status-icon').textContent = '🔴';
      statusDiv.querySelector('p').textContent = 'Recording...';
    } else {
      statusDiv.classList.remove('recording');
      statusDiv.querySelector('.status-icon').textContent = '🎤';
      statusDiv.querySelector('p').textContent = 'Ready to record';
    }
  }
  
  if (startBtn) {
    startBtn.disabled = recording;
    if (recording) {
      startBtn.classList.add('recording');
    } else {
      startBtn.classList.remove('recording');
    }
  }
  
  if (stopBtn) {
    stopBtn.disabled = !recording;
  }
  
  if (timer) {
    timer.style.display = recording ? 'block' : 'none';
  }
}

// Start timer
function startTimer() {
  recordingStartTime = Date.now();
  timerInterval = setInterval(() => {
    const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    const timerDisplay = document.getElementById('timerDisplay');
    if (timerDisplay) {
      timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
  }, 1000);
}

// Stop timer
function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
  recordingStartTime = null;
  const timerDisplay = document.getElementById('timerDisplay');
  if (timerDisplay) {
    timerDisplay.textContent = '00:00';
  }
}

// Update transcription box
function updateTranscriptionBox(text) {
  const box = document.getElementById('transcriptionBox');
  if (!box) return;
  
  if (text.trim()) {
    box.classList.add('has-text');
    box.innerHTML = `<p>${escapeHtml(text)}</p>`;
  } else {
    box.classList.remove('has-text');
    box.innerHTML = '<p class="placeholder-text">Your transcribed text will appear here...</p>';
  }
}

// Update translation box
function updateTranslationBox(text) {
  const box = document.getElementById('translationBox');
  if (!box) return;
  
  if (text.trim()) {
    box.classList.add('has-text');
    box.innerHTML = `<p>${escapeHtml(text)}</p>`;
  } else {
    box.classList.remove('has-text');
    box.innerHTML = '<p class="placeholder-text">Translated text will appear here...</p>';
  }
}

// Translate text
function translateText(text) {
  if (!text.trim()) return;
  
  const languageSelect = document.getElementById('inputLanguage');
  const selectedLang = languageSelect ? languageSelect.value.split('-')[0] : 'en';
  
  // If already English, no translation needed
  if (selectedLang === 'en') {
    translatedText = text;
    updateTranslationBox(translatedText);
    return;
  }
  
  // Simulate translation (in real app, this would call a translation API)
  // For demo, we'll use a simple word replacement for Hindi
  let translated = text;
  
  if (selectedLang === 'hi' && translationDictionary.hi) {
    // Simple word replacement for demo
    Object.keys(translationDictionary.hi).forEach(hindiWord => {
      const regex = new RegExp(hindiWord, 'gi');
      translated = translated.replace(regex, translationDictionary.hi[hindiWord]);
    });
  }
  
  // In a real application, you would call a translation API like Google Translate API
  // For now, we'll show a message that translation is in progress
  translatedText = translated;
  
  // Simulate API delay
  setTimeout(() => {
    // If translation didn't change much, show original with note
    if (translated === text && selectedLang !== 'en') {
      translatedText = `[Translation: ${text}] - Note: Full translation requires API integration`;
    }
    updateTranslationBox(translatedText);
  }, 500);
}

// Fill form from voice input
function fillFormFromVoice() {
  if (!translatedText.trim()) {
    showNotification('No translated text available. Please record and translate first.', 'error');
    return;
  }
  
  // Simple keyword matching to fill form fields
  const text = translatedText.toLowerCase();
  
  // Fill symptoms
  const symptomsField = document.getElementById('symptoms');
  if (symptomsField && !symptomsField.value.trim()) {
    if (text.includes('fever') || text.includes('headache') || text.includes('pain') || 
        text.includes('cough') || text.includes('cold') || text.includes('weakness')) {
      symptomsField.value = translatedText;
    }
  }
  
  // Fill medications
  const medicationsField = document.getElementById('medications');
  if (medicationsField && !medicationsField.value.trim()) {
    if (text.includes('medicine') || text.includes('medication') || text.includes('taking')) {
      medicationsField.value = translatedText;
    }
  }
  
  // Fill allergies
  const allergiesField = document.getElementById('allergies');
  if (allergiesField && !allergiesField.value.trim()) {
    if (text.includes('allergy') || text.includes('allergic')) {
      allergiesField.value = translatedText;
    }
  }
  
  // Fill medical history
  const medicalHistoryField = document.getElementById('medicalHistory');
  if (medicalHistoryField && !medicalHistoryField.value.trim()) {
    if (text.includes('diabetes') || text.includes('blood pressure') || text.includes('heart') || 
        text.includes('disease') || text.includes('history')) {
      medicalHistoryField.value = translatedText;
    }
  }
  
  // If no specific field matched, fill symptoms by default
  if (symptomsField && !symptomsField.value.trim()) {
    symptomsField.value = translatedText;
  }
  
  showNotification('Form fields filled from voice input!', 'success');
}

// Clear all text
function clearAll() {
  transcribedText = '';
  translatedText = '';
  updateTranscriptionBox('');
  updateTranslationBox('');
  
  // Clear form
  const form = document.getElementById('medicalForm');
  if (form) {
    form.reset();
  }
  
  showNotification('All text cleared', 'info');
}

// Handle form submit
function handleFormSubmit(e) {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const data = {
    symptoms: formData.get('symptoms'),
    medications: formData.get('medications'),
    allergies: formData.get('allergies'),
    medicalHistory: formData.get('medicalHistory')
  };
  
  // In real app, send to backend
  console.log('Medical form data:', data);
  
  showNotification('Medical information submitted successfully!', 'success');
  
  // Reset form after delay
  setTimeout(() => {
    e.target.reset();
    clearAll();
  }, 2000);
}

// Escape HTML
function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
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
    max-width: 400px;
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
