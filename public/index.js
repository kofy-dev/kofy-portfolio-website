/* ========================================
   NAVBAR TOGGLE - Mobile Menu
   ======================================== */

// Get navbar elements
const hamburgerBtn = document.querySelector('.hamburger-btn');
const navMenu = document.querySelector('.nav-links-container');

// Toggle menu on hamburger click
hamburgerBtn.addEventListener('click', () => {
  hamburgerBtn.classList.toggle('active');      // Animate hamburger icon
  navMenu.classList.toggle('active');           // Show/hide menu
  // Prevent body scroll when menu is open
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking any nav link or button
const navLinks = document.querySelectorAll('.nav-links, .btn');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburgerBtn.classList.remove('active');     // Reset hamburger icon
    navMenu.classList.remove('active');          // Hide menu
    document.body.style.overflow = '';           // Restore scrolling
  });
});

/* ========================================
   DYNAMIC TEXT TYPING EFFECT
   ======================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Check screen size for responsive text
  const isMobile = window.innerWidth < 768;
  
  // Different words for mobile vs desktop
  const words = isMobile 
    ? ["Web Developer", "UI/UX Designer", "Tech Lead"]        // Shorter for mobile
    : ["Front-end-Developer", "Digital-Designer", "Tech Consultant"]; // Full for desktop
  
  const dynamicTextSpan = document.getElementById("dynamic-text");
  if (!dynamicTextSpan) return;  // Exit if element not found
  
  let wordIndex = 0;     // Current word being typed
  let charIndex = 0;     // Current character being typed

  // Type characters one by one
  function type() {
    if (charIndex < words[wordIndex].length) {
      dynamicTextSpan.textContent += words[wordIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, 100);  // Typing speed
    } else {
      setTimeout(erase, 2000); // Pause before erasing
    }
  }

  // Erase characters one by one
  function erase() {
    if (charIndex > 0) {
      dynamicTextSpan.textContent = words[wordIndex].substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, 50);   // Erasing speed
    } else {
      wordIndex = (wordIndex + 1) % words.length; // Move to next word
      setTimeout(type, 500);   // Pause before typing next
    }
  }

  type(); // Start the animation
});

/* ========================================
   DARK MODE TOGGLE
   ======================================== */

const darkModeToggle = document.getElementById('darkModeToggle');
const root = document.documentElement;  // Target HTML element

// Check for saved theme preference
if (localStorage.getItem('theme') === 'dark') {
  root.classList.add('dark-mode');
  darkModeToggle.textContent = '☀️';  // Sun icon for light mode
} else {
  darkModeToggle.textContent = '🌙';   // Moon icon for dark mode
}

// Toggle dark mode on click
darkModeToggle.addEventListener('click', () => {
  root.classList.toggle('dark-mode');
  
  // Update button icon and save preference
  if (root.classList.contains('dark-mode')) {
    darkModeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    darkModeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
});

/* ========================================
   CAROUSEL / SLIDER for Cards (Mobile Only)
   ======================================== */

document.addEventListener('DOMContentLoaded', function() {
  // Initialize both carousels
  setupCarousel('.service-container', '.service-dots');
  setupCarousel('.work-container', '.work-dots');
});

/**
 * Sets up a horizontal scrolling carousel with dot navigation
 * @param {string} containerSelector - CSS selector for the card container
 * @param {string} dotsSelector - CSS selector for the dots container
 */
function setupCarousel(containerSelector, dotsSelector) {
  // Get elements
  const container = document.querySelector(containerSelector);
  const dotsContainer = document.querySelector(dotsSelector);
  
  // Exit if elements not found
  if (!container || !dotsContainer) {
    console.log('Missing:', containerSelector, dotsSelector); // Debug
    return;
  }
  
  // Get all cards in this container
  const cards = container.querySelectorAll('.card');
  if (cards.length === 0) return;
  
  /* ----------------------------------------
     Create navigation dots
     ---------------------------------------- */
  dotsContainer.innerHTML = ''; // Clear existing dots
  
  cards.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active'); // First dot active by default
    dot.dataset.index = index; // Store card index
    dotsContainer.appendChild(dot);
  });
  
  const dots = dotsContainer.querySelectorAll('.dot');
  const cardWidth = 296; // Card width (280px) + gap (16px)
  
  /* ----------------------------------------
     Update active dot on scroll
     ---------------------------------------- */
  container.addEventListener('scroll', () => {
    const scrollPosition = container.scrollLeft;
    const activeIndex = Math.round(scrollPosition / cardWidth);
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });
  });
  
  /* ----------------------------------------
     Click dot to scroll to corresponding card
     ---------------------------------------- */
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index);
      container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth' // Smooth scrolling animation
      });
    });
  });
       }
  
