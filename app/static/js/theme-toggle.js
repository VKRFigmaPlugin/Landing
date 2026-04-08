(function() {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const toggles = document.querySelectorAll('[data-theme-toggle]');

    if (!toggles.length) {
      return;
    }

    const storageKey = 'preferred-theme';

    function getTheme() {
      return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
    }

    function getNextTheme(theme) {
      return theme === 'light' ? 'dark' : 'light';
    }

    function getLabel(theme) {
      return theme === 'light' ? 'Включить тёмную тему' : 'Включить светлую тему';
    }

    function syncButtons(theme) {
      const isLight = theme === 'light';
      const label = getLabel(theme);

      toggles.forEach((toggle) => {
        toggle.setAttribute('aria-pressed', String(isLight));
        toggle.setAttribute('aria-label', label);
        toggle.setAttribute('title', label);
      });
    }

    function setTheme(theme, options) {
      const shouldPersist = !options || options.persist !== false;

      document.documentElement.setAttribute('data-theme', theme);
      syncButtons(theme);

      if (!shouldPersist) {
        return;
      }

      try {
        localStorage.setItem(storageKey, theme);
      } catch (error) {}
    }

    const initialTheme = getTheme();
    syncButtons(initialTheme);

    toggles.forEach((toggle) => {
      toggle.addEventListener('click', () => {
        setTheme(getNextTheme(getTheme()));
      });
    });
  }
})();
