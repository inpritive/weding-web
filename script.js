/* ═══════════════════════════════════════════════════════════════
   RONEET & SUHANA — Interactive JavaScript
   ═══════════════════════════════════════════════════════════════ */

/* ─── NAV SCROLL ─────────────────────────────────────────────── */
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ─── MOBILE MENU ────────────────────────────────────────────── */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
navToggle.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

/* ─── COUNTDOWN ──────────────────────────────────────────────── */
const weddingDate = new Date('2026-12-18T09:00:00');
function updateCountdown() {
  const diff = weddingDate - new Date();
  if (diff <= 0) {
    document.getElementById('countdown').innerHTML =
      '<p style="font-family:var(--font-serif);font-size:1.4rem;color:var(--white);">The celebrations have begun! 🎊</p>';
    return;
  }
  const d = Math.floor(diff / 86400000);
  const h = Math.floor((diff % 86400000) / 3600000);
  const m = Math.floor((diff % 3600000) / 60000);
  const s = Math.floor((diff % 60000) / 1000);
  document.getElementById('cd-days').textContent  = String(d).padStart(2, '0');
  document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
  document.getElementById('cd-mins').textContent  = String(m).padStart(2, '0');
  document.getElementById('cd-secs').textContent  = String(s).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

/* ─── SCROLL ANIMATIONS ─────────────────────────────────────── */
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 120);
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('[data-aos], .roadmap-stop, .pin').forEach(el => {
  observer.observe(el);
});

/* ─── SMOOTH SCROLL ──────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    window.scrollTo({
      top: target.offsetTop - nav.offsetHeight - 16,
      behavior: 'smooth'
    });
  });
});

/* ─── MODALS ─────────────────────────────────────────────────── */
const overlay = document.getElementById('modalOverlay');
const allModals = document.querySelectorAll('.modal');

document.querySelectorAll('.stop-modal-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const modalId = btn.dataset.modal;
    const modal = document.getElementById(modalId);
    if (!modal) return;
    overlay.classList.add('open');
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeAllModals() {
  overlay.classList.remove('open');
  allModals.forEach(m => m.classList.remove('open'));
  document.body.style.overflow = '';
}

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeAllModals();
});
document.querySelectorAll('.modal-close').forEach(btn => {
  btn.addEventListener('click', closeAllModals);
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeAllModals();
});

/* ─── JOOTA CHUPAI GAME ─────────────────────────────────────── */
let brideVotes = 0;
let groomVotes = 0;

const ransomFill = document.getElementById('ransomFill');
const ransomIndicator = document.getElementById('ransomIndicator');
const brideCountEl = document.getElementById('brideCount');
const groomCountEl = document.getElementById('groomCount');
const jootaStatus = document.getElementById('jootaStatus');
const shoeIcon = document.getElementById('shoe-icon');

function updateRansom() {
  const total = brideVotes + groomVotes;
  let pct = total === 0 ? 50 : (brideVotes / total) * 100;
  pct = Math.max(5, Math.min(95, pct));

  ransomFill.style.width = pct + '%';
  ransomIndicator.style.left = pct + '%';
  brideCountEl.textContent = brideVotes + (brideVotes === 1 ? ' supporter' : ' supporters');
  groomCountEl.textContent = groomVotes + (groomVotes === 1 ? ' defender' : ' defenders');

  // Status messages
  const diff = brideVotes - groomVotes;
  if (total === 0) {
    jootaStatus.textContent = 'The battle is evenly matched! Cast your vote above.';
  } else if (diff > 5) {
    jootaStatus.textContent = '👰 The bridesmaids are winning! The ransom demands are sky-high!';
    shoeIcon.textContent = '👠';
  } else if (diff < -5) {
    jootaStatus.textContent = '🤵 The groom\'s squad is dominating! Those shoes might just come back!';
    shoeIcon.textContent = '👞';
  } else if (diff > 0) {
    jootaStatus.textContent = '👰 Bridesmaids are slightly ahead... keep bidding!';
  } else if (diff < 0) {
    jootaStatus.textContent = '🤵 Groom\'s team is making a comeback!';
  } else {
    jootaStatus.textContent = '⚖️ It\'s a perfect tie! Who will tip the scales?';
  }
}

document.getElementById('bribeBride').addEventListener('click', () => {
  brideVotes++;
  updateRansom();
  // Pulse animation
  const btn = document.getElementById('bribeBride');
  btn.style.transform = 'scale(1.08)';
  setTimeout(() => btn.style.transform = '', 200);
});

document.getElementById('supportGroom').addEventListener('click', () => {
  groomVotes++;
  updateRansom();
  const btn = document.getElementById('supportGroom');
  btn.style.transform = 'scale(1.08)';
  setTimeout(() => btn.style.transform = '', 200);
});

/* ─── CUISINE TABS ───────────────────────────────────────────── */
const cuisineTabs = document.querySelectorAll('.cuisine-tab');
const cuisinePanels = document.querySelectorAll('.cuisine-panel');

cuisineTabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const target = tab.dataset.tab;

    cuisineTabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    cuisinePanels.forEach(p => {
      p.classList.remove('active');
      if (p.id === 'panel-' + target) p.classList.add('active');
    });
  });
});

/* ─── RSVP MULTI-STEP FORM ───────────────────────────────────── */
const formSteps = document.querySelectorAll('.form-step');
const progressSteps = document.querySelectorAll('.rsvp-step');

function showStep(stepNum) {
  formSteps.forEach(s => s.classList.remove('active'));
  const target = document.getElementById('step' + stepNum);
  if (target) target.classList.add('active');

  progressSteps.forEach(ps => {
    const psNum = parseInt(ps.dataset.step);
    ps.classList.remove('active', 'completed');
    if (psNum === stepNum) ps.classList.add('active');
    else if (psNum < stepNum) ps.classList.add('completed');
  });
}

document.querySelectorAll('.form-next-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const nextStep = parseInt(btn.dataset.next);
    showStep(nextStep);
  });
});

document.querySelectorAll('.form-back-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const prevStep = parseInt(btn.dataset.prev);
    showStep(prevStep);
  });
});

// Submit
const rsvpForm = document.getElementById('rsvpForm');
const rsvpSuccess = document.getElementById('rsvpSuccess');
const rsvpSubmit = document.getElementById('rsvpSubmit');

rsvpForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  rsvpSubmit.textContent = 'Sending...';
  rsvpSubmit.disabled = true;

  // Simulate network delay
  await new Promise(r => setTimeout(r, 1500));

  rsvpForm.style.display = 'none';
  document.querySelector('.rsvp-progress').style.display = 'none';
  rsvpSuccess.hidden = false;
});

/* ─── TEAM BRIDE/GROOM SANGEET BUTTONS ───────────────────────── */
document.querySelectorAll('.team-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.team-btn').forEach(b => {
      b.style.opacity = '0.5';
      b.style.transform = 'scale(0.95)';
    });
    btn.style.opacity = '1';
    btn.style.transform = 'scale(1.05)';
    setTimeout(() => {
      document.querySelectorAll('.team-btn').forEach(b => {
        b.style.opacity = '';
        b.style.transform = '';
      });
    }, 1500);
  });
});
