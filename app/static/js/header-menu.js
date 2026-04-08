(function() {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const header = document.querySelector('[data-header]');

    if (!header) {
      return;
    }

    const burger = header.querySelector('.header__burger');
    const nav = header.querySelector('.header__nav');
    const overlay = header.querySelector('.header__overlay');
    const navLinks = header.querySelectorAll('.header__nav a');
    const desktopMedia = window.matchMedia('(max-width: 1024px)');

    if (!burger || !nav || !overlay) {
      return;
    }

    function syncState(isOpen) {
      header.classList.toggle('is-menu-open', isOpen);
      document.body.classList.toggle('header-menu-open', isOpen);
      burger.setAttribute('aria-expanded', String(isOpen));
      burger.setAttribute('aria-label', isOpen ? 'Закрыть меню' : 'Открыть меню');
      nav.setAttribute('aria-hidden', String(!isOpen && desktopMedia.matches));
    }

    function closeMenu() {
      syncState(false);
    }

    function openMenu() {
      if (!desktopMedia.matches) {
        return;
      }

      syncState(true);
    }

    function toggleMenu() {
      if (header.classList.contains('is-menu-open')) {
        closeMenu();
        return;
      }

      openMenu();
    }

    function handleViewportChange(event) {
      if (!event.matches) {
        closeMenu();
        nav.setAttribute('aria-hidden', 'false');
        return;
      }

      nav.setAttribute('aria-hidden', String(!header.classList.contains('is-menu-open')));
    }

    burger.addEventListener('click', toggleMenu);
    overlay.addEventListener('click', closeMenu);

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (!desktopMedia.matches) {
          return;
        }

        closeMenu();
      });
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        closeMenu();
      }
    });

    desktopMedia.addEventListener('change', handleViewportChange);
    handleViewportChange(desktopMedia);
  }
})();
