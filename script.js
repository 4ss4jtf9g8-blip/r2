// мобильное меню
const toggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (toggle) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks) navLinks.classList.remove('open');
  });
});

// форма
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    form.reset();
  });
}

// анимация при скролле
const fadeElements = document.querySelectorAll('.service-card, .work-card, .process-step, .about-stat');
fadeElements.forEach(el => {
  el.classList.add('fade-up');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

fadeElements.forEach(el => observer.observe(el));