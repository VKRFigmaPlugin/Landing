document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.target-audience');
    if (!section) return;

    const track = section.querySelector('.target-audience__track');
    const firstVisual = section.querySelector('.target-audience__visual--1');
    const secondVisual = section.querySelector('.target-audience__visual--2');
    const firstPanel = section.querySelector('.target-audience__panel--1');
    const secondPanel = section.querySelector('.target-audience__panel--2');

    if (!track || !firstVisual || !secondVisual || !firstPanel || !secondPanel) return;

    function resetDesktopState() {
        section.classList.remove('is-leaving-first', 'is-showing-second', 'is-switched');

        firstVisual.classList.add('is-active');
        firstPanel.classList.add('is-active');

        secondVisual.classList.remove('is-active');
        secondPanel.classList.remove('is-active');
    }

    function setPhase(progress) {
        // Фазы:
        // 0.00 - 0.56  -> первый слайд остаётся видимым
        // 0.56 - 1.00  -> показываем второй слайд
        //
        // Раньше между состояниями была "пустая зона", где оба блока снимались.
        // Теперь первый блок держится до момента фактического переключения.

        const isLeavingFirst = progress >= 0.42;
        const isShowingSecond = progress >= 0.56;
        const isShowingFirst = !isShowingSecond;

        section.classList.toggle('is-leaving-first', isLeavingFirst);
        section.classList.toggle('is-showing-second', isShowingSecond);
        section.classList.toggle('is-switched', isShowingSecond);

        firstVisual.classList.toggle('is-active', isShowingFirst);
        firstPanel.classList.toggle('is-active', isShowingFirst);

        secondVisual.classList.toggle('is-active', isShowingSecond);
        secondPanel.classList.toggle('is-active', isShowingSecond);
    }

    function updateOnScroll() {

        const rect = track.getBoundingClientRect();
        const scrollable = track.offsetHeight - window.innerHeight;

        if (scrollable <= 0) {
            resetDesktopState();
            return;
        }

        let progress = -rect.top / scrollable;
        progress = Math.max(0, Math.min(1, progress));

        setPhase(progress);
    }

    window.addEventListener('scroll', updateOnScroll, { passive: true });

    updateOnScroll();
});
