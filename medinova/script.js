const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-link");
const sosButton = document.getElementById("sosButton");
const emergencyBtn = document.getElementById("emergencyBtn");
const sosModal = document.getElementById("sosModal");
const closeModal = sosModal ? sosModal.querySelector(".close") : null;

// Mobile navigation toggle
if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
  });
}

// Close mobile menu when clicking a link
navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (hamburger && navMenu) {
      hamburger.classList.remove("active");
      navMenu.classList.remove("active");
    }
  });
});

// Smooth scrolling for navigation links
navLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");
    if (!targetId || !targetId.startsWith("#")) {
      return;
    }
    event.preventDefault();
    const targetSection = document.querySelector(targetId);

    if (!targetSection) return;

    const offsetTop = targetSection.offsetTop - 80;
    window.scrollTo({ top: offsetTop, behavior: "smooth" });
  });
});

// Emergency modal handling
function triggerEmergency() {
  if (!sosModal) return;
  const modalBody = sosModal.querySelector(".modal-body");
  sosModal.style.display = "block";
  document.body.style.overflow = "hidden";

  setTimeout(() => {
    if (!modalBody) return;
    modalBody.innerHTML = `
      <h3 style="color:#dc2626;margin-bottom:1rem;">🚨 Emergency Services Contacted</h3>
      <p><strong>Nearest Hospital:</strong> City General Hospital</p>
      <p><strong>Distance:</strong> 2.3 km</p>
      <p><strong>ETA:</strong> 15 minutes</p>
      <p><strong>Emergency ID:</strong> EMG-${Math.random()
        .toString(36)
        .substr(2, 9)
        .toUpperCase()}</p>
      <div style="margin-top:1.5rem;padding:1rem;background:#fee2e2;border-radius:8px;">
        <p style="color:#7f1d1d;font-weight:600;">
          Help is on the way! Please stay calm and wait for assistance.
        </p>
      </div>
    `;
  }, 3000);
}

if (sosButton) {
  sosButton.addEventListener("click", triggerEmergency);
}

if (emergencyBtn) {
  emergencyBtn.addEventListener("click", triggerEmergency);
}

if (closeModal && sosModal) {
  closeModal.addEventListener("click", () => {
    sosModal.style.display = "none";
    document.body.style.overflow = "auto";
  });
}

window.addEventListener("click", (event) => {
  if (sosModal && event.target === sosModal) {
    sosModal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(255, 255, 255, 0.95)";
    header.style.backdropFilter = "blur(10px)";
  } else {
    header.style.background = "#fff";
    header.style.backdropFilter = "none";
  }
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("active");
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".specialization-card, .feature-card"
  );

  animatedElements.forEach((element) => {
    element.classList.add("scroll-fade");
    observer.observe(element);
  });
});

// Book appointment shortcut
const bookAppointmentBtn = document.querySelector("#home .hero-buttons .btn-primary");

if (bookAppointmentBtn) {
  bookAppointmentBtn.addEventListener("click", () => {
    const doctorsSection = document.getElementById("doctors");
    const offsetTop = doctorsSection.offsetTop - 80;

    window.scrollTo({ top: offsetTop, behavior: "smooth" });
    showNotification("Please select a specialization to book an appointment", "info");
  });
}

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
    <div class="notification-content">
      <span>${message}</span>
      <button type="button">&times;</button>
    </div>
  `;

  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === "info" ? "#3b82f6" : "#10b981"};
    color: #fff;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
    z-index: 1001;
    animation: slideInRight 0.3s ease;
  `;

  const closeButton = notification.querySelector("button");
  closeButton.addEventListener("click", () => notification.remove());

  document.body.appendChild(notification);

  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove();
    }
  }, 5000);
}

const extraStyles = document.createElement("style");
extraStyles.textContent = `
  @keyframes slideInRight {
    from { opacity: 0; transform: translateX(100px); }
    to { opacity: 1; transform: translateX(0); }
  }
  .notification-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }
  .notification-content button {
    background: none;
    border: none;
    color: #fff;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    line-height: 1;
  }
`;
document.head.appendChild(extraStyles);

