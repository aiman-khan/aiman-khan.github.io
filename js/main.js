/* Aiman Sartaj — portfolio. Vanilla JS, no dependencies, loaded with `defer`. */
(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const root = document.documentElement;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Theme toggle (initial theme is set by the inline script in <head>). */
  const store = {
    get: (k) => { try { return localStorage.getItem(k); } catch { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch { /* private mode */ } },
  };
  const themeColor = $('meta[name="theme-color"]');
  const applyTheme = (t) => {
    root.dataset.theme = t;
    if (themeColor) themeColor.content = t === 'light' ? '#f6f6f2' : '#07080c';
  };
  $$('[data-theme-toggle]').forEach((b) => b.addEventListener('click', () => {
    const next = root.dataset.theme === 'light' ? 'dark' : 'light';
    applyTheme(next);
    store.set('theme', next);
  }));

  /* Mobile menu. */
  const nav = $('.nav');
  const burger = $('.burger');
  const setMenu = (open) => {
    nav.classList.toggle('is-open', open);
    burger.setAttribute('aria-expanded', String(open));
    root.style.overflow = open ? 'hidden' : '';
  };
  burger?.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  $$('.menu a').forEach((a) => a.addEventListener('click', () => setMenu(false)));
  matchMedia('(min-width: 861px)').addEventListener('change', (e) => e.matches && setMenu(false));

  /* Nav background + scroll progress, throttled to one update per frame. */
  const progress = $('.progress');
  let ticking = false;
  const onScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const y = scrollY;
      nav.classList.toggle('is-stuck', y > 12);
      const max = root.scrollHeight - innerHeight;
      progress.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
      ticking = false;
    });
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* Highlight the nav link for the section in view. */
  const links = $$('.nav__link');
  const spy = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      links.forEach((l) => l.setAttribute('aria-current', String(l.hash === '#' + e.target.id)));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  $$('main section[id]').forEach((s) => spy.observe(s));

  /* Scroll reveals. */
  const reveals = $$('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    reveals.forEach((el) => io.observe(el));
  }

  /* Count-up stats. */
  const countUp = (el) => {
    const end = +el.dataset.count;
    if (reduced) { el.textContent = end; return; }
    const t0 = performance.now();
    const dur = 1100;
    const step = (t) => {
      const k = Math.min(1, (t - t0) / dur);
      el.textContent = Math.round(end * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };
  const counter = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      countUp(e.target);
      counter.unobserve(e.target);
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach((el) => counter.observe(el));

  /* Cursor spotlight on project cards (mouse only). */
  if (matchMedia('(hover: hover) and (pointer: fine)').matches) {
    $$('.card').forEach((card) => card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    }));
  }

  /* Case-study dialogs. Each card has id="<slug>", its dialog id="cs-<slug>".
     Opening one puts #<slug> in the URL so a case study can be linked directly. */
  const openCase = (slug, push = true) => {
    const d = document.getElementById('cs-' + slug);
    if (!d || d.open) return;
    d.showModal();
    d.tabIndex = -1;
    d.focus(); // keep focus in the dialog without ringing the close button
    d.scrollTop = 0;
    if (push) history.replaceState(null, '', '#' + slug);
  };
  $$('[data-open]').forEach((b) => b.addEventListener('click', () => openCase(b.dataset.open)));
  $$('dialog.cs').forEach((d) => {
    d.addEventListener('click', (e) => { if (e.target === d) d.close(); }); // click on backdrop
    $$('[data-close]', d).forEach((b) => b.addEventListener('click', () => d.close()));
    d.addEventListener('close', () => {
      if (location.hash === '#' + d.id.slice(3)) history.replaceState(null, '', '#work');
    });
  });
  const fromHash = () => {
    const slug = location.hash.slice(1);
    if (slug && document.getElementById('cs-' + slug)) openCase(slug, false);
  };
  addEventListener('hashchange', fromHash);
  fromHash();

  /* Copy email. */
  $$('[data-copy]').forEach((b) => b.addEventListener('click', async () => {
    const label = $('span', b);
    try {
      await navigator.clipboard.writeText(b.dataset.copy);
      b.classList.add('is-done');
      label.textContent = 'Copied';
      setTimeout(() => { b.classList.remove('is-done'); label.textContent = 'Copy'; }, 1800);
    } catch {
      location.href = 'mailto:' + b.dataset.copy;
    }
  }));

  /* Footer year. */
  const year = $('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
