// мобильное меню
const toggle = document.getElementById('mobileToggle');
const navLinks = document.getElementById('navLinks');

if (toggle) {
  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });
}

// закрываем меню при клике на ссылку
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if (navLinks) navLinks.classList.remove('open');
  });
});

// калькулятор цен
const serviceSelect = document.getElementById('serviceType');
const pagesInput = document.getElementById('pages');
const adminCheck = document.getElementById('needsAdmin');
const crmCheck = document.getElementById('needsCrm');
const priceSpan = document.getElementById('calculatedPrice');

function updatePrice() {
  let base = 0;
  const service = serviceSelect?.value;
  let pages = parseInt(pagesInput?.value) || 1;
  if (pages < 1) pages = 1;

  if (service === 'redesign') {
    base = 35000;
    base += (pages - 1) * 3500;
    if (adminCheck?.checked) base += 8000;
    if (crmCheck?.checked) base += 12000;
  } else if (service === 'landing') {
    base = 18000;
  } else if (service === 'bot') {
    base = 25000;
    if (adminCheck?.checked) base += 10000;
    if (crmCheck?.checked) base += 8000;
  } else if (service === 'support') {
    base = 8000;
  }

  if (priceSpan) {
    priceSpan.style.transform = 'scale(1.05)';
    setTimeout(() => {
      if (priceSpan) priceSpan.style.transform = 'scale(1)';
    }, 200);
    priceSpan.innerText = base.toLocaleString('ru-RU');
  }
}

if (serviceSelect) {
  serviceSelect.addEventListener('change', updatePrice);
  if (pagesInput) pagesInput.addEventListener('input', updatePrice);
  if (adminCheck) adminCheck.addEventListener('change', updatePrice);
  if (crmCheck) crmCheck.addEventListener('change', updatePrice);
  updatePrice();
}

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');

const revealOnScroll = () => {
  revealElements.forEach(el => {
    const rect = el.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    if (rect.top < windowHeight - 100) {
      el.classList.add('visible');
    }
  });
};

window.addEventListener('scroll', revealOnScroll);
revealOnScroll();

// добавляем класс reveal всем секциям и карточкам, если их нет
document.querySelectorAll('.section, .card, .price-card, .team-card, .calculator, .hero, .footer-grid').forEach(el => {
  if (!el.classList.contains('reveal')) {
    el.classList.add('reveal');
  }
});

// создаём плавающие частицы (только если их ещё нет)
if (document.querySelectorAll('.particle').length === 0) {
  function createParticles() {
    const particleCount = 50;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.animationDelay = Math.random() * 15 + 's';
      particle.style.animationDuration = 10 + Math.random() * 10 + 's';
      particle.style.opacity = 0.2 + Math.random() * 0.5;
      particle.style.width = (1 + Math.random() * 3) + 'px';
      particle.style.height = particle.style.width;
      document.body.appendChild(particle);
    }
  }
  createParticles();
}

// плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '' && href !== '/') {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  });
});

// лоадер при загрузке страницы
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.classList.add('hide');
    }, 500);
  }
});

// счётчик для stats с анимацией
const animateNumbers = () => {
  const stats = document.querySelectorAll('.stat h3');
  stats.forEach(stat => {
    const text = stat.innerText;
    const number = parseInt(text);
    if (!isNaN(number) && !stat.hasAttribute('data-animated')) {
      stat.setAttribute('data-animated', 'true');
      let current = 0;
      const increment = number / 50;
      const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
          stat.innerText = text;
          clearInterval(timer);
        } else {
          stat.innerText = Math.floor(current) + (text.includes('★') ? '★' : '');
        }
      }, 20);
    }
  });
};

// запускаем анимацию цифр при появлении
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateNumbers();
      statsObserver.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('.stats').forEach(statBlock => {
  statsObserver.observe(statBlock);
});

// предотвращаем конфликты с формами
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    form.reset();
  });
});

console.log('Velion Agency — сайт полностью загружен и работает!');