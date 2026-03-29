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

    function setActiveLink(targetId) {
      navLinks.forEach(link => {
        const linkId = link.getAttribute('href').substring(1);
        link.classList.toggle('active', linkId === targetId);
      });
    }

    navLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          targetSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          setActiveLink(targetId);
        }
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