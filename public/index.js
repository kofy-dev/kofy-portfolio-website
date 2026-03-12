document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. NAVBAR HAMBURGER & ICON SWAP --- */
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navLinksContainer = document.querySelector('.nav-links-container');
  
  if (hamburgerBtn && navLinksContainer) {
    const menuIcon = hamburgerBtn.querySelector('i'); 

    hamburgerBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');

      if (menuIcon) {
        // Swaps the FontAwesome icons
        if (menuIcon.classList.contains('fa-bars')) {
          menuIcon.classList.replace('fa-bars', 'fa-xmark');
        } else {
          menuIcon.classList.replace('fa-xmark', 'fa-bars');
        }
      }
    });
  }

  /* --- 2. DARK MODE TOGGLE (data-theme="dark") --- */
  const themeToggleBtn = document.getElementById('darkModeToggle');
  const rootElement = document.documentElement; // This is the <html> tag

  if (themeToggleBtn) {
    // A. Page Load: Check localStorage or existing HTML attribute
    const savedTheme = localStorage.getItem('theme');
    const isCurrentlyDark = rootElement.getAttribute('data-theme') === 'dark';

    if (savedTheme === 'dark' || (savedTheme === null && isCurrentlyDark)) {
      rootElement.setAttribute('data-theme', 'dark');
      themeToggleBtn.textContent = '☀️';
    } else {
      rootElement.removeAttribute('data-theme');
      themeToggleBtn.textContent = '🌙';
    }

    // B. Toggle Event: What happens when you click
    themeToggleBtn.addEventListener('click', () => {
      // Always check the attribute directly from the HTML tag
      const currentTheme = rootElement.getAttribute('data-theme');

      if (currentTheme === 'dark') {
        // Switch to Light Mode
        rootElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = '🌙';
      } else {
        // Switch to Dark Mode
        rootElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = '☀️';
      }
    });
  }
});



                          


 
  
  const track = document.querySelector('.carousel-track');
const indicatorContainer = document.querySelector('.carousel-indicators');
const slides = Array.from(track.children);

let currentIndex = 0;
let autoPlayTimer;

// 1. GENERATE DOTS (Keep this, it's clean)
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('indicator');
    if (i === 0) dot.classList.add('active');
    dot.dataset.index = i;
    indicatorContainer.appendChild(dot);
});
const indicators = document.querySelectorAll('.indicator');

// 2. MOVE FUNCTION (Using ScrollTo instead of Transform)
const moveToSlide = (index) => {
    const slideWidth = track.offsetWidth; // Width of the container
    track.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth' // This makes the auto-swipe look nice
    });
    
    // Update Indicators
    indicators.forEach(dot => dot.classList.remove('active'));
    indicators[index].classList.add('active');
    currentIndex = index;
};

// 3. INDICATOR CLICK
indicatorContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('indicator')) {
        clearInterval(autoPlayTimer);
        const targetIndex = parseInt(e.target.dataset.index);
        moveToSlide(targetIndex);
        startAutoPlay();
    }
});

// 4. SYNC DOTS WHEN USER SWIPES MANUALLY
// This detects when a user swipes with their finger and updates the dots
track.addEventListener('scroll', () => {
    const slideWidth = track.offsetWidth;
    const newIndex = Math.round(track.scrollLeft / slideWidth);
    
    if (newIndex !== currentIndex) {
        indicators.forEach(dot => dot.classList.remove('active'));
        indicators[newIndex].classList.add('active');
        currentIndex = newIndex;
    }
});

// 5. AUTO-SWIPE
const startAutoPlay = () => {
    autoPlayTimer = setInterval(() => {
        let nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
    }, 5000);
};

startAutoPlay();
