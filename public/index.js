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



                          


 
  
// Find all carousel tracks
const allTracks = document.querySelectorAll('.carousel-track');

allTracks.forEach((track) => {
  // Walk forward from the track to find the nearest .carousel-indicators
  let indicatorContainer = track.nextElementSibling;
  while (indicatorContainer && !indicatorContainer.classList.contains('carousel-indicators')) {
    indicatorContainer = indicatorContainer.nextElementSibling;
  }

  // Safety: if we didn't find it, skip this carousel (and log for debug)
  if (!indicatorContainer || !indicatorContainer.classList.contains('carousel-indicators')) {
    console.warn('No carousel-indicators found after this track:', track);
    return;
  }

  const slides = Array.from(track.children);
  let autoPlayTimer;

  // Create dots only if container is empty
  if (indicatorContainer.children.length === 0) {
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('carousel-indicator');
      if (i === 0) dot.classList.add('active');
      indicatorContainer.appendChild(dot);

      // Click to jump to slide
      dot.addEventListener('click', () => {
        stopAutoPlay();
        const slideWidth = slides[0].offsetWidth + 16; // card + gap
        track.scrollTo({
          left: i * slideWidth,
          behavior: 'smooth'
        });
        startAutoPlay();
      });
    });
  }

  const indicators = indicatorContainer.querySelectorAll('.carousel-indicator');

  // Update active dot on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const index = slides.indexOf(entry.target);
        indicators.forEach(d => d.classList.remove('active'));
        if (indicators[index]) indicators[index].classList.add('active');
      }
    });
  }, { root: track, threshold: 0.6 });

  slides.forEach(slide => observer.observe(slide));

  // Auto-swipe
  function startAutoPlay() {
    autoPlayTimer = setInterval(() => {
      const activeDot = indicatorContainer.querySelector('.active');
      const currentIndex = Array.from(indicators).indexOf(activeDot);
      const nextIndex = (currentIndex + 1) % slides.length;

      const slideWidth = slides[0].offsetWidth + 16;
      track.scrollTo({
        left: nextIndex * slideWidth,
        behavior: 'smooth'
      });
    }, 4000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayTimer);
  }

  startAutoPlay();

  // Pause on hover/touch
  track.addEventListener('mouseenter', stopAutoPlay);
  track.addEventListener('mouseleave', startAutoPlay);
  track.addEventListener('touchstart', stopAutoPlay);
  track.addEventListener('touchend', startAutoPlay);
});
