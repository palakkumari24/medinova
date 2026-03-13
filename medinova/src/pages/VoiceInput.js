import React, { useState, useEffect, useRef } from 'react';
import '../style.css';
import '../App.css';
import '../voice-input.css';

const VoiceInput = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('hi-IN');
  const [recordingTime, setRecordingTime] = useState(0);
  const [formData, setFormData] = useState({
    symptoms: '',
    medications: '',
    allergies: '',
    medicalHistory: ''
  });

  const recognitionRef = useRef(null);
  const timerRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    initializeVoiceRecognition();
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

  const initializeVoiceRecognition = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = selectedLanguage;
      
      recognition.onstart = () => {
        setIsRecording(true);
        startTimeRef.current = Date.now();
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
        
        const text = finalTranscript || interimTranscript;
        setTranscribedText(text);
        
        if (finalTranscript) {
          translateText(finalTranscript.trim());
        }
      };
      
      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        stopRecording();
      };
      
      recognition.onend = () => {
        if (isRecording) {
          try {
            recognition.start();
          } catch (e) {
            stopRecording();
          }
        }
      };
      
      recognitionRef.current = recognition;
    }
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      if (startTimeRef.current) {
        const elapsed = Math.floor((Date.now() - startTimeRef.current) / 1000);
        setRecordingTime(elapsed);
      }
    }, 1000);
  };

  const startRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = selectedLanguage;
      try {
        recognitionRef.current.start();
      } catch (e) {
        console.error('Error starting recognition:', e);
      }
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current && isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      if (transcribedText) {
        translateText(transcribedText);
      }
    }
  };

  const translateText = (text) => {
    if (!text.trim()) return;
    
    const lang = selectedLanguage.split('-')[0];
    if (lang === 'en') {
      setTranslatedText(text);
      return;
    }
    
    // Simulate translation (in real app, call translation API)
    setTimeout(() => {
      setTranslatedText(`[Translated from ${lang}]: ${text}`);
    }, 500);
  };

  const fillFromVoice = () => {
    if (!translatedText.trim()) {
      alert('No translated text available. Please record and translate first.');
      return;
    }
    
    const text = translatedText.toLowerCase();
    
    if (text.includes('fever') || text.includes('headache') || text.includes('pain')) {
      setFormData(prev => ({ ...prev, symptoms: translatedText }));
    }
    if (text.includes('medicine') || text.includes('medication')) {
      setFormData(prev => ({ ...prev, medications: translatedText }));
    }
    if (text.includes('allergy') || text.includes('allergic')) {
      setFormData(prev => ({ ...prev, allergies: translatedText }));
    }
    if (text.includes('diabetes') || text.includes('blood pressure') || text.includes('history')) {
      setFormData(prev => ({ ...prev, medicalHistory: translatedText }));
    }
  };

  const clearAll = () => {
    setTranscribedText('');
    setTranslatedText('');
    setFormData({
      symptoms: '',
      medications: '',
      allergies: '',
      medicalHistory: ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Medical form data:', formData);
    alert('Medical information submitted successfully!');
    clearAll();
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <>
      {/* Hero Section */}
      <section className="voice-hero">
        <div className="voice-hero-content">
          <h1>Voice-Based Medical Input</h1>
          <p>
            Speak in your regional language. Our AI will translate and convert your voice into medical records automatically.
          </p>
        </div>
      </section>

      {/* Voice Input Section */}
      <section className="voice-input-section">
        <div className="voice-input-container">
          <div className="voice-input-card">
            <div className="voice-header">
              <h2>Speak Your Medical Information</h2>
              <p>Select your language and start speaking. Your voice will be translated to English automatically.</p>
            </div>

            {/* Language Selection */}
            <div className="language-selection">
              <label htmlFor="inputLanguage">Select Your Language:</label>
              <select
                id="inputLanguage"
                className="language-select"
                value={selectedLanguage}
                onChange={(e) => {
                  setSelectedLanguage(e.target.value);
                  if (recognitionRef.current) {
                    recognitionRef.current.lang = e.target.value;
                  }
                }}
              >
                <option value="hi-IN">Hindi (हिंदी)</option>
                <option value="en-IN">English</option>
                <option value="bn-IN">Bengali (বাংলা)</option>
                <option value="te-IN">Telugu (తెలుగు)</option>
                <option value="ta-IN">Tamil (தமிழ்)</option>
                <option value="mr-IN">Marathi (मराठी)</option>
                <option value="gu-IN">Gujarati (ગુજરાતી)</option>
                <option value="kn-IN">Kannada (ಕನ್ನಡ)</option>
                <option value="pa-IN">Punjabi (ਪੰਜਾਬੀ)</option>
              </select>
            </div>

            {/* Voice Recording */}
            <div className="voice-recording-area">
              <div className={`recording-status ${isRecording ? 'recording' : ''}`}>
                <div className="status-icon">{isRecording ? '🔴' : '🎤'}</div>
                <p>{isRecording ? 'Recording...' : 'Ready to record'}</p>
              </div>
              
              <div className="recording-controls">
                <button
                  type="button"
                  className={`btn btn-primary record-btn ${isRecording ? 'recording' : ''}`}
                  onClick={startRecording}
                  disabled={isRecording}
                >
                  <span className="btn-icon">🎤</span>
                  Start Recording
                </button>
                <button
                  type="button"
                  className="btn btn-outline stop-btn"
                  onClick={stopRecording}
                  disabled={!isRecording}
                >
                  <span className="btn-icon">⏹</span>
                  Stop Recording
                </button>
                <button
                  type="button"
                  className="btn btn-outline clear-btn"
                  onClick={clearAll}
                >
                  <span className="btn-icon">🗑</span>
                  Clear
                </button>
              </div>

              {isRecording && (
                <div className="recording-timer">
                  <span>Recording: </span>
                  <span>{formatTime(recordingTime)}</span>
                </div>
              )}
            </div>

            {/* Transcribed Text Display */}
            <div className="transcription-area">
              <label>Transcribed Text (Original Language):</label>
              <div className={`transcription-box ${transcribedText ? 'has-text' : ''}`}>
                {transcribedText ? (
                  <p>{transcribedText}</p>
                ) : (
                  <p className="placeholder-text">Your transcribed text will appear here...</p>
                )}
              </div>
            </div>

            {/* Translated Text Display */}
            <div className="translation-area">
              <label>Translated Text (English):</label>
              <div className={`translation-box ${translatedText ? 'has-text' : ''}`}>
                {translatedText ? (
                  <p>{translatedText}</p>
                ) : (
                  <p className="placeholder-text">Translated text will appear here...</p>
                )}
              </div>
            </div>

            {/* Medical Form Fields */}
            <div className="medical-form-section">
              <h3>Medical Information Form</h3>
              <form onSubmit={handleSubmit} className="medical-form">
                <div className="form-row">
                  <label htmlFor="symptoms">Symptoms:</label>
                  <textarea
                    id="symptoms"
                    name="symptoms"
                    rows="3"
                    value={formData.symptoms}
                    onChange={(e) => setFormData(prev => ({ ...prev, symptoms: e.target.value }))}
                    placeholder="Describe your symptoms..."
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="medications">Current Medications:</label>
                  <textarea
                    id="medications"
                    name="medications"
                    rows="2"
                    value={formData.medications}
                    onChange={(e) => setFormData(prev => ({ ...prev, medications: e.target.value }))}
                    placeholder="List your current medications..."
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="allergies">Allergies:</label>
                  <textarea
                    id="allergies"
                    name="allergies"
                    rows="2"
                    value={formData.allergies}
                    onChange={(e) => setFormData(prev => ({ ...prev, allergies: e.target.value }))}
                    placeholder="List any allergies..."
                  />
                </div>
                <div className="form-row">
                  <label htmlFor="medicalHistory">Medical History:</label>
                  <textarea
                    id="medicalHistory"
                    name="medicalHistory"
                    rows="3"
                    value={formData.medicalHistory}
                    onChange={(e) => setFormData(prev => ({ ...prev, medicalHistory: e.target.value }))}
                    placeholder="Describe your medical history..."
                  />
                </div>
                <div className="form-actions">
                  <button type="button" className="btn btn-outline" onClick={fillFromVoice}>
                    Fill from Voice Input
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Submit Medical Information
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Instructions Card */}
          <div className="instructions-card">
            <h3>How to Use</h3>
            <ul className="instructions-list">
              <li>Select your preferred regional language</li>
              <li>Click 'Start Recording' and speak clearly</li>
              <li>Your speech will be transcribed automatically</li>
              <li>Text will be translated to English</li>
              <li>Use 'Fill from Voice Input' to populate the form</li>
              <li>Review and submit your medical information</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
};

export default VoiceInput;
