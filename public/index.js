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



                          


 
  
  // Select all carousel components
const carousels = document.querySelectorAll('.carousel');

carousels.forEach(carousel => {
  const track = carousel.querySelector('.carousel-track');
  const cards = Array.from(track.children);
  const indicatorsContainer = carousel.querySelector('.carousel-indicators');
  let currentIndex = 0;
  let autoSlideInterval;

  // 1️⃣ Create indicators dynamically
  cards.forEach((_, index) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-indicator');
    if(index === 0) dot.classList.add('active');

    dot.addEventListener('click', () => {
      currentIndex = index;
      scrollToCard(currentIndex);
      resetAutoSlide();
    });

    indicatorsContainer.appendChild(dot);
  });

  // 2️⃣ Scroll to specific card
  function scrollToCard(index) {
    const card = cards[index];
    track.scrollTo({
      left: card.offsetLeft,
      behavior: 'smooth'
    });
    updateIndicators();
  }

  // 3️⃣ Update active indicator
  function updateIndicators() {
    const dots = indicatorsContainer.querySelectorAll('.carousel-indicator');
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
  }

  // 4️⃣ Auto-slide
  function autoSlide() {
    currentIndex = (currentIndex + 1) % cards.length;
    scrollToCard(currentIndex);
  }

  function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    autoSlideInterval = setInterval(autoSlide, 3000); // 3s per slide
  }

  // 5️⃣ Pause on hover/touch
  track.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  track.addEventListener('mouseleave', resetAutoSlide);
  track.addEventListener('touchstart', () => clearInterval(autoSlideInterval));
  track.addEventListener('touchend', resetAutoSlide);

  // Start auto-slide
  resetAutoSlide();
});
