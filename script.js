/* ─── NAV SCROLL ─────────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ─── MOBILE MENU ────────────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ─── COUNTDOWN TIMER ────────────────────────────────────────── */
const weddingDate = new Date('2026-09-12T16:00:00');
function updateCountdown() {
  const now  = new Date();
  const diff = weddingDate - now;
  if (diff <= 0) {
    document.querySelector('.countdown-section').innerHTML =
      '<p class="countdown-label" style="font-size:1.6rem">Today is the day! 🎉</p>';
    return;
  }
  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs  = Math.floor((diff % (1000 * 60)) / 1000);
  document.getElementById('cd-days').textContent  = String(days).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(hours).padStart(2,'0');
  document.getElementById('cd-mins').textContent  = String(mins).padStart(2,'0');
  document.getElementById('cd-secs').textContent  = String(secs).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ─── SCROLL ANIMATIONS ──────────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 120);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-aos], .timeline-item, .venue-img-wrap, .venue-info, .masonry-item').forEach(el => {
  observer.observe(el);
});

/* ─── RSVP FORM ──────────────────────────────────────────────── */
const form    = document.getElementById('rsvp-form');
const success = document.getElementById('form-success');
const btn     = document.getElementById('rsvp-submit');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }
  // Simulate async send
  btn.textContent = 'Sending...';
  btn.disabled = true;
  await new Promise(r => setTimeout(r, 1200));
  btn.hidden   = true;
  success.hidden = false;
  form.querySelectorAll('input, select, textarea').forEach(el => el.disabled = true);
});

/* ─── GALLERY LIGHTBOX ───────────────────────────────────────── */
const masItems = document.querySelectorAll('.masonry-item');
// Create lightbox
const lb = document.createElement('div');
lb.id = 'lightbox';
lb.style.cssText = `
  display:none; position:fixed; inset:0; z-index:999;
  background:rgba(44,36,24,0.92); backdrop-filter:blur(12px);
  align-items:center; justify-content:center; cursor:zoom-out;
`;
const lbImg = document.createElement('img');
lbImg.style.cssText = `
  max-width:90vw; max-height:88vh; border-radius:12px;
  box-shadow:0 32px 80px rgba(0,0,0,0.5);
  object-fit:contain; width:auto; height:auto;
`;
const lbClose = document.createElement('button');
lbClose.innerHTML = '&times;';
lbClose.style.cssText = `
  position:absolute; top:1.5rem; right:2rem;
  font-size:2.5rem; color:white; background:none; border:none;
  cursor:pointer; line-height:1;
`;
lb.appendChild(lbImg);
lb.appendChild(lbClose);
document.body.appendChild(lb);

masItems.forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    lbImg.src = src;
    lb.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});
[lb, lbClose].forEach(el => {
  el.addEventListener('click', () => {
    lb.style.display = 'none';
    document.body.style.overflow = '';
  });
});
lbImg.addEventListener('click', e => e.stopPropagation());

/* ─── SMOOTH ANCHOR OFFSET (for fixed nav) ───────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = nav.offsetHeight + 16;
    window.scrollTo({ top: target.offsetTop - offset, behavior: 'smooth' });
  });
});
