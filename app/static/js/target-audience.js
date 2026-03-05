document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.target-audience');
    if (!section) return;

    const track = section.querySelector('.target-audience__track');
    const firstVisual = section.querySelector('.target-audience__visual--1');
    const secondVisual = section.querySelector('.target-audience__visual--2');
    const firstPanel = section.querySelector('.target-audience__panel--1');
    const secondPanel = section.querySelector('.target-audience__panel--2');

    if (!track || !firstVisual || !secondVisual || !firstPanel || !secondPanel) return;

    const mobileMedia = window.matchMedia('(max-width: 900px)');

    function resetDesktopState() {
        section.classList.remove('is-leaving-first', 'is-showing-second', 'is-switched');

        firstVisual.classList.add('is-active');
        firstPanel.classList.add('is-active');

        secondVisual.classList.remove('is-active');
        secondPanel.classList.remove('is-active');
    }

    function setPhase(progress) {
        if (mobileMedia.matches) {
            resetDesktopState();
            return;
        }

        // Фазы:
        // 0.00 - 0.42  -> первый слайд полностью виден
        // 0.42 - 0.56  -> первый слайд уходит
        // 0.56 - 0.64  -> пауза между слайдами
        // 0.64 - 1.00  -> второй слайд появляется / виден

        const isLeavingFirst = progress >= 0.42;
        const isShowingSecond = progress >= 0.64;

        section.classList.toggle('is-leaving-first', isLeavingFirst);
        section.classList.toggle('is-showing-second', isShowingSecond);
        section.classList.toggle('is-switched', isShowingSecond);

        firstVisual.classList.toggle('is-active', !isLeavingFirst);
        firstPanel.classList.toggle('is-active', !isLeavingFirst);

        secondVisual.classList.toggle('is-active', isShowingSecond);
        secondPanel.classList.toggle('is-active', isShowingSecond);
    }

    function updateOnScroll() {
        if (mobileMedia.matches) {
            resetDesktopState();
            return;
        }

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

    function handleChange() {
        if (mobileMedia.matches) {
            resetDesktopState();
        } else {
            updateOnScroll();
        }
    }

    window.addEventListener('scroll', updateOnScroll, { passive: true });
    window.addEventListener('resize', handleChange);
    mobileMedia.addEventListener('change', handleChange);

    updateOnScroll();
});