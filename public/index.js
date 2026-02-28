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
  const workContainer = document.querySelector('.work-container');
  const dotsContainer = document.querySelector('.carousel-dots');
  const cards = document.querySelectorAll('.work-container .card');
  
  // Clear and create dots
  dotsContainer.innerHTML = '';
  cards.forEach((_, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    if (index === 0) dot.classList.add('active');
    dot.dataset.index = index;
    dot.setAttribute('aria-label', `Go to card ${index + 1}`);
    dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.dot');
  const cardWidth = 296; // 280px card + 16px gap
  
  // Update active dot on scroll
  workContainer.addEventListener('scroll', () => {
    const scrollPosition = workContainer.scrollLeft;
    const activeIndex = Math.round(scrollPosition / cardWidth);
    
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === activeIndex);
    });
  });
  
  // Click dot to scroll
  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      workContainer.scrollTo({
        left: index * cardWidth,
        behavior: 'smooth'
      });
    });
  });
});
