// ============================
// NAVBAR SCROLL EFFECT
// ============================
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ============================
// HAMBURGER MENU
// ============================
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// ============================
// DYNAMIC ROLE TYPING EFFECT
// ============================
const roles = [
  'FullStack Apps',
  'AI Solutions',
  'ML Models',
  'Intelligent Systems'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const roleEl = document.getElementById('dynamicRole');

function typeRole() {
  const currentRole = roles[roleIndex];

  if (!isDeleting) {
    roleEl.textContent = currentRole.slice(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentRole.length) {
      isDeleting = true;
      setTimeout(typeRole, 1800);
      return;
    }
  } else {
    roleEl.textContent = currentRole.slice(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }
  }
  setTimeout(typeRole, isDeleting ? 60 : 90);
}
typeRole();

// ============================
// PARTICLE CANVAS
// ============================
const canvas = document.getElementById('particleCanvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.opacity = Math.random() * 0.5 + 0.1;
    this.speedX = (Math.random() - 0.5) * 0.3;
    this.speedY = (Math.random() - 0.5) * 0.3;
    this.color = Math.random() > 0.5 ? '#8b5cf6' : '#06b6d4';
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
      this.reset();
    }
  }
  draw() {
    ctx.save();
    ctx.globalAlpha = this.opacity;
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }
}

for (let i = 0; i < 80; i++) {
  particles.push(new Particle());
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => {
    p.update();
    p.draw();
  });
  // Draw connecting lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        ctx.save();
        ctx.globalAlpha = (1 - dist / 120) * 0.15;
        ctx.strokeStyle = '#8b5cf6';
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
        ctx.restore();
      }
    }
  }
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ============================
// SCROLL REVEAL ANIMATION
// ============================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

function addRevealClass(selectors, delayStep = 80) {
  selectors.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, index) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${index * delayStep}ms`;
      revealObserver.observe(el);
    });
  });
}

addRevealClass([
  '.about-card',
  '.about-bio',
  '.skill-category',
  '.project-card',
  '.cert-card',
  '.timeline-item',
  '.contact-card',
  '.contact-cta',
  '.section-header'
], 80);

// ============================
// ACTIVE NAV LINK ON SCROLL
// ============================
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinksAll.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(section => sectionObserver.observe(section));

// Active nav link style
const styleTag = document.createElement('style');
styleTag.textContent = `.nav-link.active { color: var(--clr-text) !important; }
.nav-link.active::after { width: 100% !important; }`;
document.head.appendChild(styleTag);

// ============================
// COUNTER ANIMATION
// ============================
function animateCounter(el, target, duration = 1500, isFloat = false) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) {
      start = target;
      clearInterval(timer);
    }
    el.textContent = isFloat ? start.toFixed(2) : Math.floor(start);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      document.querySelectorAll('.stat-value').forEach(el => {
        const val = parseFloat(el.textContent);
        const isFloat = el.textContent.includes('.');
        animateCounter(el, val, 1200, isFloat);
      });
      statsObserver.disconnect();
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

// ============================
// SMOOTH HOVER TILT ON CARDS
// ============================
document.querySelectorAll('.project-card, .cert-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -5;
    const rotateY = ((x - centerX) / centerX) * 5;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ============================
// DOWNLOAD RESUME
// ============================
function downloadResume() {
  // Download the PDF resume from assets folder
  const resumeUrl = 'assets/Ram_Ji_Resume.pdf';
  
  // Create a temporary anchor element to trigger download
  const link = document.createElement('a');
  link.href = resumeUrl;
  link.download = 'Ram_Ji_Resume.pdf';
  link.style.display = 'none';
  
  // Check if file exists before downloading
  fetch(resumeUrl, { method: 'HEAD' })
    .then(response => {
      if (response.ok) {
        // File exists, proceed with download
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      } else {
        alert('Resume file not found. Please upload your resume PDF to assets/Ram_Ji_Resume.pdf');
      }
    })
    .catch(error => {
      // If fetch fails, try downloading anyway
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
}

// Add event listeners to download buttons
const downloadBtn = document.getElementById('downloadResumeBtn');
const heroDownloadBtn = document.getElementById('heroDownloadResumeBtn');

if (downloadBtn) {
  downloadBtn.addEventListener('click', downloadResume);
}

if (heroDownloadBtn) {
  heroDownloadBtn.addEventListener('click', downloadResume);
}