// Specialization card interactions
document.addEventListener("DOMContentLoaded", () => {
  const specializationCards = document.querySelectorAll(".specialization-card");

  specializationCards.forEach((card) => {
    card.style.cursor = "pointer";
    card.addEventListener("click", () => {
      const specialization = card.querySelector("h3").textContent;
      showNotification(`Redirecting to ${specialization} specialists...`, "info");
      card.style.transform = "scale(0.95)";
      setTimeout(() => (card.style.transform = ""), 150);
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const appointmentForm = document.getElementById("appointmentForm");
  if (!appointmentForm) return;

  const slotButtons = document.querySelectorAll(".slot-grid .slot-button, .hold-slot");
  const summaryDetails = document.getElementById("summaryDetails");
  const confirmationBadge = document.getElementById("confirmationBadge");
  const selectedSlotInput = document.getElementById("selectedSlot");
  let activeSlot = "";

  const updateSummary = () => {
    if (!summaryDetails) return;

    const formData = new FormData(appointmentForm);
    const patientName = formData.get("patientName") || "Patient";
    const specialization = formData.get("specialization") || "Specialist";
    const doctor = formData.get("doctor") || "Any available doctor";
    const mode = formData.get("mode") || "In-person";
    const date = formData.get("date") || "next available date";
    const time = formData.get("time") || "flexible time";
    const slot = activeSlot || "first priority slot";
    const notes = formData.get("notes") || "No additional notes";

    summaryDetails.innerHTML = `
      <p><strong>${patientName}</strong> requested a <strong>${mode.toLowerCase()}</strong> visit for
      <strong>${specialization}</strong> with <strong>${doctor}</strong>.</p>
      <p>Preferred on <strong>${date}</strong> around <strong>${time}</strong> and is holding
      the <strong>${slot}</strong> concierge slot.</p>
      <p class="summary-notes">Notes: ${notes}</p>
    `;
  };

  slotButtons.forEach((button) => {
    button.addEventListener("click", () => {
      slotButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      activeSlot = button.dataset.slot || "";
      if (selectedSlotInput) {
        selectedSlotInput.value = activeSlot;
      }
      updateSummary();
      if (button.classList.contains("hold-slot")) {
        appointmentForm.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  appointmentForm.addEventListener("input", updateSummary);

  appointmentForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!activeSlot) {
      showNotification("Pick a preferred slot to prioritize your request", "info");
      return;
    }

    updateSummary();

    if (confirmationBadge) {
      const timestamp = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      confirmationBadge.textContent = `Request sent • ${timestamp}`;
    }

    showNotification("Appointment request submitted! We'll confirm shortly.", "success");

    appointmentForm.reset();
    activeSlot = "";
    slotButtons.forEach((btn) => btn.classList.remove("active"));
    if (selectedSlotInput) {
      selectedSlotInput.value = "";
    }
    if (summaryDetails) {
      summaryDetails.textContent = "Provide details to see a real-time summary of your visit here.";
    }
  });
});

// Loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded");
});

// Lazy-load images if present
if ("IntersectionObserver" in window) {
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  document.querySelectorAll("img[data-src]").forEach((img) => {
    imageObserver.observe(img);
  });
}

console.log("Health Sync platform loaded successfully! 🏥");

// Language switching functionality
function applyLanguage(lang) {
  if (!translations || !translations[lang]) return;
  
  const t = translations[lang];
  document.documentElement.lang = lang;
  
  // Navigation links
  document.querySelectorAll('[data-i18n="navHome"]').forEach(el => el.textContent = t.navHome);
  document.querySelectorAll('[data-i18n="navSpecialist"]').forEach(el => el.textContent = t.navSpecialist);
  document.querySelectorAll('[data-i18n="navQuestions"]').forEach(el => el.textContent = t.navQuestions);
  document.querySelectorAll('[data-i18n="navVoiceInput"]').forEach(el => el.textContent = t.navVoiceInput);
  document.querySelectorAll('[data-i18n="navAbout"]').forEach(el => el.textContent = t.navAbout);
  document.querySelectorAll('[data-i18n="navLogin"]').forEach(el => el.textContent = t.navLogin);
  document.querySelectorAll('[data-i18n="navSignup"]').forEach(el => el.textContent = t.navSignup);
  document.querySelectorAll('[data-i18n="navBookAppointment"]').forEach(el => el.textContent = t.navBookAppointment);
  
  // Hero Section
  const heroKicker = document.querySelector('.hero-kicker');
  if (heroKicker) {
    const dot = heroKicker.querySelector('.kicker-dot');
    heroKicker.innerHTML = dot ? `<span class="kicker-dot"></span>${t.heroKicker}` : t.heroKicker;
  }
  
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    heroTitle.innerHTML = `${t.heroTitle}<span>${t.heroTitleSpan}</span>`;
  }
  
  const heroSubtitle = document.querySelector('.hero-subtitle');
  if (heroSubtitle) heroSubtitle.textContent = t.heroSubtitle;
  
  const heroBookBtn = document.querySelector('#home .hero-buttons .btn-primary');
  if (heroBookBtn) heroBookBtn.textContent = t.heroBookBtn;
  
  const heroEmergencyBtn = document.getElementById('emergencyBtn');
  if (heroEmergencyBtn) heroEmergencyBtn.textContent = t.heroEmergencyBtn;
  
  // Hero Stats
  const statCards = document.querySelectorAll('.hero-stats .stat-card p');
  if (statCards.length >= 3) {
    statCards[0].textContent = t.heroStatsDoctors;
    statCards[1].textContent = t.heroStatsPatients;
    statCards[2].textContent = t.heroStatsSupport;
  }
  
  // Health Score
  const healthScore = document.querySelector('.health-score p');
  if (healthScore) healthScore.textContent = t.heroHealthScore;
  
  const healthScoreValue = document.querySelector('.health-score span');
  if (healthScoreValue) healthScoreValue.textContent = t.heroHealthScoreValue;
  
  // Specializations
  const specHeader = document.querySelector('.specializations-header h2');
  if (specHeader) specHeader.textContent = t.specHeader;
  
  const specDesc = document.querySelector('.specializations-header p');
  if (specDesc) specDesc.textContent = t.specDescription;
  
  const specCards = document.querySelectorAll('.specialization-card');
  const specData = [
    { h3: t.specCardiology, p: t.specCardiologyDesc },
    { h3: t.specDermatology, p: t.specDermatologyDesc },
    { h3: t.specNeurology, p: t.specNeurologyDesc },
    { h3: t.specGeneralPhysician, p: t.specGeneralPhysicianDesc },
    { h3: t.specPediatrics, p: t.specPediatricsDesc },
    { h3: t.specOrthopedics, p: t.specOrthopedicsDesc }
  ];
  
  specCards.forEach((card, index) => {
    if (specData[index]) {
      const h3 = card.querySelector('.specialization-body h3');
      if (h3) h3.textContent = specData[index].h3;
      const p = card.querySelector('.specialization-body > p');
      if (p) p.textContent = specData[index].p;
      const button = card.querySelector('.btn');
      if (button) button.textContent = t.specBookConsultation;
      const statusDot = card.querySelector('.status-dot');
      if (statusDot) statusDot.textContent = t.specOnlineNow;
    }
  });
  
  const specViewAll = document.querySelector('.specializations-footer .btn');
  if (specViewAll) specViewAll.textContent = t.specViewAll;
  
  // Features
  const featuresHeader = document.querySelector('.features-header h2');
  if (featuresHeader) featuresHeader.textContent = t.featuresHeader;
  
  const featuresDesc = document.querySelector('.features-header p');
  if (featuresDesc) featuresDesc.textContent = t.featuresDescription;
  
  const featureItems = document.querySelectorAll('.feature-item');
  const featureData = [
    { h3: t.featureAITracker, p: t.featureAITrackerDesc, lis: [t.featureAITracker1, t.featureAITracker2, t.featureAITracker3] },
    { h3: t.featureInstantAppointment, p: t.featureInstantAppointmentDesc, lis: [t.featureInstantAppointment1, t.featureInstantAppointment2, t.featureInstantAppointment3] },
    { h3: t.featureMedicineReminder, p: t.featureMedicineReminderDesc, lis: [t.featureMedicineReminder1, t.featureMedicineReminder2, t.featureMedicineReminder3] },
    { h3: t.featureEHR, p: t.featureEHRDesc, lis: [t.featureEHR1, t.featureEHR2, t.featureEHR3] }
  ];
  
  featureItems.forEach((item, index) => {
    if (featureData[index]) {
      const h3 = item.querySelector('.feature-content h3');
      if (h3) h3.textContent = featureData[index].h3;
      const p = item.querySelector('.feature-content > p');
      if (p) p.textContent = featureData[index].p;
      const lis = item.querySelectorAll('.feature-list li');
      lis.forEach((li, liIndex) => {
        if (featureData[index].lis[liIndex]) {
          li.textContent = featureData[index].lis[liIndex];
        }
      });
    }
  });
  
  // SOS Section
  const sosHeader = document.querySelector('.sos-header h2');
  if (sosHeader) sosHeader.textContent = t.sosHeader;
  
  const sosDesc = document.querySelector('.sos-header p');
  if (sosDesc) sosDesc.textContent = t.sosDescription;
  
  const sosHowItWorks = document.querySelector('.sos-steps-card h3');
  if (sosHowItWorks) sosHowItWorks.textContent = t.sosHowItWorks;
  
  const sosSteps = document.querySelectorAll('.sos-steps-list li');
  const sosStepsData = [
    { strong: t.sosStep1Title, p: t.sosStep1Desc },
    { strong: t.sosStep2Title, p: t.sosStep2Desc },
    { strong: t.sosStep3Title, p: t.sosStep3Desc },
    { strong: t.sosStep4Title, p: t.sosStep4Desc }
  ];
  
  sosSteps.forEach((step, index) => {
    if (sosStepsData[index]) {
      const strong = step.querySelector('strong');
      if (strong) strong.textContent = sosStepsData[index].strong;
      const p = step.querySelector('p');
      if (p) p.textContent = sosStepsData[index].p;
    }
  });
  
  const sosButtonEl = document.querySelector('.sos-panic-button');
  if (sosButtonEl) {
    const span = sosButtonEl.querySelector('span.sos-icon');
    const textSpan = Array.from(sosButtonEl.childNodes).find(node => node.nodeType === 3 || (node.tagName === 'SPAN' && !node.classList.contains('sos-icon')));
    const strong = sosButtonEl.querySelector('strong');
    sosButtonEl.innerHTML = span ? `${span.outerHTML}<span>${t.sosButtonText}</span><strong>${t.sosButtonSOS}</strong>` : `<span>${t.sosButtonText}</span><strong>${t.sosButtonSOS}</strong>`;
  }
  
  const sosActionDesc = document.querySelector('.sos-action-card p');
  if (sosActionDesc && !sosActionDesc.querySelector('.sos-notice')) {
    sosActionDesc.textContent = t.sosActionDesc;
  }
  
  const sosNotice = document.querySelector('.sos-notice');
  if (sosNotice) {
    const span = sosNotice.querySelector('span');
    if (span) span.textContent = t.sosNoticeTitle;
    const p = sosNotice.querySelector('p');
    if (p) p.textContent = t.sosNoticeText;
  }
  
  // Footer
  const footerDesc = document.querySelector('.footer-brand p');
  if (footerDesc) footerDesc.textContent = t.footerDescription;
  
  const footerQuickLinks = document.querySelector('.footer-links h4');
  if (footerQuickLinks) footerQuickLinks.textContent = t.footerQuickLinks;
  
  const footerContact = document.querySelector('.footer-contact h4');
  if (footerContact) footerContact.textContent = t.footerContact;
  
  // Modal
  const modalHeader = document.querySelector('.modal-header h2');
  if (modalHeader) modalHeader.textContent = t.modalHeader;
  
  // Feedback Section
  const feedbackHeader = document.querySelector('.feedback-header h2');
  if (feedbackHeader) feedbackHeader.textContent = t.feedbackHeader;
  
  const feedbackDesc = document.querySelector('.feedback-header p');
  if (feedbackDesc) feedbackDesc.textContent = t.feedbackDescription;
  
  const feedbackCards = document.querySelectorAll('.feedback-card');
  const feedbackData = [
    { text: t.feedback1, author: t.feedbackAuthor1 },
    { text: t.feedback2, author: t.feedbackAuthor2 },
    { text: t.feedback3, author: t.feedbackAuthor3 }
  ];
  
  feedbackCards.forEach((card, index) => {
    if (feedbackData[index]) {
      const text = card.querySelector('.feedback-text');
      if (text) text.textContent = `"${feedbackData[index].text}"`;
      const authorName = card.querySelector('.author-info h4');
      if (authorName) authorName.textContent = feedbackData[index].author;
      const authorSince = card.querySelector('.author-info p');
      if (authorSince) {
        const year = index === 0 ? '2023' : index === 1 ? '2022' : '2024';
        authorSince.textContent = `${t.feedbackSince} ${year}`;
      }
    }
  });
  
  // Footer Stats
  const footerStatsTitle = document.querySelector('.footer-stats h4');
  if (footerStatsTitle) footerStatsTitle.textContent = t.footerStatsTitle;
  
  const statItems = document.querySelectorAll('.stat-content p');
  if (statItems.length >= 3) {
    statItems[0].textContent = t.footerTotalPatients;
    statItems[1].textContent = t.footerAvailableBeds;
    statItems[2].textContent = t.footerRecoveryRate;
  }
  
  // Questions Page Translations
  const questionsHeroTitle = document.querySelector('.questions-hero-content h1');
  if (questionsHeroTitle) questionsHeroTitle.textContent = t.questionsHeroTitle;
  
  const questionsHeroDesc = document.querySelector('.questions-hero-content p');
  if (questionsHeroDesc) questionsHeroDesc.textContent = t.questionsHeroDesc;
  
  const askQuestionTitle = document.querySelector('.question-form-container h2');
  if (askQuestionTitle) askQuestionTitle.textContent = t.askQuestionTitle;
  
  const questionLabel = document.querySelector('label[for="questionText"]');
  if (questionLabel) questionLabel.textContent = t.questionLabel;
  
  const categoryLabel = document.querySelector('label[for="questionCategory"]');
  if (categoryLabel) categoryLabel.textContent = t.categoryLabel;
  
  const questionTextarea = document.getElementById('questionText');
  if (questionTextarea && questionTextarea.dataset.i18nPlaceholder) {
    questionTextarea.placeholder = t.questionPlaceholder;
  }
  
  const categorySelect = document.getElementById('questionCategory');
  if (categorySelect) {
    const options = categorySelect.querySelectorAll('option');
    if (options.length > 0) options[0].textContent = t.selectCategory;
    if (options.length > 1) options[1].textContent = t.categoryGeneral;
    if (options.length > 2) options[2].textContent = t.categoryCardiology;
    if (options.length > 3) options[3].textContent = t.categoryDermatology;
    if (options.length > 4) options[4].textContent = t.categoryNeurology;
    if (options.length > 5) options[5].textContent = t.categoryPediatrics;
    if (options.length > 6) options[6].textContent = t.categoryOrthopedics;
    if (options.length > 7) options[7].textContent = t.categoryOther;
  }
  
  const submitBtn = document.querySelector('.question-form .btn-primary');
  if (submitBtn) submitBtn.textContent = t.submitQuestion;
  
  const topQuestionsTitle = document.querySelector('.top-questions-container .section-header h2');
  if (topQuestionsTitle) topQuestionsTitle.textContent = t.topQuestionsTitle;
  
  const sortButtons = document.querySelectorAll('.sort-btn');
  sortButtons.forEach((btn, index) => {
    if (index === 0) btn.textContent = t.sortByVotes;
    if (index === 1) btn.textContent = t.sortByRecent;
    if (index === 2) btn.textContent = t.sortByAnswered;
  });
  
  const answeredQuestionsTitle = document.querySelector('.answered-questions-container h2');
  if (answeredQuestionsTitle) answeredQuestionsTitle.textContent = t.answeredQuestionsTitle;
  
  // Voice Input Page Translations
  const voiceHeroTitle = document.querySelector('.voice-hero-content h1');
  if (voiceHeroTitle) voiceHeroTitle.textContent = t.voiceHeroTitle;
  
  const voiceHeroDesc = document.querySelector('.voice-hero-content p');
  if (voiceHeroDesc) voiceHeroDesc.textContent = t.voiceHeroDesc;
  
  const voiceInputTitle = document.querySelector('.voice-header h2');
  if (voiceInputTitle) voiceInputTitle.textContent = t.voiceInputTitle;
  
  const voiceInputDesc = document.querySelector('.voice-header p');
  if (voiceInputDesc) voiceInputDesc.textContent = t.voiceInputDesc;
  
  const selectInputLanguage = document.querySelector('.language-selection label');
  if (selectInputLanguage) selectInputLanguage.textContent = t.selectInputLanguage;
  
  const readyToRecord = document.querySelector('.recording-status p');
  if (readyToRecord && !readyToRecord.closest('.recording-status').classList.contains('recording')) {
    readyToRecord.textContent = t.readyToRecord;
  }
  
  const startRecordingBtn = document.getElementById('startRecording');
  if (startRecordingBtn) startRecordingBtn.innerHTML = `<span class="btn-icon">🎤</span>${t.startRecording}`;
  
  const stopRecordingBtn = document.getElementById('stopRecording');
  if (stopRecordingBtn) stopRecordingBtn.innerHTML = `<span class="btn-icon">⏹</span>${t.stopRecording}`;
  
  const clearTextBtn = document.getElementById('clearText');
  if (clearTextBtn) clearTextBtn.innerHTML = `<span class="btn-icon">🗑</span>${t.clearText}`;
  
  const transcribedTextLabel = document.querySelector('.transcription-area label');
  if (transcribedTextLabel) transcribedTextLabel.textContent = t.transcribedText;
  
  const translatedTextLabel = document.querySelector('.translation-area label');
  if (translatedTextLabel) translatedTextLabel.textContent = t.translatedText;
  
  const medicalFormTitle = document.querySelector('.medical-form-section h3');
  if (medicalFormTitle) medicalFormTitle.textContent = t.medicalFormTitle;
  
  const symptomsLabel = document.querySelector('label[for="symptoms"]');
  if (symptomsLabel) symptomsLabel.textContent = t.symptomsLabel;
  
  const medicationsLabel = document.querySelector('label[for="medications"]');
  if (medicationsLabel) medicationsLabel.textContent = t.medicationsLabel;
  
  const allergiesLabel = document.querySelector('label[for="allergies"]');
  if (allergiesLabel) allergiesLabel.textContent = t.allergiesLabel;
  
  const medicalHistoryLabel = document.querySelector('label[for="medicalHistory"]');
  if (medicalHistoryLabel) medicalHistoryLabel.textContent = t.medicalHistoryLabel;
  
  const fillFromVoiceBtn = document.getElementById('fillFromVoice');
  if (fillFromVoiceBtn) fillFromVoiceBtn.textContent = t.fillFromVoice;
  
  const submitFormBtn = document.querySelector('.medical-form button[type="submit"]');
  if (submitFormBtn) submitFormBtn.textContent = t.submitForm;
  
  const instructionsTitle = document.querySelector('.instructions-card h3');
  if (instructionsTitle) instructionsTitle.textContent = t.instructionsTitle;
  
  const instructionsList = document.querySelectorAll('.instructions-list li');
  if (instructionsList.length >= 6) {
    instructionsList[0].textContent = t.instruction1;
    instructionsList[1].textContent = t.instruction2;
    instructionsList[2].textContent = t.instruction3;
    instructionsList[3].textContent = t.instruction4;
    instructionsList[4].textContent = t.instruction5;
    instructionsList[5].textContent = t.instruction6;
  }
  
  // Update active language button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.remove('active');
    if (btn.dataset.lang === lang) {
      btn.classList.add('active');
    }
  });
}

// Language selector event listeners
document.addEventListener('DOMContentLoaded', () => {
  const langButtons = document.querySelectorAll('.lang-btn');
  const currentLang = getCurrentLanguage();
  
  // Apply saved language
  applyLanguage(currentLang);
  
  // Add event listeners to language buttons
  langButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      setLanguage(lang);
      applyLanguage(lang);
    });
    
    // Set active button
    if (btn.dataset.lang === currentLang) {
      btn.classList.add('active');
    }
  });
  
  // Animate stats counter
  animateStats();
});

// Stats counter animation
function animateStats() {
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const observerOptions = {
    threshold: 0.5,
    rootMargin: '0px'
  };
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        entry.target.classList.add('animated');
        const target = parseInt(entry.target.dataset.count);
        animateCounter(entry.target, target);
      }
    });
  }, observerOptions);
  
  statNumbers.forEach(stat => {
    observer.observe(stat);
  });
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 50;
  const duration = 2000;
  const stepTime = duration / 50;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      element.textContent = target.toLocaleString();
      clearInterval(timer);
    } else {
      element.textContent = Math.floor(current).toLocaleString();
    }
  }, stepTime);
}