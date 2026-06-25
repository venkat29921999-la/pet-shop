document.addEventListener('DOMContentLoaded', () => {

  /* ===== SESSION GUARD + GREETING ===== */
  let currentUser = null;
  try {
    currentUser = JSON.parse(sessionStorage.getItem('pawfetch_current_user'));
  } catch { currentUser = null; }

  const nameTargets = document.querySelectorAll('#admin-name, #admin-name-2, #user-name, #user-name-2');
  if (currentUser && currentUser.name) {
    nameTargets.forEach(el => { el.textContent = currentUser.name; });
  }

  /* ===== LOGOUT ===== */
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      sessionStorage.removeItem('pawfetch_current_user');
    });
  }

  /* ===== TOPBAR ICON BUTTONS (bell, envelope, cart) ===== */
  const dashFrom = window.location.pathname.includes('admindashboard') ? 'admindashboard' : 'userdashboard';
  document.querySelectorAll('.dash-icon-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = `404.html?from=${dashFrom}`;
    });
  });

  /* ===== SIDEBAR TOGGLE (mobile) ===== */
  const sidebar = document.getElementById('dash-sidebar');
  const overlay = document.getElementById('dash-overlay');
  const menuBtn = document.getElementById('dash-menu-btn');

  function closeSidebar() {
    sidebar.classList.remove('active');
    overlay.classList.remove('active');
  }
  function toggleSidebar() {
    sidebar.classList.toggle('active');
    overlay.classList.toggle('active');
  }
  if (menuBtn) menuBtn.addEventListener('click', toggleSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);
  document.querySelectorAll('.dash-nav a').forEach(a => a.addEventListener('click', closeSidebar));

  /* ===== ACTIVE NAV LINK SYNC ===== */
  const navLinks = document.querySelectorAll('.dash-nav a[href^="#"]');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    });
  });

  /* ===== SCROLL REVEAL ===== */
  const animatedEls = document.querySelectorAll('[data-animate]');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => entry.target.classList.add('in-view'), Number(delay));
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  animatedEls.forEach(el => io.observe(el));

  /* ===== ANIMATED STAT COUNTERS ===== */
  const counters = document.querySelectorAll('.dash-stat-num');
  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10) || 0;
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 1400;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);
      el.textContent = prefix + current.toLocaleString('en-IN');
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = prefix + target.toLocaleString('en-IN');
    }
    requestAnimationFrame(update);
  }
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  counters.forEach(el => counterObserver.observe(el));

  /* ===== BAR CHART ANIMATION ===== */
  const bars = document.querySelectorAll('.bar-chart .bar');
  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const height = entry.target.getAttribute('data-height') || 0;
        setTimeout(() => { entry.target.style.height = height + '%'; }, 150);
        barObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  bars.forEach(bar => barObserver.observe(bar));

  /* ===== MEMBERSHIP PROGRESS RING ===== */
  const ring = document.getElementById('membership-ring');
  if (ring) {
    const circumference = 326.7;
    const percent = 62;
    const ringObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const offset = circumference - (circumference * percent / 100);
          ring.style.strokeDashoffset = offset;
          ringObserver.unobserve(ring);
        }
      });
    }, { threshold: 0.3 });
    ringObserver.observe(ring);
  }

});