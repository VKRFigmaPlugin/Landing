document.addEventListener('DOMContentLoaded', function() {
  const targetSection = document.querySelector('.target-audience');
  const contentElement = document.getElementById('audience-content');
  const iconWrapper = document.querySelector('.target-audience__icon-wrapper');
  const textBlock = document.querySelector('.target-audience__text-block');
  const scrollHint = document.querySelector('.target-audience__scroll-hint');
  
  if (!targetSection || !contentElement || !iconWrapper || !textBlock) return;
  
  const content = [
    {
      title: 'Дизайнерам',
      items: [
        'Быстрые типовые макеты вместо бесконечной ручной верстки',
        'Единый стиль для всех карточек клиента',
        'Меньше рутины — больше времени на креатив'
      ]
    },
    {
      title: 'Продавцам и контент-менеджерам',
      items: [
        'Можно делать карточки без дизайнера',
        'Карточки соответствуют стандартам маркетплейсов',
        'Быстро обновлять цены и характеристики'
      ]
    }
  ];
  
  let currentIndex = 0;
  let isAnimating = false;

  let lastScrollTime = 0;
  const SCROLL_DELAY = 700;     
  const SCROLL_THRESHOLD = 40; 
  
  contentElement.style.transition = 'opacity 0.3s ease';
  iconWrapper.style.transition = 'opacity 0.3s ease';
  contentElement.style.opacity = '1';
  iconWrapper.style.opacity = '1';
  
  function renderContent(index) {
    const data = content[index];
    contentElement.innerHTML = `
      <h3 class="target-audience__title">${data.title}</h3>
      <div class="target-audience__list-wrapper">
        <ul class="target-audience__list">
          ${data.items.map(item => 
            `<li class="target-audience__list-item">
              <span class="target-audience__item-text">${item}</span>
            </li>`
          ).join('')}
        </ul>
      </div>
    `;
  }
  
  function updateIcon(index) {
    if (index === 1) {
      targetSection.classList.add('target-audience--sellers');
    } else {
      targetSection.classList.remove('target-audience--sellers');
    }
  }
  
  function switchContent(direction) {
    if (isAnimating) return;
    isAnimating = true;
    
    let newIndex = direction === 'next' 
      ? currentIndex + 1 
      : currentIndex - 1;
    
    const normalizedIndex = (newIndex + content.length) % content.length;

    if (normalizedIndex === currentIndex) {
      isAnimating = false;
      return;
    }
    
    contentElement.style.opacity = '0';
    iconWrapper.style.opacity = '0';
    
    setTimeout(() => {
      renderContent(normalizedIndex);
      updateIcon(normalizedIndex);
      currentIndex = normalizedIndex;
      
      contentElement.style.opacity = '1';
      iconWrapper.style.opacity = '1';
      
      setTimeout(() => {
        isAnimating = false;
      }, 300);
      
    }, 300);
  }
  
  renderContent(0);
  updateIcon(0);
  
  function handleWheel(e) {
    e.preventDefault();

    const now = Date.now();

    if (now - lastScrollTime < SCROLL_DELAY) return;

    if (Math.abs(e.deltaY) < SCROLL_THRESHOLD) return;

    lastScrollTime = now;

    if (e.deltaY > 0) {
      switchContent('next');
    } else {
      switchContent('prev');
    }
  }
  
  textBlock.addEventListener('wheel', handleWheel, { passive: false });
  
  let touchStartY = 0;
  
  textBlock.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });
  
  textBlock.addEventListener('touchend', (e) => {
    const touchEndY = e.changedTouches[0].clientY;
    const deltaY = touchStartY - touchEndY;
    
    if (Math.abs(deltaY) > 50) {
      if (deltaY > 0) {
        switchContent('next');
      } else {
        switchContent('prev');
      }
    }
  }, { passive: true });
  
  if (scrollHint) {
    setTimeout(() => {
      scrollHint.style.transition = 'opacity 0.5s ease';
      scrollHint.style.opacity = '0';
    }, 3000);
  }
});