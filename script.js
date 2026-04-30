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
    navLinks?.classList.remove('open');
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
    // анимация изменения цены
    priceSpan.style.transform = 'scale(1.05)';
    setTimeout(() => {
      priceSpan.style.transform = 'scale(1)';
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

// добавляем класс reveal всем секциям и карточкам
document.querySelectorAll('.section, .card, .price-card, .team-card, .calculator').forEach(el => {
  el.classList.add('reveal');
});

// создаём плавающие частицы
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

// плавная прокрутка для якорных ссылок
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href !== '#' && href !== '') {
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

// hover-эффект для кнопок с ripple
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = e.clientX - rect.left - size/2 + 'px';
    ripple.style.top = e.clientY - rect.top - size/2 + 'px';
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255,255,255,0.3)';
    ripple.style.transform = 'scale(0)';
    ripple.style.transition = 'transform 0.5s, opacity 0.5s';
    ripple.style.pointerEvents = 'none';
    this.appendChild(ripple);
    setTimeout(() => { ripple.style.transform = 'scale(1)'; ripple.style.opacity = '0'; }, 10);
    setTimeout(() => { ripple.remove(); }, 500);
  });
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
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateNumbers();
      observer.unobserve(entry.target);
    }
  });
});

document.querySelectorAll('.stats').forEach(statBlock => {
  observer.observe(statBlock);
});