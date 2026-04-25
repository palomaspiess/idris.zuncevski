// script.js — Idris Zuncevski personal website

/* ── Mobile navigation toggle ─────────────────────────────── */
(function () {
  const toggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');

  if (toggle && mobileNav) {
    toggle.addEventListener('click', () => {
      const open = mobileNav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open);
    });
  }

  // Mark active nav link
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__links a, .nav__mobile a').forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
})();

/* ── Contact form ─────────────────────────────────────────── */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const successMsg = document.getElementById('formSuccess');
  const submitBtn = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Basic field validation
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!field.value.trim()) {
        field.style.borderColor = '#EF4444';
        valid = false;
      } else {
        field.style.borderColor = '';
      }
    });

    const emailField = form.querySelector('[type="email"]');
    if (emailField && emailField.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
      emailField.style.borderColor = '#EF4444';
      valid = false;
    }

    if (!valid) return;

    // Simulate submission
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';

    setTimeout(() => {
      form.style.display = 'none';
      if (successMsg) {
        successMsg.classList.add('show');
      }
    }, 900);
  });

  // Live validation reset
  form.querySelectorAll('.form-control').forEach(field => {
    field.addEventListener('input', () => {
      field.style.borderColor = '';
    });
  });
})();

/* ── Project filter ───────────────────────────────────────── */
(function () {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card[data-category]');

  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const cat = btn.dataset.filter;
      projectCards.forEach(card => {
        if (cat === 'all' || card.dataset.category === cat) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
})();
