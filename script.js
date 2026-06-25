
   document.addEventListener('DOMContentLoaded', () => {
 
  /* ===== YEAR ===== */
  const yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
 
  /* ===== ELEMENTS ===== */
  const header = document.getElementById('header');
  const backToTop = document.getElementById('back-to-top');
  const progress = document.querySelector('.paw-progress');
 
  const hamburger = document.getElementById('hamburger');
  const mainNav = document.getElementById('main-nav');
  const overlay = document.getElementById('nav-overlay');
 
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('#main-nav a');
 
  /* ===== ACTIVE NAV ===== */
  function updateActiveNav() {
    let current = '';
 
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
 
      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute('id');
      }
    });
 
    navLinks.forEach(link => {
      link.classList.remove('active');
 
      const href = link.getAttribute('href');
 
      if (href === `#${current}`) {
        link.classList.add('active');
      }
    });
  }
 
  /* ===== SCROLL EVENTS ===== */
  function onScroll() {
    const scrollY = window.scrollY;
 
    if (header) {
      header.classList.toggle('scrolled', scrollY > 30);
    }
 
    if (backToTop) {
      backToTop.classList.toggle('show', scrollY > 500);
    }
 
    if (progress) {
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
 
      const pct = docHeight > 0
        ? (scrollY / docHeight) * 100
        : 0;
 
      progress.style.width = pct + '%';
    }
 
    updateActiveNav();
  }
 
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
 
  /* ===== BACK TO TOP ===== */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
 
  /* ===== MOBILE MENU ===== */
  function closeMenu() {
    if (!hamburger || !mainNav || !overlay) return;
 
    hamburger.classList.remove('active');
    mainNav.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
 
  function toggleMenu() {
    if (!hamburger || !mainNav || !overlay) return;
 
    const isActive = mainNav.classList.toggle('active');
 
    hamburger.classList.toggle('active', isActive);
    overlay.classList.toggle('active', isActive);
 
    hamburger.setAttribute('aria-expanded', String(isActive));
 
    document.body.style.overflow = isActive
      ? 'hidden'
      : '';
  }
 
  hamburger?.addEventListener('click', toggleMenu);
  overlay?.addEventListener('click', closeMenu);
 
  mainNav?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });
 
  /* ===== SCROLL REVEAL ===== */
  const animatedEls = document.querySelectorAll('[data-animate]');
 
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
 
        const delay =
          entry.target.getAttribute('data-delay') || 0;
 
        setTimeout(() => {
          entry.target.classList.add('in-view');
        }, Number(delay));
 
        io.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -60px 0px'
  });
 
  animatedEls.forEach(el => io.observe(el));
 
  /* ===== TESTIMONIAL SLIDER ===== */
  const track = document.getElementById('testimonial-track');
  const dotsWrap = document.getElementById('testimonial-dots');
 
  const cards = track
    ? Array.from(track.children)
    : [];
 
  if (track && dotsWrap && cards.length) {
 
    cards.forEach((_, i) => {
      const dot = document.createElement('span');
 
      if (i === 0) {
        dot.classList.add('active');
      }
 
      dot.addEventListener('click', () => {
        cards[i].scrollIntoView({
          behavior: 'smooth',
          inline: 'start',
          block: 'nearest'
        });
      });
 
      dotsWrap.appendChild(dot);
    });
 
    function isMobileSlider() {
      return window.matchMedia('(max-width: 640px)').matches;
    }
 
    function applyMobileStyles() {
 
      if (isMobileSlider()) {
 
        track.style.display = 'flex';
        track.style.overflowX = 'auto';
        track.style.scrollSnapType = 'x mandatory';
        track.style.gap = '20px';
 
        cards.forEach(card => {
          card.style.minWidth = '85%';
          card.style.scrollSnapAlign = 'start';
        });
 
      } else {
 
        track.style.display = '';
        track.style.overflowX = '';
 
        cards.forEach(card => {
          card.style.minWidth = '';
          card.style.scrollSnapAlign = '';
        });
      }
    }
 
    applyMobileStyles();
 
    window.addEventListener('resize', applyMobileStyles);
 
    track.addEventListener('scroll', () => {
 
      if (!isMobileSlider()) return;
 
      const trackRect = track.getBoundingClientRect();
 
      let closestIndex = 0;
      let closestDist = Infinity;
 
      cards.forEach((card, i) => {
 
        const rect = card.getBoundingClientRect();
 
        const dist = Math.abs(
          rect.left - trackRect.left
        );
 
        if (dist < closestDist) {
          closestDist = dist;
          closestIndex = i;
        }
      });
 
      Array.from(dotsWrap.children).forEach((dot, i) => {
        dot.classList.toggle(
          'active',
          i === closestIndex
        );
      });
 
    }, { passive: true });
  }
 
  /* ===== NEWSLETTER ===== */
  const form = document.getElementById('newsletter-form');
  const formNote = document.getElementById('form-note');
 
  if (form) {
 
    form.addEventListener('submit', (e) => {
 
      e.preventDefault();
 
      const input =
        form.querySelector('input[type="email"]');
 
      if (input && input.value.trim()) {
 
        formNote.textContent =
          "You're in! Check your inbox for a welcome treat. 🐾";
 
        formNote.style.color = '#E8B95C';
 
        input.value = '';
      }
    });
  }
 
  /* ===== ADD TO CART ===== */
  document.querySelectorAll('.icon-btn').forEach(btn => {
 
    btn.addEventListener('click', () => {
 
      const icon = btn.querySelector('i');
 
      if (!icon) return;
 
      icon.classList.remove('fa-cart-plus');
      icon.classList.add('fa-check');
 
      btn.style.background = '#1F3A2E';
      btn.style.color = '#E8B95C';
      btn.style.borderColor = '#1F3A2E';
 
      setTimeout(() => {
 
        icon.classList.remove('fa-check');
        icon.classList.add('fa-cart-plus');
 
        btn.style.background = '';
        btn.style.color = '';
        btn.style.borderColor = '';
 
      }, 1400);
    });
  });
 
});
 
