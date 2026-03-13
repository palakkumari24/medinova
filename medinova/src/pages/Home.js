import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../style.css';
import '../App.css';
import SOSModal from '../components/SOSModal';

const Home = () => {
  const [showSOSModal, setShowSOSModal] = useState(false);

  const handleEmergency = () => {
    setShowSOSModal(true);
  };

  const closeModal = () => {
    setShowSOSModal(false);
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const specializations = [
    {
      id: 1,
      name: 'Cardiology',
      description: 'Heart and cardiovascular system specialists',
      doctors: 45,
      icon: '💙',
      image: 'photo-1487260211189-670c54da558d.jpeg'
    },
    {
      id: 2,
      name: 'Dermatology',
      description: 'Skin, hair, and nail care experts',
      doctors: 32,
      icon: '🩺',
      image: 'photo-1487260211189-670c54da558d.jpeg'
    },
    {
      id: 3,
      name: 'Neurology',
      description: 'Brain and nervous system specialists',
      doctors: 28,
      icon: '🧠',
      image: 'photo-1487260211189-670c54da558d.jpeg'
    },
    {
      id: 4,
      name: 'General Physician',
      description: 'Primary care and general health',
      doctors: 67,
      icon: '🩺',
      image: 'photo-1487260211189-670c54da558d.jpeg'
    },
    {
      id: 5,
      name: 'Pediatrics',
      description: 'Specialized care for children',
      doctors: 38,
      icon: '👶',
      image: 'photo-1487260211189-670c54da558d.jpeg'
    },
    {
      id: 6,
      name: 'Orthopedics',
      description: 'Bone, joint, and muscle specialists',
      doctors: 41,
      icon: '🦴',
      image: 'photo-1487260211189-670c54da558d.jpeg'
    }
  ];

  const features = [
    {
      id: 1,
      title: 'AI Health Tracker',
      description: 'Advanced AI monitors your vital signs, symptoms, and health patterns to provide personalized insights and early warning alerts.',
      icon: '🤖',
      image: 'photo-1487260211189-670c54da558d.jpeg',
      list: [
        'Real-time monitoring and alerts',
        'Secure and HIPAA compliant',
        '24/7 accessibility'
      ],
      reverse: false
    },
    {
      id: 2,
      title: 'Instant Appointment',
      description: 'Book appointments with specialists instantly. No waiting rooms, no hassle. Get connected with the right doctor in minutes.',
      icon: '⚡',
      image: 'photo-1487260211189-670c54da558d.jpeg',
      list: [
        'Smart specialist matching',
        'Secure video consultations',
        'Automated scheduling reminders'
      ],
      reverse: true
    },
    {
      id: 3,
      title: 'Medicine Reminder',
      description: 'Never miss a dose again. Smart reminders ensure you take the right medication at the right time with dosage tracking.',
      icon: '💊',
      image: 'photo-1487260211189-670c54da558d.jpeg',
      list: [
        'Personalized schedules',
        'Caregiver notifications',
        'Pharmacy integration'
      ],
      reverse: false
    },
    {
      id: 4,
      title: 'Electronic Health Records',
      description: 'Secure, comprehensive digital records accessible anytime, anywhere. Share with doctors instantly for better care.',
      icon: '📋',
      image: 'photo-1487260211189-670c54da558d.jpeg',
      list: [
        'Encrypted cloud storage',
        'Smart organization & search',
        'Instant doctor sharing'
      ],
      reverse: true
    }
  ];

  const feedbacks = [
    {
      id: 1,
      rating: '⭐⭐⭐⭐⭐',
      text: '"Excellent service! The doctors are very professional and the platform is easy to use. Got my appointment quickly."',
      author: 'RK',
      authorName: 'Rajesh Kumar',
      since: 'Patient since 2023'
    },
    {
      id: 2,
      rating: '⭐⭐⭐⭐⭐',
      text: '"The AI health tracker helped me monitor my health better. Very satisfied with the emergency SOS feature."',
      author: 'PM',
      authorName: 'Priya Sharma',
      since: 'Patient since 2022'
    },
    {
      id: 3,
      rating: '⭐⭐⭐⭐⭐',
      text: '"Best healthcare platform! Medicine reminders are very helpful and the telemedicine consultations are convenient."',
      author: 'AS',
      authorName: 'Amit Singh',
      since: 'Patient since 2024'
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-left">
          <div className="hero-kicker">
            <span className="kicker-dot"></span>
            Trusted digital care ecosystem
          </div>
          <h1 className="hero-title">Your Health, <span>Our Priority</span></h1>
          <p className="hero-subtitle">
            Experience the future of healthcare with Health Sync. Book
            appointments with top specialists, track your health with AI, and get
            emergency support when you need it most.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-primary" onClick={() => scrollToSection('doctors')}>
              Book Appointment
            </button>
            <button className="btn btn-emergency" onClick={handleEmergency}>
              Emergency SOS
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat-card">
              <h3>500+</h3>
              <p>Expert Doctors</p>
            </div>
            <div className="stat-card">
              <h3>50K+</h3>
              <p>Happy Patients</p>
            </div>
            <div className="stat-card">
              <h3>24/7</h3>
              <p>Emergency Support</p>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-photo-card">
            <div className="health-score">
              <div className="score-avatar">💚</div>
              <div>
                <p>Health Score</p>
                <span>98% Stable</span>
              </div>
            </div>
            <img
              src="/1765817188990.jpg"
              alt="Health Sync care team"
            />
            <div className="card-shadow"></div>
          </div>
        </div>
      </section>

      {/* Specializations Section */}
      <section id="doctors" className="specializations">
        <div className="specializations-inner">
          <div className="specializations-header">
            <h2>Find the Right Specialist</h2>
            <p>
              Connect with top-rated doctors across various specializations. Our
              platform ensures you get the best care from qualified professionals.
            </p>
          </div>
          <div className="specializations-grid">
            {specializations.map((spec) => (
              <article key={spec.id} className="specialization-card">
                <div className="specialization-image">
                  <img
                    src={`/${spec.image}`}
                    alt={`${spec.name} consultation`}
                  />
                  <span className="image-badge">{spec.icon}</span>
                </div>
                <div className="specialization-body">
                  <h3>{spec.name}</h3>
                  <p>{spec.description}</p>
                  <div className="specialization-meta">
                    <span>👨‍⚕️ {spec.doctors} doctors available</span>
                    <span className="status-dot">Online now</span>
                  </div>
                  <button className="btn btn-outline">Book Consultation</button>
                </div>
              </article>
            ))}
          </div>
          <div className="specializations-footer">
            <Link to="/specialist" className="btn btn-primary">View All Specializations</Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="features-inner">
          <div className="features-header">
            <h2>Smart Healthcare Features</h2>
            <p>
              Experience the future of healthcare with our innovative features
              designed to make your health management easier, smarter, and more
              effective.
            </p>
          </div>
          {features.map((feature) => (
            <div key={feature.id} className={`feature-item ${feature.reverse ? 'reverse' : ''}`}>
              <div className="feature-media">
                <img
                  src={`/${feature.image}`}
                  alt={feature.title}
                />
                <span className="feature-badge">{feature.icon}</span>
              </div>
              <div className="feature-content">
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <ul className="feature-list">
                  {feature.list.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SOS Section */}
      <section className="sos-section">
        <div className="sos-inner">
          <div className="sos-header">
            <h2>Emergency SOS Service</h2>
            <p>
              In case of medical emergency, our SOS feature instantly connects you
              to the nearest hospital and emergency services. Help is just one
              click away.
            </p>
          </div>

          <div className="sos-grid">
            <div className="sos-steps-card">
              <h3>How Emergency SOS Works</h3>
              <ul className="sos-steps-list">
                <li>
                  <span className="step-number">1</span>
                  <div>
                    <strong>Press SOS Button</strong>
                    <p>
                      Tap the emergency SOS button to activate the emergency
                      protocol instantly.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="step-number">2</span>
                  <div>
                    <strong>Location Detection</strong>
                    <p>
                      We automatically detect your location and find the nearest
                      hospital.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="step-number">3</span>
                  <div>
                    <strong>Emergency Contact</strong>
                    <p>
                      We notify emergency services and the nearest hospital
                      emergency department.
                    </p>
                  </div>
                </li>
                <li>
                  <span className="step-number">4</span>
                  <div>
                    <strong>Medical Assistance</strong>
                    <p>
                      Emergency medical teams receive your medical history and
                      head to your location.
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="sos-action-card">
              <div className="sos-circle">
                <button className="sos-panic-button" onClick={handleEmergency}>
                  <span className="sos-icon">🚨</span>
                  <span>Emergency</span>
                  <strong>SOS</strong>
                </button>
              </div>
              <p>
                Press and hold the SOS button in case of medical emergency. This
                will immediately alert emergency services and the nearest
                hospital.
              </p>
              <div className="sos-notice">
                <span>⚠ Important Notice</span>
                <p>
                  This is a demonstration feature. In a real emergency, please
                  call your local emergency number (911, 112, etc.) immediately.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feedback Section */}
      <section id="feedback" className="feedback-section">
        <div className="feedback-inner">
          <div className="feedback-header">
            <h2>Patient Feedback</h2>
            <p>Read what our patients say about their experience with Medinova.ai</p>
          </div>
          <div className="feedback-grid">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="feedback-card">
                <div className="feedback-rating">
                  <span>{feedback.rating}</span>
                </div>
                <p className="feedback-text">{feedback.text}</p>
                <div className="feedback-author">
                  <div className="author-avatar">{feedback.author}</div>
                  <div className="author-info">
                    <h4>{feedback.authorName}</h4>
                    <p>{feedback.since}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SOSModal show={showSOSModal} onClose={closeModal} />
    </>
  );
};

export default Home;
