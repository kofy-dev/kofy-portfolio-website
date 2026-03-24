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



      const phrases = [
  "Frontend Dev",
  "Tech Consultant",
  "Web Developer"
];

const typingElement = document.getElementById("typing-text");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentPhrase = phrases[phraseIndex];
  const speed = isDeleting ? 50 : 100; // faster delete, slower type

  if (!isDeleting && charIndex <= currentPhrase.length) {
    // Typing
    typingElement.textContent = currentPhrase.substring(0, charIndex);
    charIndex++;
    setTimeout(type, speed);
  } else if (isDeleting && charIndex > 0) {
    // Deleting
    typingElement.textContent = currentPhrase.substring(0, charIndex);
    charIndex--;
    setTimeout(type, speed);
  } else {
    // Finished typing or deleting — switch state
    isDeleting = !isDeleting;

    if (!isDeleting) {
      // Move to next phrase
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    // Small pause before next action
    setTimeout(type, 1500); // 1.5s pause after typing full phrase
  }
}

// Start the animation
type();



// HERO PARTICLES
const canvas = document.getElementById('hero-canvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}
resize();
window.addEventListener('resize', resize);

const particles = Array.from({ length: 60 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: (Math.random() - 0.5) * 0.5,
  vy: (Math.random() - 0.5) * 0.5,
  r: Math.random() * 2 + 1,
}));

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw connections
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(121, 80, 242, ${(1 - dist / 120) * 0.3})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }

  // Draw dots
  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;

    // Bounce off edges
    if (p.x < 0 || p.x > canvas.width)  p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(121, 80, 242, 0.5)';
    ctx.fill();
  });

  requestAnimationFrame(draw);
}

draw();




// EmailJS
emailjs.init("zq2MRKabh5XCRysUG");

document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const btn = document.getElementById("submit-btn");
  const successMsg = document.getElementById("success-msg");
  const errorMsg = document.getElementById("error-msg");

  // Change button text while sending
  btn.textContent = "Sending...";
  btn.disabled = true;

  emailjs.sendForm("service_4tigw68", "template_spb0c0f", this)
    .then(() => {
      // Success
      successMsg.style.display = "block";
      errorMsg.style.display = "none";
      btn.textContent = "Send Message 📩";
      btn.disabled = false;
      this.reset();
    })
    .catch(() => {
      // Error
      errorMsg.style.display = "block";
      successMsg.style.display = "none";
      btn.textContent = "Send Message 📩";
      btn.disabled = false;
    });
});
