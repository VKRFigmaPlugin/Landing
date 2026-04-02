(function() {
  'use strict';

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const navLinks = document.querySelectorAll('.header__nav .nav-link');
    
    if (!navLinks.length) return;

    const sections = ['pain-points', 'features', 'target-audience', 'team', 'faq'];

    function getTargetId(link) {
      const href = link.getAttribute('href') || '';
      const hashIndex = href.indexOf('#');

      if (hashIndex === -1) {
        return '';
      }

      return href.slice(hashIndex + 1);
    }

    function setActiveLink(targetId) {
      navLinks.forEach(link => {
        const linkId = getTargetId(link);
        link.classList.toggle('active', linkId === targetId);
      });
    }

    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        const targetId = getTargetId(this);
        const targetSection = document.getElementById(targetId);
        
        if (!targetSection) {
          return;
        }

        e.preventDefault();
        targetSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        setActiveLink(targetId);
      });
    });

    let ticking = false;
    function updateActiveSection() {
      const scrollY = window.scrollY + 120; 
      let activeSection = '';

      sections.forEach(sectionId => {
        const section = document.getElementById(sectionId);
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
            activeSection = sectionId;
          }
        }
      });

      if (activeSection) {
        setActiveLink(activeSection);
      }
    }

    window.addEventListener('scroll', function() {
      if (!ticking) {
        requestAnimationFrame(updateActiveSection);
        ticking = true;
      }
      setTimeout(() => {
        ticking = false;
      }, 150);
    }, { passive: true });

    setTimeout(updateActiveSection, 100);
  }

})();
