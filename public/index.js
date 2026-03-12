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



                          


 
  
  // 1. Find all tracks on the page
const allTracks = document.querySelectorAll('.carousel-track');

allTracks.forEach((track) => {
  // 2. Find the indicators div that is placed right after the track in your HTML
  const indicatorContainer = track.nextElementSibling;
  
  // Safety check: make sure the next element is actually the indicators div
  if (!indicatorContainer || !indicatorContainer.classList.contains('carousel-indicators')) {
    return; 
  }

  const slides = Array.from(track.children);
  let autoPlayTimer;

  // 3. Create the dots
  indicatorContainer.innerHTML = ''; // Clear it first
  slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('carousel-indicator'); // Matches your CSS
    if (i === 0) dot.classList.add('active');
    indicatorContainer.appendChild(dot);

    // Manual Click
    dot.addEventListener('click', () => {
      stopAutoPlay();
      const slideWidth = slides[0].offsetWidth + 16; // 16 is your --space-16 gap
      track.scrollTo({
        left: i * slideWidth,
        behavior: 'smooth'
      });
      startAutoPlay();
    });
  });

  const indicators = indicatorContainer.querySelectorAll('.carousel-indicator');

  // 4. Update dots when user swipes manually (Intersection Observer)
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

  // 5. Auto-Swipe Logic
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

  // 6. Initialize
  startAutoPlay();
  
  // Pause when mouse is over the track
  track.addEventListener('mouseenter', stopAutoPlay);
  track.addEventListener('mouseleave', startAutoPlay);
});
