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



                          


 
  
  const allCarousels = document.querySelectorAll('.carousel-container');

allCarousels.forEach((container) => {
    const track = container.querySelector('.carousel-track');
    const indicatorContainer = container.querySelector('.carousel-indicators');
    const slides = Array.from(track.children);
    
    let currentIndex = 0;
    let autoPlayTimer;

    // 1. CLEAR & GENERATE DOTS
    indicatorContainer.innerHTML = ''; 
    slides.forEach((_, i) => {
        const dot = document.createElement('div');
        dot.classList.add('carousel-indicator'); // Matches your CSS
        if (i === 0) dot.classList.add('active');
        dot.dataset.index = i;
        indicatorContainer.appendChild(dot);
    });

    const indicators = indicatorContainer.querySelectorAll('.carousel-indicator');

    // 2. MOVE FUNCTION
    const moveToSlide = (index) => {
        // We calculate the gap + the card width (280px + 16px gap)
        const style = window.getComputedStyle(track);
        const gap = parseInt(style.columnGap) || 16;
        const slideWidth = slides[0].offsetWidth + gap;

        track.scrollTo({
            left: index * slideWidth,
            behavior: 'smooth'
        });
        
        currentIndex = index;
    };

    // 3. INDICATOR CLICK
    indicatorContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('carousel-indicator')) {
            clearInterval(autoPlayTimer);
            const targetIndex = parseInt(e.target.dataset.index);
            moveToSlide(targetIndex);
            startAutoPlay();
        }
    });

    // 4. SYNC DOTS ON MANUAL SCROLL
    track.addEventListener('scroll', () => {
        const style = window.getComputedStyle(track);
        const gap = parseInt(style.columnGap) || 16;
        const slideWidth = slides[0].offsetWidth + gap;
        
        // Use Math.round to find which card is most visible
        const newIndex = Math.round(track.scrollLeft / slideWidth);
        
        if (newIndex !== currentIndex && indicators[newIndex]) {
            indicators.forEach(dot => dot.classList.remove('active'));
            indicators[newIndex].classList.add('active');
            currentIndex = newIndex;
        }
    }, { passive: true });

    // 5. AUTO-PLAY
    const startAutoPlay = () => {
        autoPlayTimer = setInterval(() => {
            // Only auto-swipe if the user isn't hovering
            let nextIndex = (currentIndex + 1) % slides.length;
            moveToSlide(nextIndex);
        }, 4000);
    };

    // 6. INITIALIZE
    startAutoPlay();
    
    // Optional: Pause on hover
    container.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    container.addEventListener('mouseleave', startAutoPlay);
});
