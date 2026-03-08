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
   DARK MODE TOGGLE (Matching data-theme="dark")
   ========================================== */
const themeToggleBtn = document.getElementById('darkModeToggle');
const rootElement = document.documentElement; // This is your <html> tag

if (themeToggleBtn) {
    // 1. Sync on page load
    const savedTheme = localStorage.getItem('theme');
    
    // Check if there is a saved preference OR if the HTML already has the attribute
    if (savedTheme === 'dark' || (savedTheme === null && rootElement.getAttribute('data-theme') === 'dark')) {
        rootElement.setAttribute('data-theme', 'dark');
        themeToggleBtn.textContent = '☀️';
    } else {
        rootElement.removeAttribute('data-theme');
        themeToggleBtn.textContent = '🌙';
    }

    // 2. The Toggle Logic
    themeToggleBtn.addEventListener('click', () => {
        // Check the current attribute value
        const currentTheme = rootElement.getAttribute('data-theme');

        if (currentTheme === 'dark') {
            // SWITCH TO LIGHT MODE
            rootElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
            themeToggleBtn.textContent = '🌙';
        } else {
            // SWITCH TO DARK MODE
            rootElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
            themeToggleBtn.textContent = '☀️';
        }
    });
}
