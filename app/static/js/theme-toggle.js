(function () {
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
        const root = document.documentElement;
        const transitionClass = 'is-theme-switching';
        const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
        let transitionTimer = null;

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
            const shouldAnimate = !!options && options.animate === true;

            if (shouldAnimate && !reducedMotionQuery.matches) {
                root.classList.add(transitionClass);
                void root.offsetWidth;
            }

            root.setAttribute('data-theme', theme);
            syncButtons(theme);

            if (shouldAnimate && !reducedMotionQuery.matches) {
                window.clearTimeout(transitionTimer);
                transitionTimer = window.setTimeout(() => {
                    root.classList.remove(transitionClass);
                }, 420);
            }

            if (!shouldPersist) {
                return;
            }

            try {
                localStorage.setItem(storageKey, theme);
            } catch (error) {
            }
        }

        const initialTheme = getTheme();
        syncButtons(initialTheme);

        toggles.forEach((toggle) => {
            toggle.addEventListener('click', () => {
                setTheme(getNextTheme(getTheme()), {animate: true});
            });
        });
    }
})();
