/* Maison Asili — site chrome: mobile menu, collections dropdown, search overlay,
   placeholder-link handling, demo form validation, image fallback, active nav. */
(function () {
  'use strict';

  var BASE = (function () {
    var s = document.querySelector('script[src*="catalog.js"]');
    return s ? s.getAttribute('src').replace('assets/js/catalog.js', '') : '';
  })();

  /* ------------------------------------------------- image fallback ---- */
  document.addEventListener(
    'error',
    function (e) {
      var img = e.target;
      if (img && img.tagName === 'IMG' && !img.dataset.fallbackApplied) {
        img.dataset.fallbackApplied = '1';
        img.classList.add('img-fallback');
        img.src = BASE + 'assets/img/placeholder.svg';
      }
    },
    true
  );

  /* ------------------------------------------------- mobile menu ------- */
  var menuBtn = document.querySelector('[data-menu-toggle]');
  var menu = document.querySelector('[data-mobile-menu]');
  if (menuBtn && menu) {
    menuBtn.addEventListener('click', function () {
      var open = menu.classList.toggle('hidden') === false;
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      var icon = menuBtn.querySelector('[data-menu-icon]');
      if (icon) icon.textContent = open ? 'close' : 'menu';
    });
    menu.addEventListener('click', function (e) {
      if (e.target.closest('a')) {
        menu.classList.add('hidden');
        menuBtn.setAttribute('aria-expanded', 'false');
        var icon = menuBtn.querySelector('[data-menu-icon]');
        if (icon) icon.textContent = 'menu';
      }
    });
  }

  /* ------------------------------------------------- collections menu -- */
  var dd = document.querySelector('[data-dropdown]');
  if (dd) {
    var ddBtn = dd.querySelector('[data-dropdown-toggle]');
    var ddPanel = dd.querySelector('#collections-menu');
    var ddIcon = dd.querySelector('[data-dropdown-icon]');
    var hideT;
    function showDD() {
      clearTimeout(hideT);
      if (ddPanel) ddPanel.classList.remove('hidden');
      if (ddBtn) ddBtn.setAttribute('aria-expanded', 'true');
      if (ddIcon) ddIcon.style.transform = 'rotate(180deg)';
    }
    function hideDD() {
      hideT = setTimeout(function () {
        if (ddPanel) ddPanel.classList.add('hidden');
        if (ddBtn) ddBtn.setAttribute('aria-expanded', 'false');
        if (ddIcon) ddIcon.style.transform = '';
      }, 120);
    }
    dd.addEventListener('mouseenter', showDD);
    dd.addEventListener('mouseleave', hideDD);
    if (ddBtn) {
      ddBtn.addEventListener('click', function () {
        var hidden = ddPanel.classList.toggle('hidden');
        ddBtn.setAttribute('aria-expanded', hidden ? 'false' : 'true');
        if (ddIcon) ddIcon.style.transform = hidden ? '' : 'rotate(180deg)';
      });
    }
    if (ddPanel) ddPanel.addEventListener('focusout', hideDD);
  }

  /* ------------------------------------------------- search overlay ---- */
  var overlay = document.querySelector('[data-search-overlay]');
  var input = document.querySelector('[data-search-input]');
  var results = document.querySelector('[data-search-results]');
  var status = document.querySelector('[data-search-status]');
  var empty = document.querySelector('[data-search-empty]');

  function openSearch() {
    if (!overlay) return;
    closeLanguage();
    overlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    if (menu && !menu.classList.contains('hidden')) menu.classList.add('hidden');
    setTimeout(function () {
      if (input) input.focus();
    }, 30);
  }
  function closeSearch() {
    if (!overlay) return;
    overlay.classList.add('hidden');
    document.body.style.overflow = '';
  }
  Array.prototype.forEach.call(document.querySelectorAll('[data-search-open]'), function (b) {
    b.addEventListener('click', openSearch);
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-search-close]'), function (b) {
    b.addEventListener('click', closeSearch);
  });

  /* --------------------------------- language / browser translation ---- */
  /* The site is authored in English. We only read the visitor's browser
     language preferences locally and point them to the browser's native
     translation feature; no IP lookup or translation API is used. */
  var languageOverlay = document.querySelector('[data-language-overlay]');
  var languageMessage = document.querySelector('[data-language-message]');
  var detectedLanguage = document.querySelector('[data-detected-language]');

  function browserLanguage() {
    var list =
      navigator.languages && navigator.languages.length
        ? navigator.languages
        : [navigator.language || 'en'];
    var raw = list[0] || 'en';
    var code = raw.split('-')[0].toLowerCase();
    var name = raw;
    try {
      if (typeof Intl !== 'undefined' && Intl.DisplayNames) {
        name = new Intl.DisplayNames([raw], { type: 'language' }).of(code) || raw;
      }
    } catch (err) {
      name = raw;
    }
    return { raw: raw, code: code, name: name, isEnglish: code === 'en' };
  }

  function updateLanguagePanel() {
    var lang = browserLanguage();
    if (detectedLanguage) detectedLanguage.textContent = lang.name + ' (' + lang.raw + ')';
    if (languageMessage) {
      languageMessage.textContent = lang.isEnglish
        ? 'Your browser prefers English. You are already reading the canonical English edition of Maison Asili.'
        : 'Your browser prefers ' +
          lang.name +
          '. Use your browser’s built-in translation feature to read Maison Asili in ' +
          lang.name +
          '. Product names, ingredients, pricing and checkout are controlled by the site and are not translated automatically.';
    }
  }

  function openLanguage() {
    if (!languageOverlay) return;
    closeSearch();
    if (menu && !menu.classList.contains('hidden')) menu.classList.add('hidden');
    updateLanguagePanel();
    languageOverlay.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    Array.prototype.forEach.call(document.querySelectorAll('[data-language-toggle]'), function (b) {
      b.setAttribute('aria-expanded', 'true');
    });
  }

  function closeLanguage() {
    if (!languageOverlay) return;
    languageOverlay.classList.add('hidden');
    if (languageOverlay.classList.contains('hidden') && document.body.style.overflow === 'hidden') {
      document.body.style.overflow = '';
    }
    Array.prototype.forEach.call(document.querySelectorAll('[data-language-toggle]'), function (b) {
      b.setAttribute('aria-expanded', 'false');
    });
  }

  Array.prototype.forEach.call(document.querySelectorAll('[data-language-toggle]'), function (b) {
    b.addEventListener('click', openLanguage);
  });
  Array.prototype.forEach.call(document.querySelectorAll('[data-language-close]'), function (b) {
    b.addEventListener('click', closeLanguage);
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeSearch();
      closeLanguage();
      closeDrawerIfOpen();
    }
  });

  function closeDrawerIfOpen() {
    var d = document.querySelector('[data-cart-drawer]');
    if (d && !d.classList.contains('translate-x-full')) {
      d.classList.add('translate-x-full');
      var b = document.querySelector('[data-cart-backdrop]');
      if (b) b.classList.add('opacity-0', 'pointer-events-none');
      document.body.style.overflow = '';
    }
  }

  function renderSearch(q) {
    if (!results) return;
    var cat = window.MA_CATALOG || [];
    q = (q || '').trim().toLowerCase();
    if (!q) {
      results.innerHTML = '';
      if (empty) empty.classList.add('hidden'), empty.classList.remove('flex');
      if (status) status.textContent = 'Search product names, categories and descriptions.';
      return;
    }
    var hits = cat.filter(function (p) {
      return (
        p.name.toLowerCase().indexOf(q) > -1 ||
        p.category.toLowerCase().indexOf(q) > -1 ||
        (p.categoryName || '').toLowerCase().indexOf(q) > -1 ||
        (p.description || '').toLowerCase().indexOf(q) > -1 ||
        (p.eyebrow || '').toLowerCase().indexOf(q) > -1
      );
    });
    if (status) status.textContent = hits.length ? hits.length + ' result' + (hits.length === 1 ? '' : 's') + ' for “' + q + '”' : 'No results for “' + q + '”';
    if (!hits.length) {
      results.innerHTML = '';
      if (empty) empty.classList.remove('hidden'), empty.classList.add('flex');
      return;
    }
    if (empty) empty.classList.add('hidden'), empty.classList.remove('flex');
    results.innerHTML = hits
      .slice(0, 12)
      .map(function (p) {
        return (
          '<a class="group flex flex-col bg-surface-container-lowest border border-outline-variant hover:border-tertiary transition-colors" href="' +
          BASE +
          p.path +
          '">' +
          '<div class="w-full aspect-square bg-surface-container overflow-hidden"><img class="w-full h-full object-contain p-4 group-hover:scale-[1.03] transition-transform duration-500" src="' +
          BASE +
          p.image +
          '" alt=""></div>' +
          '<div class="p-4 flex flex-col gap-1">' +
          '<span class="text-[10px] uppercase tracking-wider text-tertiary">' +
          (p.categoryName || p.category) +
          '</span>' +
          '<span class="font-headline text-sm font-semibold text-on-surface leading-snug group-hover:text-primary transition-colors">' +
          p.name +
          '</span>' +
          '<span class="text-xs text-on-surface-variant mt-1">€' +
          Number(p.price).toFixed(2) +
          ' · ' +
          p.size +
          '</span>' +
          '</div></a>'
        );
      })
      .join('');
  }
  if (input) input.addEventListener('input', function () {
    renderSearch(input.value);
  });

  /* ------------------------------------------------- placeholder links - */
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-placeholder-link]') : null;
    if (!t) return;
    e.preventDefault();
    if (window.MA_CART && window.MA_CART.toast) {
      window.MA_CART.toast('Social channel placeholder — connect the official account before launch.');
    }
  });

  /* ------------------------------------------------- demo forms -------- */
  document.addEventListener('submit', function (e) {
    var form = e.target;
    var kind = form.getAttribute('data-demo-form');
    if (!kind || kind === 'checkout') return; // checkout handled in cart.js
    e.preventDefault();
    var msg = form.querySelector('[data-form-message]');
    var required = form.querySelectorAll('[required]');
    var missing = null;
    Array.prototype.forEach.call(required, function (f) {
      var val = f.type === 'checkbox' ? f.checked : f.value.trim();
      var bad =
        f.type === 'checkbox'
          ? !f.checked
          : !val || (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(val));
      if (f.type !== 'checkbox') f.style.borderColor = bad ? '#9B2C1E' : '';
      if (bad && !missing) missing = f;
    });
    if (missing) {
      if (msg) {
        msg.hidden = false;
        msg.className = 'text-xs leading-relaxed text-error mt-3';
        msg.textContent = 'Please complete the required fields before continuing.';
      }
      missing.focus();
      return;
    }
    form.reset();
    var notes = {
      newsletter:
        'Thank you — in this demonstration your address is validated locally only. You have not been subscribed to a mailing list.',
      contact:
        'Thank you — your message was validated in the browser and shown as a confirmation only. Nothing was sent to Maison Asili.',
      wholesale:
        'Thank you — your enquiry has been validated locally and displayed as a demonstration. It has not been transmitted to Maison Asili. For a real enquiry write to info@maisonasili.com.'
    };
    if (msg) {
      msg.hidden = false;
      msg.className = 'text-xs leading-relaxed text-tertiary mt-3';
      msg.textContent = notes[kind] || 'Thank you — this is a demonstration confirmation only.';
    }
  });

  /* ------------------------------------------------- active nav -------- */
  var page = document.body.getAttribute('data-page');
  if (page) {
    Array.prototype.forEach.call(document.querySelectorAll('[data-nav="' + page + '"]'), function (a) {
      a.classList.add('text-on-surface', 'font-semibold');
      a.classList.remove('text-on-surface-variant');
    });
  }

  /* ------------------------------------------------- home hero & curtain - */
  var header = document.getElementById('site-header');
  var heroDimmer = document.getElementById('hero-dimmer');

  if (document.body.getAttribute('data-page') === 'home' && header) {
    function updateHeroHeader() {
      var scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
      var heroHeight = (window.innerHeight || 800) - 80;
      if (scrollY < heroHeight) {
        header.classList.add('header-hero');
        if (heroDimmer) {
          var ratio = Math.min(1, Math.max(0, scrollY / (window.innerHeight * 0.75)));
          heroDimmer.style.opacity = (ratio * 0.6).toFixed(2);
        }
      } else {
        header.classList.remove('header-hero');
      }
    }
    window.addEventListener('scroll', updateHeroHeader, { passive: true });
    window.addEventListener('resize', updateHeroHeader);
    updateHeroHeader();

    /* Product Carousel & Category Filtering */
    var carousel = document.getElementById('product-carousel');
    var tabs = document.querySelectorAll('#carousel-tabs .product-tab');
    var prevBtn = document.getElementById('carousel-prev');
    var nextBtn = document.getElementById('carousel-next');
    var progressBar = document.getElementById('carousel-progress-bar');

    if (carousel) {
      function updateProgress() {
        if (!progressBar) return;
        var maxScroll = carousel.scrollWidth - carousel.clientWidth;
        var pct = maxScroll > 0 ? (carousel.scrollLeft / maxScroll) : 0;
        progressBar.style.marginLeft = (pct * 75).toFixed(1) + '%';
      }

      carousel.addEventListener('scroll', updateProgress, { passive: true });

      if (prevBtn) {
        prevBtn.addEventListener('click', function () {
          carousel.scrollBy({ left: -340, behavior: 'smooth' });
        });
      }
      if (nextBtn) {
        nextBtn.addEventListener('click', function () {
          carousel.scrollBy({ left: 340, behavior: 'smooth' });
        });
      }

      if (tabs.length) {
        tabs.forEach(function (btn) {
          btn.addEventListener('click', function () {
            var cat = btn.getAttribute('data-tab');
            tabs.forEach(function (t) {
              t.classList.remove('text-primary', 'font-semibold', 'border-brand-gold');
              t.classList.add('text-on-surface-variant/60', 'border-transparent');
            });
            btn.classList.add('text-primary', 'font-semibold', 'border-brand-gold');
            btn.classList.remove('text-on-surface-variant/60', 'border-transparent');

            var items = carousel.querySelectorAll('.product-item');
            items.forEach(function (item) {
              var itemCat = item.getAttribute('data-category');
              if (cat === 'all' || itemCat === cat) {
                item.style.display = '';
              } else {
                item.style.display = 'none';
              }
            });
            carousel.scrollTo({ left: 0, behavior: 'smooth' });
            setTimeout(updateProgress, 100);
          });
        });
      }
    }
  }

  /* expose search for reuse */
  window.MA_SEARCH = { open: openSearch, close: closeSearch };
})();
