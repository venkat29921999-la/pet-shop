document.addEventListener('DOMContentLoaded', () => {

  /* ===== SCROLL REVEAL (auth cards) ===== */
  document.querySelectorAll('[data-animate]').forEach(el => {
    requestAnimationFrame(() => setTimeout(() => el.classList.add('in-view'), 60));
  });

  /* ===== ROLE TOGGLE (shared by login + signup) ===== */
  const roleButtons = document.querySelectorAll('.role-btn');
  const roleHiddenInput = document.getElementById('selected-role') || document.getElementById('signup-role');

  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      if (roleHiddenInput) roleHiddenInput.value = btn.getAttribute('data-role');
    });
  });

  /* ===== SHOW / HIDE PASSWORD ===== */
  document.querySelectorAll('.toggle-pass').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.previousElementSibling;
      const icon = btn.querySelector('i');
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.replace('fa-eye', 'fa-eye-slash');
      } else {
        input.type = 'password';
        icon.classList.replace('fa-eye-slash', 'fa-eye');
      }
    });
  });

  /* ===== SOCIAL AUTH BUTTONS (Google / Facebook) ===== */
  document.querySelectorAll('.social-auth-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const from = btn.getAttribute('data-from') || 'login';
      window.location.href = `404.html?from=${from}`;
    });
  });

  /* ===== USER STORE HELPERS ===== */
  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem('pawfetch_users')) || [];
    } catch { return []; }
  }
  function saveUsers(users) {
    localStorage.setItem('pawfetch_users', JSON.stringify(users));
  }

  /* Seed a default admin + user so login works out of the box */
  (function seedDefaults() {
    const users = getUsers();
    if (!users.length) {
      saveUsers([
        { name: 'Admin', email: 'admin@pawfetch.com', phone: '0000000000', password: 'admin123', role: 'admin' },
        { name: 'Demo User', email: 'user@pawfetch.com', phone: '0000000000', password: 'user123', role: 'user' }
      ]);
    }
  })();

  /* ===== PASSWORD STRENGTH (signup) ===== */
  const signupPassword = document.getElementById('signup-password');
  const strengthBars = document.querySelectorAll('#pass-strength span');
  if (signupPassword) {
    signupPassword.addEventListener('input', () => {
      const val = signupPassword.value;
      let score = 0;
      if (val.length >= 6) score++;
      if (/[A-Z]/.test(val) && /[0-9]/.test(val)) score++;
      if (val.length >= 10 && /[^A-Za-z0-9]/.test(val)) score++;

      strengthBars.forEach((bar, i) => {
        bar.classList.toggle('filled', i < score);
      });
    });
  }

  /* ===== SIGNUP FORM ===== */
  const signupForm = document.getElementById('signup-form');
  const signupNote = document.getElementById('signup-note');

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('signup-name').value.trim();
      const email = document.getElementById('signup-email').value.trim().toLowerCase();
      const phone = document.getElementById('signup-phone').value.trim();
      const password = document.getElementById('signup-password').value;
      const confirm = document.getElementById('signup-confirm').value;
      const role = document.getElementById('signup-role').value;
      const agreed = document.getElementById('agree-terms').checked;

      function showError(msg) {
        signupNote.textContent = msg;
        signupNote.className = 'auth-note error';
      }

      if (password !== confirm) return showError('Passwords do not match.');
      if (!agreed) return showError('Please agree to the Terms & Privacy Policy.');

      const users = getUsers();
      if (users.some(u => u.email === email)) {
        return showError('An account with this email already exists.');
      }

      users.push({ name, email, phone, password, role });
      saveUsers(users);

      signupNote.textContent = `Account created as ${role === 'admin' ? 'Admin' : 'User'}! Redirecting to login... 🐾`;
      signupNote.className = 'auth-note success';

      setTimeout(() => { window.location.href = 'login.html'; }, 1400);
    });
  }

  /* ===== LOGIN FORM ===== */
  const loginForm = document.getElementById('login-form');
  const loginNote = document.getElementById('login-note');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('login-email').value.trim().toLowerCase();
      const password = document.getElementById('login-password').value;
      const role = document.getElementById('selected-role').value;

      const users = getUsers();
      const match = users.find(u => u.email === email && u.password === password && u.role === role);

      if (!match) {
        loginNote.textContent = `No ${role} account matches those details. Check your credentials or role.`;
        loginNote.className = 'auth-note error';
        return;
      }

      sessionStorage.setItem('pawfetch_current_user', JSON.stringify(match));

      loginNote.textContent = `Welcome back, ${match.name}! Redirecting to your dashboard... 🐾`;
      loginNote.className = 'auth-note success';

      setTimeout(() => {
        window.location.href = role === 'admin' ? 'admindashboard.html' : 'userdashboard.html';
      }, 1200);
    });
  }

});