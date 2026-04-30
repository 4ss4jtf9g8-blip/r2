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

// калькулятор
const serviceSelect = document.getElementById('serviceType');
const pagesField = document.getElementById('pagesField');
const complexityField = document.getElementById('complexityField');
const pagesInput = document.getElementById('pages');
const complexitySelect = document.getElementById('complexity');
const adminCheck = document.getElementById('needsAdmin');
const crmCheck = document.getElementById('needsCrm');
const priceSpan = document.getElementById('calculatedPrice');

function toggleCalculatorFields() {
  const service = serviceSelect?.value;
  if (pagesField) pagesField.style.display = 'none';
  if (complexityField) complexityField.style.display = 'none';
  
  if (service === 'redesign' || service === 'from-scratch') {
    if (pagesField) pagesField.style.display = 'block';
  } else if (service === 'bot') {
    if (complexityField) complexityField.style.display = 'block';
  }
}

function updatePrice() {
  let base = 0;
  const service = serviceSelect?.value;
  let pages = parseInt(pagesInput?.value) || 1;
  if (pages < 1) pages = 1;
  
  const complexity = complexitySelect?.value;

  if (service === 'landing') {
    base = 2000;
  } else if (service === 'redesign') {
    base = 3200 + (pages - 1) * 700;
  } else if (service === 'from-scratch') {
    base = 5000 + (pages - 1) * 800;
  } else if (service === 'bot') {
    if (complexity === 'easy') base = 3700;
    else if (complexity === 'medium') base = 6000;
    else if (complexity === 'hard') base = 9000;
  } else if (service === 'support') {
    base = 1000;
  }

  if (adminCheck?.checked && service !== 'support') base += 3000;
  if (crmCheck?.checked && service !== 'support') base += 5000;

  if (priceSpan) {
    priceSpan.innerText = base.toLocaleString('ru-RU');
  }
}

if (serviceSelect) {
  serviceSelect.addEventListener('change', () => {
    toggleCalculatorFields();
    updatePrice();
  });
  if (pagesInput) pagesInput.addEventListener('input', updatePrice);
  if (complexitySelect) complexitySelect.addEventListener('change', updatePrice);
  if (adminCheck) adminCheck.addEventListener('change', updatePrice);
  if (crmCheck) crmCheck.addEventListener('change', updatePrice);
  toggleCalculatorFields();
  updatePrice();
}

// формы
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Спасибо! Мы свяжемся с вами.');
    form.reset();
  });
});

// анимация
const fadeElements = document.querySelectorAll('.card, .team-card, .price-card, .stat, .case-card, .calculator, .cta-section');

fadeElements.forEach(el => {
  el.classList.add('fade-up');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -20px 0px' });

fadeElements.forEach(el => observer.observe(el));