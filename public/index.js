// Navbar Toggle
const hamburgerBtn = document.querySelector('.hamburger-btn');
const navMenu = document.querySelector('.nav-links-container');

hamburgerBtn.addEventListener('click', () => {
  hamburgerBtn.classList.toggle('active');
  navMenu.classList.toggle('active');
  document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});

// Close menu when clicking a link
const navLinks = document.querySelectorAll('.nav-links, .btn');
navLinks.forEach(link => {
  link.addEventListener('click', () => {
    hamburgerBtn.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
  });
});



document.addEventListener('DOMContentLoaded', () => {
    // Check screen width
    const isMobile = window.innerWidth < 768;
    
    // Responsive word selection
    const words = isMobile 
      ? ["Web Developer", "UI/UX Designer", "Tech Lead"] // Shorter mobile words
      : ["Front-end-Developer", "Digital-Designer", "Tech Consultant"]; // Full desktop words
    
    const dynamicTextSpan = document.getElementById("dynamic-text");
    if (!dynamicTextSpan) return;
    
    let wordIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < words[wordIndex].length) {
            dynamicTextSpan.textContent += words[wordIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, 100);
        } else {
            setTimeout(erase, 2000);
        }
    }

    function erase() {
        if (charIndex > 0) {
            dynamicTextSpan.textContent = words[wordIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, 50);
        } else {
            wordIndex = (wordIndex + 1) % words.length;
            setTimeout(type, 500);
        }
    }

    type();
});

const darkModeToggle = document.getElementById('darkModeToggle');
const root = document.documentElement;

if (localStorage.getItem('theme') === 'dark') {
  root.classList.add('dark-mode');
  darkModeToggle.textContent = '☀️';
} else {
  darkModeToggle.textContent = '🌙';
}

darkModeToggle.addEventListener('click', () => {
  root.classList.toggle('dark-mode');
  
  if (root.classList.contains('dark-mode')) {
    darkModeToggle.textContent = '☀️';
    localStorage.setItem('theme', 'dark');
  } else {
    darkModeToggle.textContent = '🌙';
    localStorage.setItem('theme', 'light');
  }
});



   document.addEventListener('DOMContentLoaded', function() {
  // Setup Services Carousel
  setupCarousel('.service-container', '.service-dots');
  
  // Setup Work Carousel
  setupCarousel('.work-container', '.work-dots');
});

function setupCarousel(containerSelector, dotsSelector) {
  const container = document.querySelector(containerSelector);
  const dotsContainer = document.querySelector(dotsSelector);
  
  if (!container || !dotsContainer) return;
  
  const cards = container.querySelectorAll('.card');
  if (cards.length === 0) return;
  
  // Create dots
  dotsContainer.innerHTML = '';
  cards.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.dataset.index = index;
    dotsContainer.appendChild(dot);
  });
  
  const dots = dotsContainer.querySelectorAll('.dot');
  const cardWidth = 296; // 280px + 16px gap
  
  // Update dots on scroll
  container.addEventListener('scroll', () => {
    const scrollPosition = container.scrollLeft;
    const activeIndex = Math.round(scrollPosition / cardWidth);
    
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });
  });
  
  // Click dots to scroll
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.dataset.index);
      container.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    });
  });
}                    
