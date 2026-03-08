document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. NAVBAR HAMBURGER (FONT AWESOME SWAP)
     ========================================== */
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navLinksContainer = document.querySelector('.nav-links-container');
  
  // Safety Check: Only run if the button exists
  if (hamburgerBtn && navLinksContainer) {
    const menuIcon = hamburgerBtn.querySelector('i'); 

    hamburgerBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');

      // Only swap icon if the <i> tag exists
      if (menuIcon) {
        if (menuIcon.classList.contains('fa-bars')) {
          menuIcon.classList.replace('fa-bars', 'fa-xmark');
        } else {
          menuIcon.classList.replace('fa-xmark', 'fa-bars');
        }
      }
    });

    // Close menu when links are clicked
    const navLinks = document.querySelectorAll('.nav-links');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navLinksContainer.classList.remove('active');
        menuIcon?.classList.replace('fa-xmark', 'fa-bars');
      });
    });
  }

  /* ==========================================
     2. DARK MODE TOGGLE (Matching data-theme="dark")
     ========================================== */
  const themeToggleBtn = document.getElementById('darkModeToggle');
  const rootElement = document.documentElement;

  if (themeToggleBtn) {
    // 1. Initial Sync
    const savedTheme = localStorage.getItem('theme');
    const isActuallyDark = rootElement.getAttribute('data-theme') === 'dark';

    if (savedTheme === 'dark' || (savedTheme === null && isActuallyDark)) {
      rootElement.setAttribute('data-theme', 'dark');
      themeToggleBtn.innerHTML = '☀️'; // Using innerHTML for safety
      localStorage.setItem('theme', 'dark');
    } else {
      rootElement.removeAttribute('data-theme');
      themeToggleBtn.innerHTML = '🌙';
      localStorage.setItem('theme', 'light');
    }

    // 2. Toggle Logic
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme');

      if (currentTheme === 'dark') {
        rootElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggleBtn.innerHTML = '🌙';
      } else {
        rootElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.innerHTML = '☀️';
      }
    });
  }
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
