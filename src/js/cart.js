/* Maison Asili — cart store + drawer + cart page + demo checkout.
   No backend: the bag lives in localStorage under MA_CART. */
(function () {
  'use strict';

  var KEY = 'MA_CART_v1';
  var FREE_SHIP = 60; // demonstration threshold (EUR)

  /* ----------------------------------------------------------- store */
  function read() {
    try {
      var raw = localStorage.getItem(KEY);
      var arr = raw ? JSON.parse(raw) : [];
      return Array.isArray(arr) ? arr : [];
    } catch (e) {
      return [];
    }
  }
  function write(items) {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch (e) {
      /* storage full or blocked — bag still works for this view */
    }
    render();
  }
  function findProduct(slug) {
    var cat = window.MA_CATALOG || [];
    for (var i = 0; i < cat.length; i++) if (cat[i].slug === slug) return cat[i];
    return null;
  }
  function money(n) {
    return '€' + Number(n).toFixed(2);
  }
  function count(items) {
    return items.reduce(function (s, i) {
      return s + i.qty;
    }, 0);
  }
  function subtotal(items) {
    return items.reduce(function (s, i) {
      return s + i.price * i.qty;
    }, 0);
  }

  /* line identity = slug + size (same product in two sizes are separate lines) */
  function add(slug, size, qty) {
    var p = findProduct(slug);
    if (!p) return false;
    size = size || p.size || 'standard';
    qty = qty > 0 ? qty : 1;
    /* charge the selected variant's price when the product has size options */
    var price = p.price;
    if (p.variants && p.variants.length) {
      for (var v = 0; v < p.variants.length; v++) {
        if (p.variants[v].label === size) {
          price = p.variants[v].price;
          break;
        }
      }
    }
    var items = read();
    var line = null;
    for (var i = 0; i < items.length; i++) {
      if (items[i].slug === slug && items[i].size === size) {
        line = items[i];
        break;
      }
    }
    if (line) line.qty += qty;
    else items.push({ slug: slug, name: p.name, price: price, size: size, image: p.image, path: p.path, qty: qty });
    write(items);
    toast(p.name + ' added to your bag');
    return true;
  }
  function setQty(slug, size, qty) {
    var items = read();
    for (var i = 0; i < items.length; i++) {
      if (items[i].slug === slug && items[i].size === size) {
        if (qty <= 0) items.splice(i, 1);
        else items[i].qty = qty;
        break;
      }
    }
    write(items);
  }
  function removeLine(slug, size) {
    setQty(slug, size, 0);
  }
  function clear() {
    write([]);
  }

  /* ----------------------------------------------------------- toasts */
  function toast(msg) {
    var root = document.querySelector('[data-toast-root]');
    if (!root) return;
    var el = document.createElement('div');
    el.className =
      'bg-on-surface text-surface-container-lowest text-xs font-label tracking-wide px-4 py-3 shadow-lg flex items-center gap-2.5 max-w-xs';
    el.innerHTML =
      '<span class="material-symbols-outlined text-base text-brand-gold">check_circle</span><span></span>';
    el.lastChild.textContent = msg;
    root.appendChild(el);
    setTimeout(function () {
      el.style.transition = 'opacity .3s';
      el.style.opacity = '0';
      setTimeout(function () {
        if (el.parentNode) el.parentNode.removeChild(el);
      }, 300);
    }, 2600);
  }

  /* ----------------------------------------------------------- badges */
  function renderBadges(items) {
    var n = count(items);
    var badges = document.querySelectorAll('[data-cart-count], [data-cart-count-drawer], [data-cart-page-count]');
    Array.prototype.forEach.call(badges, function (b) {
      b.textContent = n;
      if (b.hasAttribute('data-cart-count')) {
        b.style.opacity = n > 0 ? '1' : '0';
      }
    });
    var openBtn = document.querySelector('[data-checkout-open]');
    if (openBtn) openBtn.disabled = n === 0;
    var noun = document.querySelector('[data-cart-page-count-noun]');
    if (noun) noun.textContent = n === 1 ? 'item' : 'items';
  }

  /* --------------------------------------------------------- drawer UI */
  function renderDrawer(items) {
    var wrap = document.querySelector('[data-cart-items]');
    if (!wrap) return;
    if (!items.length) {
      wrap.innerHTML =
        '<div class="flex-1 flex flex-col items-center justify-center text-center py-14">' +
        '<span class="material-symbols-outlined text-4xl text-outline mb-4">shopping_bag</span>' +
        '<h4 class="font-headline text-xl font-light text-on-surface mb-2">Your bag is empty</h4>' +
        '<p class="text-xs text-on-surface-variant max-w-[15rem] leading-relaxed mb-5">Add a provision from the pantry to see it appear here.</p>' +
        '<a class="px-5 py-3 bg-on-surface text-surface-container-lowest text-[11px] uppercase tracking-[0.22em] font-semibold hover:bg-primary transition-colors" href="' +
        BASE +
        'shop/index.html">Explore the Shop</a></div>';
    } else {
      wrap.innerHTML = items
        .map(function (it) {
          return (
            '<div class="flex gap-4 pb-5 border-b border-outline-variant">' +
            '<a class="w-20 h-24 shrink-0 bg-surface-container overflow-hidden" href="' +
            BASE +
            it.path +
            '"><img class="w-full h-full object-contain p-1.5" src="' +
            BASE +
            it.image +
            '" alt=""></a>' +
            '<div class="flex-1 min-w-0 flex flex-col">' +
            '<div class="flex items-start justify-between gap-2">' +
            '<a class="font-headline text-sm font-semibold text-on-surface leading-snug hover:text-primary transition-colors" href="' +
            BASE +
            it.path +
            '">' +
            it.name +
            '</a>' +
            '<button class="text-outline hover:text-error transition-colors shrink-0" data-line-remove data-slug="' +
            it.slug +
            '" data-size="' +
            it.size +
            '" aria-label="Remove" type="button"><span class="material-symbols-outlined text-lg">close</span></button>' +
            '</div>' +
            '<span class="text-[10px] uppercase tracking-wider text-on-surface-variant mt-0.5">' +
            it.size +
            '</span>' +
            '<div class="mt-auto pt-3 flex items-center justify-between">' +
            '<div class="flex items-center border border-outline-variant">' +
            '<button class="w-7 h-7 flex items-center justify-center text-on-surface hover:text-primary" data-line-qty="-1" data-slug="' +
            it.slug +
            '" data-size="' +
            it.size +
            '" type="button">−</button>' +
            '<span class="w-7 text-center text-xs font-semibold">' +
            it.qty +
            '</span>' +
            '<button class="w-7 h-7 flex items-center justify-center text-on-surface hover:text-primary" data-line-qty="1" data-slug="' +
            it.slug +
            '" data-size="' +
            it.size +
            '" type="button">+</button>' +
            '</div>' +
            '<span class="text-sm font-bold text-on-surface">' +
            money(it.price * it.qty) +
            '</span>' +
            '</div></div></div>'
          );
        })
        .join('');
    }

    var sub = subtotal(items);
    var subEl = document.querySelector('[data-cart-subtotal]');
    if (subEl) subEl.textContent = money(sub);
    var status = document.querySelector('[data-shipping-status]');
    var bar = document.querySelector('[data-shipping-bar]');
    if (status && bar) {
      var remain = Math.max(0, FREE_SHIP - sub);
      status.textContent = remain > 0 ? money(remain) + ' away' : 'Unlocked';
      bar.style.width = Math.min(100, (sub / FREE_SHIP) * 100) + '%';
    }
  }

  /* ---------------------------------------------------------- cart page */
  function renderPage(items) {
    var wrap = document.querySelector('[data-cart-page-items]');
    var empty = document.querySelector('[data-cart-page-empty]');
    if (!wrap) return;
    if (empty) empty.classList.toggle('hidden', items.length > 0);
    wrap.innerHTML = items
      .map(function (it) {
        return (
          '<div class="flex gap-5 bg-surface-container-lowest border border-outline-variant p-4">' +
          '<a class="w-24 h-28 shrink-0 bg-surface-container overflow-hidden" href="' +
          BASE +
          it.path +
          '"><img class="w-full h-full object-contain p-2" src="' +
          BASE +
          it.image +
          '" alt=""></a>' +
          '<div class="flex-1 min-w-0 flex flex-col">' +
          '<div class="flex items-start justify-between gap-3">' +
          '<div><span class="text-[10px] uppercase tracking-wider text-tertiary">' +
          (findProduct(it.slug) ? findProduct(it.slug).categoryName : '') +
          '</span>' +
          '<a class="block font-headline text-lg font-semibold text-on-surface hover:text-primary transition-colors mt-0.5" href="' +
          BASE +
          it.path +
          '">' +
          it.name +
          '</a>' +
          '<span class="text-xs text-on-surface-variant">' +
          it.size +
          '</span></div>' +
          '<button class="text-outline hover:text-error transition-colors" data-line-remove data-slug="' +
          it.slug +
          '" data-size="' +
          it.size +
          '" type="button"><span class="material-symbols-outlined">delete</span></button>' +
          '</div>' +
          '<div class="mt-auto pt-4 flex items-center justify-between">' +
          '<div class="flex items-center border border-outline-variant">' +
          '<button class="w-9 h-9 flex items-center justify-center text-on-surface hover:text-primary" data-line-qty="-1" data-slug="' +
          it.slug +
          '" data-size="' +
          it.size +
          '" type="button">−</button>' +
          '<span class="w-9 text-center text-sm font-semibold">' +
          it.qty +
          '</span>' +
          '<button class="w-9 h-9 flex items-center justify-center text-on-surface hover:text-primary" data-line-qty="1" data-slug="' +
          it.slug +
          '" data-size="' +
          it.size +
          '" type="button">+</button>' +
          '</div>' +
          '<div class="text-right"><span class="text-xs text-on-surface-variant block">' +
          money(it.price) +
          ' each</span>' +
          '<span class="text-base font-headline font-semibold text-on-surface">' +
          money(it.price * it.qty) +
          '</span></div>' +
          '</div></div></div>'
        );
      })
      .join('');

    var sub = subtotal(items);
    Array.prototype.forEach.call(document.querySelectorAll('[data-cart-page-subtotal]'), function (e) {
      e.textContent = money(sub);
    });
    Array.prototype.forEach.call(document.querySelectorAll('[data-cart-page-total]'), function (e) {
      e.textContent = money(sub);
    });

    var recap = document.querySelector('[data-checkout-recap]');
    if (recap) {
      recap.innerHTML = items.length
        ? items
            .map(function (it) {
              return (
                '<div class="flex items-start justify-between gap-3"><span class="flex-1">' +
                it.name +
                ' <span class="text-on-surface-variant">× ' +
                it.qty +
                '</span></span><span class="font-semibold">' +
                money(it.price * it.qty) +
                '</span></div>'
              );
            })
            .join('')
        : '<p class="text-on-surface-variant">Your bag is empty.</p>';
    }
  }

  /* ------------------------------------------------------------ render */
  function render() {
    var items = read();
    renderBadges(items);
    renderDrawer(items);
    renderPage(items);
  }

  /* ------------------------------------------------------------- drawer */
  function openDrawer() {
    var d = document.querySelector('[data-cart-drawer]');
    var b = document.querySelector('[data-cart-backdrop]');
    if (!d) return;
    d.classList.remove('translate-x-full');
    if (b) {
      b.classList.remove('opacity-0', 'pointer-events-none');
    }
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    var d = document.querySelector('[data-cart-drawer]');
    var b = document.querySelector('[data-cart-backdrop]');
    if (d) d.classList.add('translate-x-full');
    if (b) b.classList.add('opacity-0', 'pointer-events-none');
    document.body.style.overflow = '';
  }

  /* --------------------------------------------------------- base path */
  var BASE = (function () {
    var s = document.querySelector('script[src*="catalog.js"]');
    return s ? s.getAttribute('src').replace('assets/js/catalog.js', '') : '';
  })();

  /* --------------------------------------------------------------- init */
  document.addEventListener('click', function (e) {
    var t = e.target.closest ? e.target.closest('[data-add-to-cart],[data-pdp-add],[data-line-qty],[data-line-remove],[data-cart-open],[data-cart-close],[data-cart-backdrop],[data-checkout-open],[data-checkout-cancel],[data-checkout-reset]') : null;
    if (!t) return;

    if (t.hasAttribute('data-add-to-cart')) {
      e.preventDefault();
      add(t.getAttribute('data-add-to-cart'), null, 1);
      return;
    }
    if (t.hasAttribute('data-pdp-add')) {
      e.preventDefault();
      var sizeBtn = document.querySelector('.size-btn.ring-2');
      var size = sizeBtn ? sizeBtn.getAttribute('data-size') : null;
      var qtyEl = document.getElementById('product-qty');
      var qty = qtyEl ? parseInt(qtyEl.textContent, 10) : 1;
      add(t.getAttribute('data-pdp-add'), size, qty);
      openDrawer();
      return;
    }
    if (t.hasAttribute('data-line-qty')) {
      var slug = t.getAttribute('data-slug');
      var size = t.getAttribute('data-size');
      var delta = parseInt(t.getAttribute('data-line-qty'), 10);
      var items = read();
      for (var i = 0; i < items.length; i++) {
        if (items[i].slug === slug && items[i].size === size) {
          setQty(slug, size, items[i].qty + delta);
          break;
        }
      }
      return;
    }
    if (t.hasAttribute('data-line-remove')) {
      removeLine(t.getAttribute('data-slug'), t.getAttribute('data-size'));
      return;
    }
    if (t.hasAttribute('data-cart-open')) {
      e.preventDefault();
      openDrawer();
      return;
    }
    if (t.hasAttribute('data-cart-close') || t.hasAttribute('data-cart-backdrop')) {
      closeDrawer();
      return;
    }
    if (t.hasAttribute('data-checkout-open')) {
      var sec = document.querySelector('[data-checkout]');
      if (sec) {
        sec.hidden = false;
        sec.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      return;
    }
    if (t.hasAttribute('data-checkout-cancel')) {
      var sec2 = document.querySelector('[data-checkout]');
      if (sec2) sec2.hidden = true;
      return;
    }
    if (t.hasAttribute('data-checkout-reset')) {
      clear();
      var sec3 = document.querySelector('[data-checkout]');
      if (sec3) sec3.hidden = true;
      var ok = document.querySelector('[data-checkout-success]');
      if (ok) ok.classList.add('hidden');
      return;
    }
  });

  /* checkout submit (demo only — no data leaves the browser) */
  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (form.getAttribute('data-demo-form') !== 'checkout') return;
    e.preventDefault();
    var msg = form.querySelector('[data-form-message]');
    var required = form.querySelectorAll('[required]');
    var missing = null;
    Array.prototype.forEach.call(required, function (f) {
      var bad = !f.value.trim() || (f.type === 'email' && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.value));
      f.style.borderColor = bad ? '#9B2C1E' : '';
      if (bad && !missing) missing = f;
    });
    if (missing) {
      if (msg) {
        msg.hidden = false;
        msg.className = 'text-xs leading-relaxed text-error';
        msg.textContent = 'Please complete the highlighted fields before continuing.';
      }
      missing.focus();
      return;
    }
    if (!read().length) {
      if (msg) {
        msg.hidden = false;
        msg.className = 'text-xs leading-relaxed text-error';
        msg.textContent = 'Your bag is empty — add a provision before checking out.';
      }
      return;
    }
    form.reset();
    var success = document.querySelector('[data-checkout-success]');
    if (success) {
      success.classList.remove('hidden');
      success.classList.add('flex');
      success.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (msg) msg.hidden = true;
  });

  /* expose small API */
  window.MA_CART = { add: add, clear: clear, read: read, toast: toast };
  render();
})();
