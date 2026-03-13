// Search and Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  const filterButtons = document.querySelectorAll('.filter-btn');
  const specialistCards = document.querySelectorAll('.specialist-card');

  // Search functionality
  searchInput.addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    filterSpecialists(searchTerm, getActiveFilter());
  });

  // Filter button functionality
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      this.classList.add('active');
      
      const filter = this.getAttribute('data-filter');
      const searchTerm = searchInput.value.toLowerCase().trim();
      filterSpecialists(searchTerm, filter);
    });
  });

  function getActiveFilter() {
    const activeButton = document.querySelector('.filter-btn.active');
    return activeButton ? activeButton.getAttribute('data-filter') : 'all';
  }

  function filterSpecialists(searchTerm, filter) {
    specialistCards.forEach(card => {
      const specialty = card.getAttribute('data-specialty');
      const doctorName = card.querySelector('h3').textContent.toLowerCase();
      const doctorSpecialty = card.querySelector('.specialty').textContent.toLowerCase();
      
      // Check if matches filter
      const matchesFilter = filter === 'all' || specialty === filter;
      
      // Check if matches search term
      const matchesSearch = !searchTerm || 
        doctorName.includes(searchTerm) || 
        doctorSpecialty.includes(searchTerm);
      
      // Show or hide card
      if (matchesFilter && matchesSearch) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  }

  // Book Appointment button functionality
  const bookButtons = document.querySelectorAll('.specialist-actions .btn-primary');
  bookButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const doctorName = this.closest('.specialist-card').querySelector('h3').textContent;
      // Redirect to appointment page or show modal
      window.location.href = 'appointment.html?doctor=' + encodeURIComponent(doctorName);
    });
  });

  // View Profile button functionality
  const profileButtons = document.querySelectorAll('.specialist-actions .btn-outline');
  profileButtons.forEach(button => {
    button.addEventListener('click', function(e) {
      e.preventDefault();
      const doctorName = this.closest('.specialist-card').querySelector('h3').textContent;
      alert('Profile page for ' + doctorName + ' coming soon!');
    });
  });

  // Load More button functionality
  const loadMoreBtn = document.querySelector('.load-more .btn');
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', function() {
      alert('Loading more specialists...');
      // In a real application, this would fetch more data from an API
    });
  }
});

