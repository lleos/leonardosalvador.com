(function () {
  'use strict';

  /* Legacy transition class hid the page until runtime JS ran; show content immediately */
  document.body.classList.remove('transition-enabled');
  document.body.classList.add('transition-in');

  function qs(sel, ctx) { return (ctx || document).querySelector(sel); }
  function qsa(sel, ctx) { return Array.from((ctx || document).querySelectorAll(sel)); }

  /* Mobile nav */
  var nav = qs('.js-responsive-nav');
  var openBtn = qs('.js-hamburger');
  var closeBtn = qs('.js-close-responsive-nav');
  function setNav(open) {
    document.body.classList.toggle('show-responsive-nav', open);
    if (openBtn) openBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function toggleNav() {
    setNav(!document.body.classList.contains('show-responsive-nav'));
  }
  if (openBtn) {
    openBtn.setAttribute('role', 'button');
    openBtn.setAttribute('aria-label', 'Open menu');
    openBtn.setAttribute('aria-expanded', 'false');
    openBtn.addEventListener('click', toggleNav);
  }
  if (closeBtn) closeBtn.addEventListener('click', function () { setNav(false); });
  qsa('.js-responsive-nav a').forEach(function (link) {
    link.addEventListener('click', function () { setNav(false); });
  });

  /* Lazy load images
   * Legacy export uses height="0" + padding-bottom aspect ratio, which makes
   * IntersectionObserver treat images as 0px tall (never intersecting). */
  function markLoaded(img) {
    img.classList.add('image-loaded');
    img.classList.remove('js-lazy');
    if (img.style.background) img.style.background = 'transparent';

    /* height=0 + padding-bottom on content images; restore real dimensions */
    if (img.classList.contains('e2e-site-project-module-image') || img.closest('.project-module-image')) {
      img.style.display = 'block';
      img.style.width = '100%';
      img.style.height = 'auto';
      img.style.paddingBottom = '0';
      img.removeAttribute('height');
    }
  }

  function loadLazy(img) {
    if (!img || !img.classList.contains('js-lazy')) return;

    var src = img.getAttribute('data-src');
    var srcset = img.getAttribute('data-srcset');
    var sizes = img.getAttribute('data-sizes');

    function onDone() {
      markLoaded(img);
    }

    if (src || srcset) {
      img.addEventListener('load', onDone, { once: true });
      img.addEventListener('error', onDone, { once: true });
      if (src) img.src = src;
      if (srcset) img.srcset = srcset;
      if (sizes) img.sizes = sizes;
      img.removeAttribute('data-src');
      img.removeAttribute('data-srcset');
      if (img.complete && img.naturalWidth > 0) onDone();
    } else {
      onDone();
    }
  }

  qsa('img.js-lazy').forEach(loadLazy);

  /* Cover thumbnails: load eagerly (lazy + 0-height containers skip intersection) */
  qsa('.cover__img').forEach(function (img) {
    img.loading = 'eager';
    img.classList.add('image-loaded');
    img.classList.remove('js-lazy');
  });

  /* Grid galleries hidden until legacy JS added grid--ready */
  qsa('.grid--main').forEach(function (grid) {
    grid.classList.add('grid--ready');
  });

  /* Lightbox */
  var overlay;
  function closeLightbox() {
    if (overlay) { overlay.remove(); overlay = null; document.body.style.overflow = ''; }
  }
  function openLightbox(src) {
    closeLightbox();
    overlay = document.createElement('div');
    overlay.className = 'site-lightbox';
    overlay.innerHTML = '<button type="button" class="site-lightbox__close" aria-label="Close">&times;</button><img src="' + src + '" alt="">';
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay || e.target.classList.contains('site-lightbox__close')) closeLightbox();
    });
    document.body.appendChild(overlay);
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', function onKey(e) {
      if (e.key === 'Escape') { closeLightbox(); document.removeEventListener('keydown', onKey); }
    });
  }
  qsa('.js-lightbox').forEach(function (el) {
    el.style.cursor = 'zoom-in';
    el.addEventListener('click', function () {
      var src = el.getAttribute('data-src') || (qs('img', el) && qs('img', el).src);
      if (src) openLightbox(src);
    });
  });

  /* Back to top */
  var btt = qs('.js-back-to-top');
  if (btt) {
    btt.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
})();
