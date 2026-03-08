document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. NAVBAR HAMBURGER (FONT AWESOME SWAP)
     ========================================== */
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navLinksContainer = document.querySelector('.nav-links-container');
  // Get the FontAwesome <i> tag inside the button
  const menuIcon = hamburgerBtn.querySelector('i'); 

  if (hamburgerBtn && menuIcon) {
    hamburgerBtn.addEventListener('click', () => {
      // Toggle the menu visibility
      navLinksContainer.classList.toggle('active');

      // Swap the FontAwesome icon between 'bars' and 'X'
      if (menuIcon.classList.contains('fa-bars')) {
        menuIcon.classList.remove('fa-bars');
        menuIcon.classList.add('fa-xmark'); // Use 'fa-times' if you are on FontAwesome 5
      } else {
        menuIcon.classList.remove('fa-xmark');
        menuIcon.classList.add('fa-bars');
      }
    });
  }

  // Close the menu automatically when a link is clicked
  const navLinks = document.querySelectorAll('.nav-links');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('active');
      // Reset the icon back to bars
      menuIcon.classList.remove('fa-xmark');
      menuIcon.classList.add('fa-bars');
    });
  });

  /* ==========================================
     2. DARK MODE TOGGLE (HTML ROOT ELEMENT)
     ========================================== */
  const themeToggleBtn = document.getElementById('darkModeToggle');
  const rootElement = document.documentElement; // This targets the <html> tag

  if (themeToggleBtn) {
    // Check if the user already has a saved preference
    const savedTheme = localStorage.getItem('theme');

    // If they previously chose dark mode, set the attribute on the HTML tag
    if (savedTheme === 'darkmode') {
      rootElement.setAttribute('dark-theme', 'darkmode');
      themeToggleBtn.textContent = '☀️'; 
    } else {
      themeToggleBtn.textContent = '🌙'; 
    }

    // Listen for clicks on the toggle button
    themeToggleBtn.addEventListener('click', () => {
      // Check if the html tag currently has the dark-theme attribute
      const isDarkMode = rootElement.getAttribute('dark-theme') === 'darkmode';

      if (isDarkMode) {
        // Switch to Light Mode: Remove the attribute and save
        rootElement.removeAttribute('dark-theme');
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = '🌙';
      } else {
        // Switch to Dark Mode: Add the attribute and save
        rootElement.setAttribute('dark-theme', 'darkmode');
        localStorage.setItem('theme', 'darkmode');
        themeToggleBtn.textContent = '☀️';
      }
    });
  }

});
