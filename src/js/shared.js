// =============================================
// SCROLL PROGRESS BAR
// =============================================
(function () {
  var bar = document.getElementById('scrollProgress');
  if (!bar) return;
  window.addEventListener('scroll', function () {
    var h = document.documentElement;
    var pct = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    bar.style.width = pct + '%';
  }, { passive: true });
})();

// =============================================
// NAV SCROLL STATE
// =============================================
(function () {
  var nav = document.getElementById('nav');
  if (!nav) return;
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        if (window.scrollY > 60) {
          nav.classList.add('nav--scrolled');
        } else {
          nav.classList.remove('nav--scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// =============================================
// SCROLL REVEAL (Intersection Observer)
// =============================================
(function () {
  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );
  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });
})();

// =============================================
// MOBILE NAV TOGGLE
// =============================================
(function () {
  var toggle = document.getElementById('navToggle');
  var links = document.getElementById('navLinks');
  if (!toggle || !links) return;

  toggle.addEventListener('click', function () {
    links.classList.toggle('nav-links--open');
    document.body.classList.toggle('nav-open');
  });

  // Close menu when clicking a link (except dropdown triggers)
  links.querySelectorAll('a:not(.nav-link--dropdown)').forEach(function (a) {
    a.addEventListener('click', function () {
      links.classList.remove('nav-links--open');
      document.body.classList.remove('nav-open');
    });
  });

  // Mobile dropdown toggle
  var dropdowns = links.querySelectorAll('.nav-dropdown');
  dropdowns.forEach(function (dropdown) {
    var trigger = dropdown.querySelector('.nav-link--dropdown');
    if (trigger) {
      trigger.addEventListener('click', function (e) {
        // Only prevent default on mobile
        if (window.innerWidth <= 640) {
          e.preventDefault();
          dropdown.classList.toggle('open');
        }
      });
    }
  });

  // Close menu on resize to desktop
  window.addEventListener('resize', function () {
    if (window.innerWidth > 640) {
      links.classList.remove('nav-links--open');
      document.body.classList.remove('nav-open');
      dropdowns.forEach(function (d) { d.classList.remove('open'); });
    }
  });

  // Close menu on escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && links.classList.contains('nav-links--open')) {
      links.classList.remove('nav-links--open');
      document.body.classList.remove('nav-open');
    }
  });
})();
