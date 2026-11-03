/* SRA blog: optional left-hand article outline, generated from rendered headings. */
(function () {
  'use strict';

  var toc = document.querySelector('[data-article-toc]');
  var article = document.querySelector('.article-body.prose');
  if (!toc || !article) return;

  var headings = Array.prototype.slice.call(article.querySelectorAll('h1, h2, h3'));
  if (headings.length < 2) return;

  var list = toc.querySelector('[data-toc-list]');
  var details = toc.querySelector('[data-toc-details]');
  if (!list || !details) return;

  function headingId(heading, index) {
    if (heading.id) return heading.id;
    var base = (heading.textContent || '').toLowerCase().trim()
      .normalize('NFKD').replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9\u00c0-\uffff]+/g, '-')
      .replace(/^-+|-+$/g, '') || ('section-' + (index + 1));
    var candidate = base;
    var suffix = 2;
    while (document.getElementById(candidate)) {
      candidate = base + '-' + suffix;
      suffix += 1;
    }
    heading.id = candidate;
    return candidate;
  }

  var links = headings.map(function (heading, index) {
    var li = document.createElement('li');
    li.className = 'toc-item toc-level-' + heading.tagName.toLowerCase();
    var link = document.createElement('a');
    link.className = 'toc-link';
    link.href = '#' + encodeURIComponent(headingId(heading, index));
    link.textContent = (heading.textContent || '').trim();
    li.appendChild(link);
    list.appendChild(li);
    return link;
  });

  toc.hidden = false;

  // Keep the desktop hide/show preference across blog posts and reloads.
  // On narrower screens, use a collapsed inline disclosure instead.
  var wide = window.matchMedia('(min-width: 1200px)');
  var storageKey = 'sra-article-toc-open';
  var desktopOpen = true;
  try {
    desktopOpen = window.localStorage.getItem(storageKey) !== 'false';
  } catch (e) { /* Privacy settings may prevent storage. */ }

  function syncDisclosure() {
    details.open = wide.matches ? desktopOpen : false;
  }
  syncDisclosure();
  if (wide.addEventListener) wide.addEventListener('change', syncDisclosure);
  else if (wide.addListener) wide.addListener(syncDisclosure);

  details.addEventListener('toggle', function () {
    if (!wide.matches) return;
    desktopOpen = details.open;
    try { window.localStorage.setItem(storageKey, String(desktopOpen)); }
    catch (e) { /* The toggle still works without persistence. */ }
  });

  function updateActive() {
    var current = 0;
    headings.forEach(function (heading, index) {
      if (heading.getBoundingClientRect().top <= 150) current = index;
    });
    links.forEach(function (link, index) {
      if (index === current) {
        link.classList.add('is-active');
        link.setAttribute('aria-current', 'location');
      } else {
        link.classList.remove('is-active');
        link.removeAttribute('aria-current');
      }
    });
  }

  var scheduled = false;
  window.addEventListener('scroll', function () {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(function () {
      scheduled = false;
      updateActive();
    });
  }, { passive: true });
  window.addEventListener('resize', updateActive);
  window.addEventListener('hashchange', function () {
    window.requestAnimationFrame(updateActive);
  });
  list.addEventListener('click', function (event) {
    var link = event.target.closest('a.toc-link');
    if (link && !wide.matches) details.open = false;
  });
  updateActive();
}());
