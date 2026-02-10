function initFeaturesAnimation() {
  const featuresSection = document.querySelector('.features');
  
  if (!featuresSection) {
    console.log('Секция .features не найдена');
    return;
  }
  
  console.log('Секция .features найдена, настраиваю observer для анимации карточек');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      console.log('Intersection Observer сработал, видимость:', entry.isIntersecting);
      
      if (entry.isIntersecting) {
        console.log('Секция в зоне видимости, добавляю класс animated');
        featuresSection.classList.add('animated');
      } else {
        console.log('Секция вышла из зоны видимости, убираю класс animated');
        featuresSection.classList.remove('animated');
        
        // сброс анимации для повтора
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

function initComparisonSlider() {
  const slider = document.querySelector('.slider__range-js');
  
  if (!slider) {
    console.log('Слайдер сравнения не найден');
    return;
  }
  
  console.log('Слайдер сравнения найден во второй секции, настраиваю...');
  
  const updateSlider = () => {
    const value = slider.value;
    const sliderContainer = slider.closest('.features__slider');
    
    if (sliderContainer) {
      sliderContainer.style.setProperty('--value', `${value}%`);
    }
  };
  
  slider.addEventListener('input', updateSlider);
  
  let isDragging = false;
  
  slider.addEventListener('mousedown', () => {
    isDragging = true;
    document.body.style.userSelect = 'none';
  });
  
  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
  });
  
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      updateSlider();
    }
  });
  
  slider.addEventListener('touchstart', (e) => {
    e.preventDefault();
    isDragging = true;
  });
  
  document.addEventListener('touchend', () => {
    isDragging = false;
  });
  
  document.addEventListener('touchmove', (e) => {
    if (isDragging && e.touches.length === 1) {
      e.preventDefault();
      updateSlider();
    }
  });
  
  updateSlider();
  console.log('Слайдер сравнения во второй секции инициализирован');
}

document.addEventListener('DOMContentLoaded', function() {
  initFeaturesAnimation();
  initComparisonSlider();
});

window.addEventListener('load', function() {
  initComparisonSlider();
});