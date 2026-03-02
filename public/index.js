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


document.addEventListener('DOMContentLoaded', function () {
  const carousels = document.querySelectorAll('.carousel-track');

  carousels.forEach((carousel) => {
     const dotsContainer = carousel.parentElement.querySelector('.carousel-indicators');

    if (!dotsContainer) return;

    const cards = carousel.querySelectorAll('.card');
    if (!cards.length) return;

    dotsContainer.innerHTML = '';

    // Create dots
    cards.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('carousel-indicator');
      if (index === 0) dot.classList.add('active');

      dot.addEventListener('click', () => {
        cards[index].scrollIntoView({
          behavior: 'smooth',
          inline: 'start',
          block: 'nearest'
        });
      });

      dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.carousel-indicator');

    // Update active dot on scroll
    carousel.addEventListener('scroll', () => {
      cards.forEach((card, index) => {
        const rect = card.getBoundingClientRect();
        const containerRect = carousel.getBoundingClientRect();

        if (
          rect.left >= containerRect.left - 10 &&
          rect.left < containerRect.left + containerRect.width / 2
        ) {
          dots.forEach(dot => dot.classList.remove('active'));
          dots[index].classList.add('active');
        }
      });
    });
  });
});
  
