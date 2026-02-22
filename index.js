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