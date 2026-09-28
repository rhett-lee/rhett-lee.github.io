// nim_duilib website - theme toggle, language toggle, smooth scroll, lightbox

(function () {
  'use strict';

  // ---- Theme toggle ----
  const themeKey = 'nim-theme';
  const html = document.documentElement;

  function getPreferredTheme() {
    const saved = localStorage.getItem(themeKey);
    if (saved === 'dark' || saved === 'light') return saved;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    html.setAttribute('data-theme', theme);
    const btn = document.getElementById('theme-toggle');
    if (btn) btn.textContent = theme === 'dark' ? '\u2600' : '\u263D';
  }

  applyTheme(getPreferredTheme());

  document.addEventListener('DOMContentLoaded', function () {
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
      themeBtn.addEventListener('click', function () {
        const current = html.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        localStorage.setItem(themeKey, next);
      });
    }

    // ---- Language toggle ----
    const langKey = 'nim-lang';

    function getPreferredLang() {
      const saved = localStorage.getItem(langKey);
      return saved === 'en' ? 'en' : 'cn';
    }

    function applyLang(lang) {
      html.setAttribute('data-lang', lang);
      html.lang = lang === 'en' ? 'en' : 'zh-CN';
      const btn = document.getElementById('lang-toggle');
      if (btn) btn.textContent = lang === 'cn' ? 'EN' : '\u4E2D';
    }

    applyLang(getPreferredLang());

    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
      langBtn.addEventListener('click', function () {
        const current = html.getAttribute('data-lang');
        const next = current === 'cn' ? 'en' : 'cn';
        applyLang(next);
        localStorage.setItem(langKey, next);
      });
    }

    // ---- Mobile nav toggle ----
    var navToggle = document.getElementById('nav-toggle');
    var navLinks = document.getElementById('nav-links');
    if (navToggle && navLinks) {
      navToggle.addEventListener('click', function () {
        navLinks.classList.toggle('open');
        navToggle.classList.toggle('active');
      });
      // Close nav when a link is clicked (mobile)
      navLinks.querySelectorAll('a').forEach(function (a) {
        a.addEventListener('click', function () {
          navLinks.classList.remove('open');
          navToggle.classList.remove('active');
        });
      });
    }

    // ---- Lightbox ----
    var lightbox = document.getElementById('lightbox');
    var lightboxImg = document.getElementById('lightbox-img');
    var lightboxCaption = document.getElementById('lightbox-caption');

    if (lightbox && lightboxImg) {
      document.querySelectorAll('.screenshot-item img').forEach(function (img) {
        img.addEventListener('click', function () {
          lightboxImg.src = this.src;
          var caption = this.closest('.screenshot-item').querySelector('.screenshot-caption');
          if (caption && lightboxCaption) {
            lightboxCaption.textContent = caption.textContent;
          }
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      });

      lightbox.addEventListener('click', function () {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
      });

      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
          lightbox.classList.remove('active');
          document.body.style.overflow = '';
        }
      });
    }

    // ---- Active nav link highlighting ----
    var sections = document.querySelectorAll('section[id]');
    var navAnchors = document.querySelectorAll('#nav-links a[href^="#"]');

    function highlightNav() {
      var scrollY = window.scrollY + 100;
      sections.forEach(function (sec) {
        var top = sec.offsetTop;
        var height = sec.offsetHeight;
        var id = sec.getAttribute('id');
        if (scrollY >= top && scrollY < top + height) {
          navAnchors.forEach(function (a) {
            if (a.getAttribute('href') === '#' + id) {
              a.classList.add('active');
            } else {
              a.classList.remove('active');
            }
          });
        }
      });
    }

    window.addEventListener('scroll', highlightNav, { passive: true });
    highlightNav();
  });
})();
