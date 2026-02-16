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

  if (slider.dataset.initialized === 'true') {
    return;
  }

  slider.dataset.initialized = 'true';
  console.log('Слайдер сравнения найден во второй секции, настраиваю...');

  const sliderContainer = slider.closest('.features__slider');

  if (!sliderContainer) {
    console.log('Контейнер слайдера не найден');
    return;
  }

  const setSliderValue = (value) => {
    const clampedValue = Math.max(0, Math.min(100, value));
    slider.value = `${clampedValue}`;
    sliderContainer.style.setProperty('--value', `${clampedValue}%`);
  };

  const updateSlider = () => {
    setSliderValue(Number(slider.value));
  };

  slider.addEventListener('input', updateSlider);

  let isDragging = false;
  let isAutoAnimating = false;
  let hasPlayedInView = false;
  let frameId = null;

  const animateSlider = (from, to, duration, onComplete) => {
    if (frameId !== null) {
      cancelAnimationFrame(frameId);
      frameId = null;
    }

    const start = performance.now();

    const step = (timestamp) => {
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const currentValue = from + (to - from) * eased;

      setSliderValue(currentValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(step);
      } else {
        frameId = null;
        if (onComplete) {
          onComplete();
        }
      }
    };

    frameId = requestAnimationFrame(step);
  };

  const runAutoPreview = () => {
    if (isAutoAnimating) {
      return;
    }

    isAutoAnimating = true;
    slider.disabled = true;
    setSliderValue(0);

    animateSlider(0, 100, 600, () => {
      window.setTimeout(() => {
        animateSlider(100, 50, 450, () => {
          slider.disabled = false;
          isAutoAnimating = false;
        });
      }, 150);
    });
  };

  slider.addEventListener('mousedown', () => {
    if (isAutoAnimating) {
      return;
    }

    isDragging = true;
    document.body.style.userSelect = 'none';
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    document.body.style.userSelect = '';
  });

  document.addEventListener('mousemove', () => {
    if (isDragging) {
      updateSlider();
    }
  });

  slider.addEventListener('touchstart', (e) => {
    if (isAutoAnimating) {
      e.preventDefault();
      return;
    }

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

  const visibilityObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.99 && !hasPlayedInView) {
        hasPlayedInView = true;
        runAutoPreview();
      }

      if (entry.intersectionRatio < 0.4) {
        hasPlayedInView = false;
        if (!isAutoAnimating) {
          setSliderValue(0);
        }
      }
    });
  }, {
    threshold: [0.4, 0.99]
  });

  visibilityObserver.observe(sliderContainer);
  setSliderValue(0);
  console.log('Слайдер сравнения во второй секции инициализирован');
}

document.addEventListener('DOMContentLoaded', function() {
  initFeaturesAnimation();
  initComparisonSlider();
});

window.addEventListener('load', function() {
  initComparisonSlider();
});
