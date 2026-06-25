document.documentElement.classList.add('js-ready');

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

  /* ===== SIGNUP FORM (no storage — just a friendly confirmation, then to Login) ===== */
  const signupForm = document.getElementById('signup-form');
  const signupNote = document.getElementById('signup-note');

  if (signupForm) {
    signupForm.addEventListener('submit', (e) => {
      e.preventDefault();

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

      signupNote.textContent = `Account created as ${role === 'admin' ? 'Admin' : 'User'}! Redirecting to login... 🐾`;
      signupNote.className = 'auth-note success';

      setTimeout(() => { window.location.href = 'login.html'; }, 1400);
    });
  }

  /* =====================================================================
     LOGIN FORM
     No account lookup, no localStorage — any email/password combo works.
     The selected role (User / Admin) decides which dashboard you land on.
  ===================================================================== */
  const loginForm = document.getElementById('login-form');
  const loginNote = document.getElementById('login-note');

  if (loginForm) {
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const email = document.getElementById('login-email').value.trim();
      const role = document.getElementById('selected-role').value;

      if (!email) {
        loginNote.textContent = 'Please enter your email address.';
        loginNote.className = 'auth-note error';
        return;
      }

      // Save just enough info for the dashboard greeting — no validation required.
      sessionStorage.setItem('pawfetch_current_user', JSON.stringify({
        name: email.split('@')[0] || 'Pet Parent',
        email,
        role
      }));

      loginNote.textContent = `Welcome! Redirecting to your ${role === 'admin' ? 'admin' : ''} dashboard... 🐾`;
      loginNote.className = 'auth-note success';

      setTimeout(() => {
        window.location.href = role === 'admin' ? 'admindashboard.html' : 'userdashboard.html';
      }, 900);
    });
  }

});