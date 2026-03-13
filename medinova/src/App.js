import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import './style.css';
import './questions.css';
import './voice-input.css';
import './specialist.css';
import './about.css';
import './appointment.css';
import './login.css';
import './signup.css';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Specialist from './pages/Specialist';
import Questions from './pages/Questions';
import VoiceInput from './pages/VoiceInput';
import About from './pages/About';
import Appointment from './pages/Appointment';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/specialist" element={<Specialist />} />
            <Route path="/questions" element={<Questions />} />
            <Route path="/voice-input" element={<VoiceInput />} />
            <Route path="/about" element={<About />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
