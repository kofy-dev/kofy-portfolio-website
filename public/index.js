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
const container = document.querySelector('.carousel-container');
const indicatorContainer = document.querySelector('.carousel-indicators');
const slides = Array.from(track.children);

let currentIndex = 0;
let autoPlayTimer;
let startX = 0;
let isDragging = false;
let currentTranslate = 0;
let prevTranslate = 0;

// 1. AUTO-GENERATE INDICATORS
slides.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('indicator');
    if (i === 0) dot.classList.add('active');
    dot.dataset.index = i;
    indicatorContainer.appendChild(dot);
});

const indicators = document.querySelectorAll('.indicator');

// 2. MOVE TO SLIDE FUNCTION
const moveToSlide = (index) => {
    const slideWidth = slides[0].offsetWidth;
    track.style.transition = "transform 0.5s ease-out"; // Smooth slide
    track.style.transform = `translateX(-${index * slideWidth}px)`;
    
    // Update active dot
    indicators.forEach(dot => dot.classList.remove('active'));
    indicators[index].classList.add('active');
    
    currentIndex = index;
    prevTranslate = -index * slideWidth;
};

// 3. AUTO-PLAY CONTROL
const startAutoPlay = () => {
    autoPlayTimer = setInterval(() => {
        let nextIndex = (currentIndex + 1) % slides.length;
        moveToSlide(nextIndex);
    }, 5000);
};

const resetTimer = () => {
    clearInterval(autoPlayTimer);
    startAutoPlay();
};

// 4. CLICK INDICATORS (Manual Control)
indicatorContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('indicator')) {
        const targetIndex = parseInt(e.target.dataset.index);
        moveToSlide(targetIndex);
        resetTimer();
    }
});

// 5. MANUAL TOUCH/MOUSE SWIPE LOGIC
const handleDragStart = (e) => {
    startX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    isDragging = true;
    clearInterval(autoPlayTimer); // Pause while user drags
    track.style.transition = "none"; // Fast response while dragging
};

const handleDragMove = (e) => {
    if (!isDragging) return;
    const currentX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
    const diff = currentX - startX;
    track.style.transform = `translateX(${prevTranslate + diff}px)`;
};

const handleDragEnd = (e) => {
    if (!isDragging) return;
    isDragging = false;
    const endX = e.type.includes('touch') ? e.changedTouches[0].clientX : e.clientX;
    const movedBy = endX - startX;

    // If swiped more than 100px, change slide
    if (movedBy < -100 && currentIndex < slides.length - 1) currentIndex++;
    else if (movedBy > 100 && currentIndex > 0) currentIndex--;

    moveToSlide(currentIndex);
    startAutoPlay(); // Restart the clock
};

// EVENT LISTENERS
container.addEventListener('touchstart', handleDragStart);
container.addEventListener('touchmove', handleDragMove);
container.addEventListener('touchend', handleDragEnd);

container.addEventListener('mousedown', handleDragStart);
container.addEventListener('mousemove', handleDragMove);
container.addEventListener('mouseup', handleDragEnd);
container.addEventListener('mouseleave', handleDragEnd);

// RESIZE FIX
window.addEventListener('resize', () => moveToSlide(currentIndex));

// INITIALIZE
startAutoPlay();
