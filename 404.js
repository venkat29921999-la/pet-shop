document.addEventListener('DOMContentLoaded', () => {

  /* ===== ENTRANCE ANIMATION ===== */
  document.querySelectorAll('[data-animate]').forEach(el => {
    requestAnimationFrame(() => setTimeout(() => el.classList.add('in-view'), 60));
  });

  /* =====================================================================
     CONTEXT-AWARE REDIRECT
     Add ?from=KEY to any link that points to 404.html to change
     the heading, message, and the single button's destination/label.
     Example: <a href="404.html?from=login">Forgot password?</a>
  ===================================================================== */
  const routes = {
    login: {
      heading: "This page hasn't been built yet.",
      message: "Password reset isn't ready just yet — but you can always head back and try logging in again.",
      label: "Back to Login",
      icon: "fa-right-to-bracket",
      href: "login.html"
    },
    signup: {
      heading: "This page hasn't been built yet.",
      message: "That step isn't ready yet — let's get you back to creating your account.",
      label: "Back to Sign Up",
      icon: "fa-user-plus",
      href: "signup.html"
    },
    home: {
      heading: "This page hasn't been built yet.",
      message: "That feature isn't ready yet — here's the way back to the homepage.",
      label: "Back to Home",
      icon: "fa-house",
      href: "index.html"
    },
    about: {
      heading: "This page hasn't been built yet.",
      message: "That feature isn't ready yet — let's get you back to the About page.",
      label: "Back to About",
      icon: "fa-circle-info",
      href: "about.html"
    },
    plan: {
      heading: "This page hasn't been built yet.",
      message: "That feature isn't ready yet — let's get you back to our Plans page.",
      label: "Back to Plans",
      icon: "fa-crown",
      href: "plan.html"
    },
    contact: {
      heading: "This page hasn't been built yet.",
      message: "That feature isn't ready yet — let's get you back to the Contact page.",
      label: "Back to Contact",
      icon: "fa-envelope",
      href: "contact.html"
    },
    shop: {
      heading: "This product page wandered off.",
      message: "We couldn't find what you were looking for. Let's get you back to the shop.",
      label: "Back to Shop",
      icon: "fa-bag-shopping",
      href: "shop.html"
    },
    service: {
      heading: "This service page wandered off.",
      message: "We couldn't find that service. Let's get you back to our services page.",
      label: "Back to Services",
      icon: "fa-stethoscope",
      href: "service.html"
    },
    userdashboard: {
      heading: "This page isn't ready yet.",
      message: "We're still building this feature. Let's get you back to your dashboard.",
      label: "Back to Dashboard",
      icon: "fa-grip",
      href: "userdashboard.html"
    },
    admindashboard: {
      heading: "This page isn't ready yet.",
      message: "We're still building this feature. Let's get you back to your dashboard.",
      label: "Back to Dashboard",
      icon: "fa-grip",
      href: "admindashboard.html"
    }
  };

 const params = new URLSearchParams(window.location.search);
const from = params.get('from');
const route = routes[from];

const previousPage = document.referrer;

if (route) {
  const headingEl = document.getElementById('error-heading');
  const messageEl = document.getElementById('error-message');
  const btnEl = document.getElementById('error-back-btn');
  const iconEl = document.getElementById('error-back-icon');
  const labelEl = document.getElementById('error-back-label');

  headingEl.textContent = route.heading;
  messageEl.textContent = route.message;

  // Go back to previous page if available
  btnEl.href = previousPage || route.href;

  labelEl.textContent = "Go Back";
  iconEl.className = "fa-solid fa-arrow-left";
}

document.getElementById("error-back-btn").addEventListener("click", () => {
    if (document.referrer) {
        window.history.back();
    } else {
        window.location.href = "index.html";
    }
});

});