document.addEventListener('DOMContentLoaded', () => {

  /* --- 1. NAVBAR HAMBURGER & ICON SWAP --- */
  const hamburgerBtn = document.querySelector('.hamburger-btn');
  const navLinksContainer = document.querySelector('.nav-links-container');
  
  if (hamburgerBtn && navLinksContainer) {
    const menuIcon = hamburgerBtn.querySelector('i'); 

    hamburgerBtn.addEventListener('click', () => {
      navLinksContainer.classList.toggle('active');

      if (menuIcon) {
        if (menuIcon.classList.contains('fa-bars')) {
          menuIcon.classList.replace('fa-bars', 'fa-xmark');
        } else {
          menuIcon.classList.replace('fa-xmark', 'fa-bars');
        }
      }
    });
  }

  /* --- 2. DARK MODE TOGGLE --- */
  const themeToggleBtn = document.getElementById('darkModeToggle');
  const rootElement = document.documentElement;

  if (themeToggleBtn) {
    const savedTheme = localStorage.getItem('theme');
    const isCurrentlyDark = rootElement.getAttribute('data-theme') === 'dark';

    if (savedTheme === 'dark' || (savedTheme === null && isCurrentlyDark)) {
      rootElement.setAttribute('data-theme', 'dark');
      themeToggleBtn.textContent = '☀️';
    } else {
      rootElement.removeAttribute('data-theme');
      themeToggleBtn.textContent = '🌙';
    }

    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = rootElement.getAttribute('data-theme');

      if (currentTheme === 'dark') {
        rootElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeToggleBtn.textContent = '🌙';
      } else {
        rootElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeToggleBtn.textContent = '☀️';
      }
    });
  }

  /* --- 3. EMAILJS --- */
  emailjs.init("zq2MRKabh5XCRysUG");

  const contactForm = document.getElementById("contact-form");

  if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
      e.preventDefault();

      const btn = document.getElementById("submit-btn");
      const toast = document.getElementById("toast");

      btn.textContent = "Sending...";
      btn.disabled = true;

      emailjs.sendForm("service_4tigw68", "template_spb0c0f", this)
        .then(() => {
          btn.textContent = "Send Message 📩";
          btn.disabled = false;
          this.reset();

          toast.style.background = "#22c55e";
          toast.textContent = "✅ Message sent! I'll get back to you soon.";
          toast.classList.add("show");

          setTimeout(() => {
            toast.classList.remove("show");
          }, 4000);
        })
        .catch(() => {
          btn.textContent = "Send Message 📩";
          btn.disabled = false;

          toast.style.background = "#ef4444";
          toast.textContent = "❌ Something went wrong. Please try again.";
          toast.classList.add("show");

          setTimeout(() => {
            toast.classList.remove("show");
            toast.style.background = "#22c55e";
            toast.textContent = "✅ Message sent! I'll get back to you soon.";
          }, 4000);
        });
    });
  }

});

/* --- 4. CAROUSEL --- */
const allTracks = document.querySelectorAll('.carousel-track');

allTracks.forEach((track) => {
  let indicatorContainer = track.nextElementSibling;
  while (indicatorContainer && !indicatorContainer.classList.contains('carousel-indicators')) {
    indicatorContainer = indicatorContainer.nextElementSibling;
  }

  if (!indicatorContainer || !indicatorContainer.classList.contains('carousel-indicators')) {
    console.warn('No carousel-indicators found after this track:', track);
    return;
  }

  const slides = Array.from(track.children);
  let autoPlayTimer;

  if (indicatorContainer.children.length === 0) {
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('carousel-indicator');
      if (i === 0) dot.classList.add('active');
      indicatorContainer.appendChild(dot);

      dot.addEventListener('click', () => {
        stopAutoPlay();
        const slideWidth = slides[0].offsetWidth + 16;
        track.scrollTo({
          left: i * slideWidth,
          behavior: 'smooth'
        });
        startAutoPlay();
      });
    });
  }

  const indicators = indicatorContainer.querySelectorAll('.carousel-indicator');

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

  track.addEventListener('mouseenter', stopAutoPlay);
  track.addEventListener('mouseleave', startAutoPlay);
  track.addEventListener('touchstart', stopAutoPlay);
  track.addEventListener('touchend', startAutoPlay);
});

/* --- 5. TYPING ANIMATION --- */
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
  if (!typingElement) return;
  const currentPhrase = phrases[phraseIndex];
  const speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex <= currentPhrase.length) {
    typingElement.textContent = currentPhrase.substring(0, charIndex);
    charIndex++;
    setTimeout(type, speed);
  } else if (isDeleting && charIndex > 0) {
    typingElement.textContent = currentPhrase.substring(0, charIndex);
    charIndex--;
    setTimeout(type, speed);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      phraseIndex = (phraseIndex + 1) % phrases.length;
    }
    setTimeout(type, 1500);
  }
}

type();

/* --- 6. HERO PARTICLES --- */
const canvas = document.getElementById('hero-canvas');

if (canvas) {
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

    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(121, 80, 242, 0.5)';
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  draw();
}
window.onscroll = function() { moveProgressBar() };

function moveProgressBar() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
      }

/* --- 7. SCROLL ANIMATIONS --- */
const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

revealElements.forEach(el => revealObserver.observe(el));
