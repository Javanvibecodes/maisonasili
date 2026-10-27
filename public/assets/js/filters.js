/* Maison Asili — shop & collection filtering + sorting.
   Works on both the /shop page and the /collection templates (they share the
   #productGrid, .category-pill, #priceRange, #sortSelect and reset-button IDs). */
(function () {
  'use strict';

  var grid = document.getElementById('productGrid');
  if (!grid) return;

  var pills = document.querySelectorAll('.category-pill');
  var priceRange = document.getElementById('priceRange');
  var priceDisplay = document.getElementById('priceDisplay');
  var sortSelect = document.getElementById('sortSelect');
  /* the live count appears twice (mobile toggle row + desktop controls) */
  var counters = document.querySelectorAll('[data-product-count]');
  var empty = document.getElementById('emptyState');
  var resetBtns = [
    document.getElementById('resetFiltersBtn'),
    document.getElementById('resetFiltersBtn2')
  ].filter(Boolean);

  var state = { category: 'all', max: priceRange ? parseInt(priceRange.value, 10) : Infinity, sort: 'featured' };

  /* capture the original (featured) order once */
  var originals = Array.prototype.slice.call(grid.querySelectorAll('.product-item'));

  function apply() {
    var items = originals.slice();

    // 1. filter
    var visible = items.filter(function (el) {
      var catOk = state.category === 'all' || el.getAttribute('data-category') === state.category;
      var price = parseFloat(el.getAttribute('data-price'));
      var priceOk = !isFinite(state.max) || price <= state.max;
      return catOk && priceOk;
    });

    // 2. sort
    visible.sort(function (a, b) {
      var pa = parseFloat(a.getAttribute('data-price'));
      var pb = parseFloat(b.getAttribute('data-price'));
      var na = parseFloat(a.getAttribute('data-added')) || 0;
      var nb = parseFloat(b.getAttribute('data-added')) || 0;
      var nameA = (a.getAttribute('data-name') || '').toLowerCase();
      var nameB = (b.getAttribute('data-name') || '').toLowerCase();
      switch (state.sort) {
        case 'newest':
          return nb - na;
        case 'price-asc':
          return pa - pb;
        case 'price-desc':
          return pb - pa;
        case 'alpha':
          return nameA < nameB ? -1 : nameA > nameB ? 1 : 0;
        default: // featured — keep authored order
          return 0;
      }
    });

    // 3. re-append in sorted order (hidden items stay hidden).
    //    Appending an element already in `grid` relocates it, so this must run
    //    over the *sorted* list first, then park hidden items afterwards.
    visible.forEach(function (el) {
      el.classList.remove('hidden');
      grid.appendChild(el);
    });
    items.forEach(function (el) {
      if (visible.indexOf(el) === -1) {
        el.classList.add('hidden');
        grid.appendChild(el);
      }
    });

    // 4. counter + empty state
    Array.prototype.forEach.call(counters, function (c) {
      c.textContent = visible.length;
    });
    if (empty) {
      empty.classList.toggle('hidden', visible.length > 0);
      empty.classList.toggle('flex', visible.length === 0);
    }
  }

  /* pills */
  Array.prototype.forEach.call(pills, function (pill) {
    pill.addEventListener('click', function () {
      state.category = pill.getAttribute('data-category') || 'all';
      Array.prototype.forEach.call(pills, function (p) {
        var active = p === pill;
        p.classList.toggle('bg-on-surface', active);
        p.classList.toggle('text-surface', active);
        p.classList.toggle('text-surface-container-lowest', active);
        p.classList.toggle('font-semibold', active);
        p.classList.toggle('bg-surface-container', !active);
        p.classList.toggle('text-on-surface-variant', !active);
        p.classList.toggle('font-medium', !active);
      });
      apply();
    });
  });

  /* price ceiling */
  if (priceRange) {
    priceRange.addEventListener('input', function () {
      state.max = parseInt(priceRange.value, 10);
      if (priceDisplay) priceDisplay.textContent = '€' + state.max;
      apply();
    });
  }

  /* sort */
  if (sortSelect) {
    sortSelect.addEventListener('change', function () {
      state.sort = sortSelect.value;
      apply();
    });
  }

  /* reset */
  resetBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      state.category = 'all';
      state.max = priceRange ? parseInt(priceRange.max, 10) : Infinity;
      state.sort = 'featured';
      if (priceRange) {
        priceRange.value = priceRange.max;
        if (priceDisplay) priceDisplay.textContent = '€' + priceRange.max;
      }
      if (sortSelect) sortSelect.value = 'featured';
      Array.prototype.forEach.call(pills, function (p) {
        var active = (p.getAttribute('data-category') || 'all') === 'all';
        p.classList.toggle('bg-on-surface', active);
        p.classList.toggle('text-surface', active);
        p.classList.toggle('text-surface-container-lowest', active);
        p.classList.toggle('font-semibold', active);
        p.classList.toggle('bg-surface-container', !active);
        p.classList.toggle('text-on-surface-variant', !active);
        p.classList.toggle('font-medium', !active);
      });
      apply();
    });
  });

  /* mobile filter panel — the controls live in #filterPanel, hidden by
     default below the lg breakpoint and toggled by [data-filter-toggle] */
  var panelToggle = document.querySelector('[data-filter-toggle]');
  var filterPanel = document.getElementById('filterPanel');
  if (panelToggle && filterPanel) {
    panelToggle.addEventListener('click', function () {
      var hidden = filterPanel.classList.toggle('hidden');
      panelToggle.setAttribute('aria-expanded', hidden ? 'false' : 'true');
      var icon = panelToggle.querySelector('.material-symbols-outlined');
      if (icon) icon.textContent = hidden ? 'tune' : 'close';
    });
  }

  apply();
})();
