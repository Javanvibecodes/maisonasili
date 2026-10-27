/* Maison Asili — product detail page interactions:
   gallery thumbnails, size/variant selector, quantity, accordions, wishlist. */
(function () {
  'use strict';

  /* ------------------------------------------------- global accordion --- */
  window.toggleAccordion = function (id) {
    var content = document.getElementById('content-' + id);
    var icon = document.getElementById('icon-' + id);
    if (!content) return;
    var hidden = content.classList.toggle('hidden');
    content.classList.toggle('mt-3', !hidden);
    if (icon) icon.textContent = hidden ? 'keyboard_arrow_down' : 'keyboard_arrow_up';
  };

  /* ----------------------------- accordion panels (build.js markup) ----- */
  /* The editorial accordions are emitted with .accordion-toggle buttons whose
     sibling .accordion-panel holds the body and .accordion-icon the +/− glyph. */
  var accToggles = document.querySelectorAll('.accordion-toggle');
  Array.prototype.forEach.call(accToggles, function (btn) {
    btn.addEventListener('click', function () {
      var panel = btn.parentElement.querySelector('.accordion-panel');
      var icon = btn.querySelector('.accordion-icon');
      if (!panel) return;
      var open = !panel.classList.toggle('hidden');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (icon) icon.textContent = open ? 'remove' : 'add';
    });
  });

  /* ------------------------------------------------- gallery ----------- */
  var mainImg = document.getElementById('main-product-image');
  var thumbs = document.querySelectorAll('#pdp-thumbnails .thumbnail-btn');
  Array.prototype.forEach.call(thumbs, function (btn) {
    btn.addEventListener('click', function () {
      var src = btn.getAttribute('data-gallery-src');
      if (mainImg && src) {
        mainImg.style.opacity = '0';
        setTimeout(function () {
          mainImg.src = src;
          mainImg.style.opacity = '1';
        }, 150);
      }
      Array.prototype.forEach.call(thumbs, function (b) {
        b.classList.remove('ring-1', 'ring-on-surface');
        b.classList.add('opacity-70');
      });
      btn.classList.add('ring-1', 'ring-on-surface');
      btn.classList.remove('opacity-70');
    });
  });
  if (mainImg) mainImg.style.transition = 'opacity .2s ease';

  /* ------------------------------------------------- price + CTA sync -- */
  var priceEl = document.getElementById('current-price');
  var ctaLabel = document.getElementById('cta-label');
  var unitEl = document.querySelector('[data-unit-price]');
  var sizeBtns = document.querySelectorAll('.size-btn');

  function syncPrice(price, size) {
    var formatted = '€' + Number(price).toFixed(2);
    if (priceEl) priceEl.textContent = formatted;
    if (ctaLabel) ctaLabel.innerHTML = 'Add to Bag &bull; ' + formatted;
    if (unitEl && size) {
      // derive a rough unit price label (e.g. per 100ml / 100g) when parseable
      var m = String(size).match(/([\d.]+)\s*(ml|g|kg|l)/i);
      if (m) {
        var qty = parseFloat(m[1]);
        var unit = m[2].toLowerCase();
        var per = unit === 'kg' ? 1000 : unit === 'l' ? 1000 : 100;
        var base = qty / (unit === 'kg' || unit === 'l' ? qty / per : 1) || qty;
        var perUnit = (price / (qty / per)) * (per / 100);
        unitEl.textContent = '≈ €' + Number(perUnit).toFixed(2) + ' / 100' + (unit === 'ml' || unit === 'l' ? 'ml' : 'g');
      } else {
        unitEl.textContent = '';
      }
    }
  }

  Array.prototype.forEach.call(sizeBtns, function (btn) {
    btn.addEventListener('click', function () {
      Array.prototype.forEach.call(sizeBtns, function (b) {
        b.classList.remove('ring-2', 'ring-on-surface');
        b.classList.add('hover:bg-surface-container');
      });
      btn.classList.add('ring-2', 'ring-on-surface');
      btn.classList.remove('hover:bg-surface-container');
      syncPrice(btn.getAttribute('data-price'), btn.getAttribute('data-size'));
    });
  });

  /* initialise price/CTA from the first variant when present */
  if (sizeBtns.length) {
    var first = sizeBtns[0];
    syncPrice(first.getAttribute('data-price'), first.getAttribute('data-size'));
  }

  /* ------------------------------------------------- quantity ---------- */
  var qtyEl = document.getElementById('product-qty');
  Array.prototype.forEach.call(document.querySelectorAll('[data-qty]'), function (btn) {
    btn.addEventListener('click', function () {
      var delta = parseInt(btn.getAttribute('data-qty'), 10);
      var cur = qtyEl ? parseInt(qtyEl.textContent, 10) : 1;
      var next = Math.max(1, Math.min(99, cur + delta));
      if (qtyEl) qtyEl.textContent = next;
    });
  });

  /* ------------------------------------------------- wishlist ---------- */
  var wishBtn = document.querySelector('[data-wishlist]');
  if (wishBtn) {
    var wIcon = document.getElementById('wishlist-icon');
    wishBtn.addEventListener('click', function () {
      var on = wIcon.textContent.trim() === 'favorite';
      wIcon.textContent = on ? 'favorite_border' : 'favorite';
      wIcon.style.color = on ? '' : '#A65E43';
      if (window.MA_CART && window.MA_CART.toast) {
        window.MA_CART.toast(on ? 'Removed from your saved list.' : 'Saved to your list (demo).');
      }
    });
  }
})();
