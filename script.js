// ===== 📱 МОБИЛЬНОЕ МЕНЮ =====
const toggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (toggle && navLinks) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    document.body.classList.toggle('menu-open');
  });

  // закрытие по клику на ссылку
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
    });
  });

  // закрытие при клике вне меню
  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !toggle.contains(e.target)) {
      navLinks.classList.remove('open');
      document.body.classList.remove('menu-open');
    }
  });
}


// ===== ✨ ПЛАВНЫЙ СКРОЛЛ =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});


// ===== 📬 ФОРМА (УЛУЧШЕННАЯ) =====
const form = document.getElementById('contactForm');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const button = form.querySelector('button');
    button.disabled = true;
    button.innerText = 'Отправка...';

    setTimeout(() => {
      button.innerText = 'Отправлено ✓';
      button.style.background = '#00cc66';

      setTimeout(() => {
        alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
        form.reset();
        button.disabled = false;
        button.innerText = 'Отправить';
        button.style.background = '';
      }, 1000);
    }, 1200);
  });
}


// ===== 🎬 АНИМАЦИИ ПРИ СКРОЛЛЕ =====
const fadeElements = document.querySelectorAll(
  '.card, .service-card, .work-card, .process-step, .about-stat, .fade-up'
);

// добавляем базовый класс
fadeElements.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15
});

fadeElements.forEach(el => observer.observe(el));


// ===== 🧠 ПАРАЛЛАКС (ЛЕГКИЙ ВАУ-ЭФФЕКТ) =====
const glow = document.querySelector('.glow');

window.addEventListener('mousemove', (e) => {
  if (!glow) return;

  const x = e.clientX / window.innerWidth;
  const y = e.clientY / window.innerHeight;

  glow.style.transform = `translate(${x * 40}px, ${y * 40}px)`;
});


// ===== 🪄 ХОВЕР-ПОДСВЕТКА КАРТОЧЕК =====
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    card.style.setProperty('--x', `${x}px`);
    card.style.setProperty('--y', `${y}px`);
  });
});


// ===== ⬆️ КНОПКА "НАВЕРХ" =====
const scrollBtn = document.createElement('button');
scrollBtn.innerText = '↑';
scrollBtn.classList.add('scroll-top');
document.body.appendChild(scrollBtn);

scrollBtn.style.cssText = `
  position: fixed;
  bottom: 30px;
  right: 30px;
  padding: 10px 14px;
  border-radius: 50%;
  border: none;
  background: #00cc66;
  color: black;
  font-size: 18px;
  cursor: pointer;
  opacity: 0;
  transition: 0.3s;
  z-index: 999;
`;

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    scrollBtn.style.opacity = '1';
  } else {
    scrollBtn.style.opacity = '0';
  }
});

scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
