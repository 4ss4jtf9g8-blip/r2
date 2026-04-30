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

// отправка формы (простое демо)
document.querySelectorAll('form').forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Спасибо! Мы свяжемся с вами в ближайшее время.');
    form.reset();
  });
});

console.log('Velion Agency — сайт работает!');