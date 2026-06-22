document.addEventListener('DOMContentLoaded', () => {
  let startX = 0;
  let startY = 0;
  let isRangeGesture = false;

  const isInteractiveHorizontalControl = (target) => {
    return Boolean(target.closest('.slider, .slider__range, input[type="range"]'));
  };

  document.addEventListener('touchstart', (event) => {
    if (event.touches.length !== 1) return;

    startX = event.touches[0].clientX;
    startY = event.touches[0].clientY;
    isRangeGesture = isInteractiveHorizontalControl(event.target);
  }, { passive: true });

  document.addEventListener('touchmove', (event) => {
    if (event.touches.length !== 1 || isRangeGesture) return;

    const deltaX = event.touches[0].clientX - startX;
    const deltaY = event.touches[0].clientY - startY;

    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 8) {
      event.preventDefault();
    }
  }, { passive: false });
});
