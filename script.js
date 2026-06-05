/* ─── NAV SCROLL ──────────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ─── MOBILE MENU ─────────────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav-links');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ─── COUNTDOWN ───────────────────────────────────────────────── */
const weddingDate = new Date('2026-09-12T16:00:00');
function updateCountdown() {
  const diff = weddingDate - new Date();
  if (diff <= 0) {
    document.querySelector('.countdown-section').innerHTML =
      '<p class="countdown-label">Today is the day! 👑</p>';
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('cd-days').textContent  = String(d).padStart(2,'0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2,'0');
  document.getElementById('cd-mins').textContent  = String(m).padStart(2,'0');
  document.getElementById('cd-secs').textContent  = String(s).padStart(2,'0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ─── FUNCTION SLIDER ─────────────────────────────────────────── */
const track   = document.getElementById('sliderTrack');
const slides  = document.querySelectorAll('.slide');
const dots    = document.querySelectorAll('.slider-dot');
const thumbs  = document.querySelectorAll('.slider-thumb');
const progDots= document.querySelectorAll('.slide-prog-dot');
const prevBtn = document.getElementById('sliderPrev');
const nextBtn = document.getElementById('sliderNext');
let current   = 0;
let autoPlay  = null;

function goToSlide(idx) {
  // Deactivate current
  slides[current].classList.remove('active');
  dots[current].classList.remove('active');
  thumbs[current].classList.remove('active');
  progDots[current] && progDots[current].classList.remove('active');

  current = (idx + slides.length) % slides.length;

  // Activate new
  slides[current].classList.add('active');
  dots[current].classList.add('active');
  thumbs[current].classList.add('active');
  progDots[current] && progDots[current].classList.add('active');

  // Move track
  track.style.transform = `translateX(-${current * 100}%)`;
}

function startAutoPlay() {
  stopAutoPlay();
  autoPlay = setInterval(() => goToSlide(current + 1), 5500);
}
function stopAutoPlay() {
  if (autoPlay) clearInterval(autoPlay);
}

prevBtn.addEventListener('click', () => { goToSlide(current - 1); startAutoPlay(); });
nextBtn.addEventListener('click', () => { goToSlide(current + 1); startAutoPlay(); });

dots.forEach(d  => d.addEventListener('click',  () => { goToSlide(+d.dataset.dot);   startAutoPlay(); }));
thumbs.forEach(t => t.addEventListener('click', () => { goToSlide(+t.dataset.thumb); startAutoPlay(); }));
progDots.forEach(p => p.addEventListener('click', () => { goToSlide(+p.dataset.idx); startAutoPlay(); }));

// Touch/swipe support
let touchStartX = 0;
const sliderWrapper = document.getElementById('slider');
sliderWrapper.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
sliderWrapper.addEventListener('touchend', e => {
  const dx = e.changedTouches[0].clientX - touchStartX;
  if (Math.abs(dx) > 50) {
    dx < 0 ? goToSlide(current + 1) : goToSlide(current - 1);
    startAutoPlay();
  }
});

// Pause on hover
sliderWrapper.addEventListener('mouseenter', stopAutoPlay);
sliderWrapper.addEventListener('mouseleave', startAutoPlay);

startAutoPlay();

/* ─── SCROLL ANIMATIONS ───────────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 130);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('[data-aos], .timeline-item, .venue-img-wrap, .venue-info, .masonry-item').forEach(el => {
  observer.observe(el);
});

/* ─── RSVP FORM ───────────────────────────────────────────────── */
const form    = document.getElementById('rsvp-form');
const success = document.getElementById('form-success');
const btn     = document.getElementById('rsvp-submit');

form.addEventListener('submit', async e => {
  e.preventDefault();
  if (!form.checkValidity()) { form.reportValidity(); return; }
  btn.textContent = 'Sending...';
  btn.disabled = true;
  await new Promise(r => setTimeout(r, 1400));
  btn.hidden = true;
  success.hidden = false;
  form.querySelectorAll('input, select, textarea').forEach(el => el.disabled = true);
});

/* ─── GALLERY LIGHTBOX ────────────────────────────────────────── */
const lb    = document.createElement('div');
lb.id = 'lightbox';
lb.style.cssText = `
  display:none; position:fixed; inset:0; z-index:999;
  background:rgba(8,11,18,0.96); backdrop-filter:blur(16px);
  align-items:center; justify-content:center; cursor:zoom-out;
`;
const lbImg = document.createElement('img');
lbImg.style.cssText = `
  max-width:88vw; max-height:86vh; border-radius:12px;
  box-shadow:0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(201,151,42,0.2);
  object-fit:contain; width:auto; height:auto;
`;
const lbClose = document.createElement('button');
lbClose.innerHTML = '&times;';
lbClose.style.cssText = `
  position:absolute; top:1.5rem; right:2rem;
  font-size:2.5rem; color:rgba(245,237,224,0.6); background:none;
  border:none; cursor:pointer; line-height:1; transition:color 0.2s;
`;
lbClose.onmouseenter = () => lbClose.style.color = 'var(--gold-light)';
lbClose.onmouseleave = () => lbClose.style.color = 'rgba(245,237,224,0.6)';
lb.appendChild(lbImg);
lb.appendChild(lbClose);
document.body.appendChild(lb);

document.querySelectorAll('.masonry-item').forEach(item => {
  item.addEventListener('click', () => {
    lbImg.src = item.querySelector('img').src;
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

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && lb.style.display === 'flex') {
    lb.style.display = 'none';
    document.body.style.overflow = '';
  }
});

/* ─── SMOOTH SCROLL (fixed nav offset) ───────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({ top: target.offsetTop - nav.offsetHeight - 12, behavior: 'smooth' });
  });
});
