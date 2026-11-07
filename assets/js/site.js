(function () {
  'use strict';
  var button = document.querySelector('[data-theme-toggle]');
  if (!button) return;

  function getTheme() {
    return document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  }
  function syncButton() {
    var dark = getTheme() === 'dark';
    button.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
    button.setAttribute('title', dark ? 'Switch to light mode' : 'Switch to dark mode');
    button.setAttribute('aria-pressed', String(dark));
  }
  button.addEventListener('click', function () {
    var next = getTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute('content', next === 'dark' ? '#232222' : '#faf9f7');
    try { localStorage.setItem('sra-color-theme', next); } catch (e) { /* Optional preference */ }
    syncButton();
  });
  syncButton();
}());
