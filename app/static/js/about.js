document.addEventListener('DOMContentLoaded', () => {
  const aboutPage = document.querySelector('.about-page');

  if (!aboutPage) {
    return;
  }

  const revealItems = aboutPage.querySelectorAll('.js-reveal');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    revealItems.forEach((item) => item.classList.add('is-visible'));
    return;
  }

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, {
    threshold: 0.18,
    rootMargin: '0px 0px -60px 0px'
  });

  revealItems.forEach((item) => revealObserver.observe(item));
});
