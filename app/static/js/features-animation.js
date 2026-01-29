function initFeaturesAnimation() {
  const featuresSection = document.querySelector('.features');
  
  if (!featuresSection) {
    console.log('Секция .features не найдена');
    return;
  }
  
  console.log('Секция .features найдена, настраиваю observer');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      console.log('Intersection Observer сработал, видимость:', entry.isIntersecting);
      
      if (entry.isIntersecting) {
        console.log('Секция в зоне видимости, добавляю класс animated');
        featuresSection.classList.add('animated');
      } else {
        console.log('Секция вышла из зоны видимости, убираю класс animated');
        featuresSection.classList.remove('animated');
        
        //сброс анимации для повтора
        const cards = featuresSection.querySelectorAll(
          '.features__card--farleft, .features__card--left, .features__card--right, .features__card--farright'
        );
        
        cards.forEach(card => {
          card.style.animation = 'none';
          void card.offsetWidth;
          card.style.animation = '';
        });
      }
    });
  }, {
    threshold: 0.2, 
    rootMargin: '50px 0px -50px 0px' 
  });
  
  observer.observe(featuresSection);
  console.log('Observer запущен для секции .features');
}

document.addEventListener('DOMContentLoaded', initFeaturesAnimation);
window.addEventListener('load', initFeaturesAnimation);