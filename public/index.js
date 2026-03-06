// Wait for the HTML to fully load before running our script
document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. NAVBAR TOGGLE (HAMBURGER MENU)
     ========================================== */
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navLinksContainer = document.querySelector('.nav-links-container');
  const navLinks = document.querySelectorAll('.nav-links');

  // When the hamburger button is clicked
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      // Toggle the 'active' class on the button (for the X animation)
      hamburgerBtn.classList.toggle('active');
      // Toggle the 'active' class on the menu container (to show/hide it)
      navLinksContainer.classList.toggle('active');
    });
  }

  // Optional but recommended: Close the menu when a link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburgerBtn.classList.remove('active');
      navLinksContainer.classList.remove('active');
    });
  });

  /* ==========================================
     2. DARK MODE TOGGLE & LOCAL STORAGE
     ========================================== */
  const themeToggleBtn = document.getElementById('darkModeToggle');
  const body = document.body;

  if (themeToggleBtn) {
    // Check if the user already has a saved preference in their browser
    const currentTheme = localStorage.getItem('theme');

    // If they previously chose dark mode, apply it immediately on page load
    if (currentTheme === 'dark') {
      body.classList.add('dark-mode');
      themeToggleBtn.textContent = '☀️'; // Change icon to Sun
    } else {
      themeToggleBtn.textContent = '🌙'; // Default icon is Moon
    }

    // Listen for clicks on the theme toggle button
    themeToggleBtn.addEventListener('click', () => {
      // Toggle the 'dark-mode' class on the body
      body.classList.toggle('dark-mode');

      // Check if the body now has the dark-mode class
      if (body.classList.contains('dark-mode')) {
        // Save preference as 'dark' and update icon
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = '☀️';
      } else {
        // Save preference as 'light' and update icon
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = '🌙';
      }
    });
  }

});
