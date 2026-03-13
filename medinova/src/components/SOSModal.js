import React, { useEffect } from 'react';
import '../style.css';
import '../App.css';

const SOSModal = ({ show, onClose }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
      
      // Simulate emergency response after 3 seconds
      const timer = setTimeout(() => {
        const modalBody = document.querySelector('.modal-body');
        if (modalBody) {
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
        }
      }, 3000);

      return () => clearTimeout(timer);
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [show]);

  if (!show) return null;

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <span className="close" onClick={onClose}>&times;</span>
        <div className="modal-header">
          <h2>🚨 Emergency Alert</h2>
        </div>
        <div className="modal-body">
          <p>Contacting nearest hospital...</p>
          <div className="loading-spinner"></div>
          <p className="emergency-info">Help is on the way! Please stay calm.</p>
        </div>
      </div>
    </div>
  );
};

export default SOSModal;
