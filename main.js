document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.horizontal-nav');
    const backdrop = document.querySelector('.nav-backdrop');
    const root = document.documentElement;

    if (!toggle || !nav || !backdrop) {
        return;
    }

    const ui = Site.getUi();
    const drawerMediaQuery = Site.getDrawerMediaQuery();
    let navLinks = nav.querySelectorAll('a');

    function setScrollLock(locked) {
        const value = locked ? 'hidden' : '';
        root.style.overflow = value;
        document.body.style.overflow = value;
    }

    function openNav() {
        nav.classList.add('is-open');
        backdrop.classList.add('is-visible');
        backdrop.setAttribute('aria-hidden', 'false');
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-label', ui.menuClose || 'Close menu');
        setScrollLock(true);
    }

    function closeNav() {
        if (!nav.classList.contains('is-open')) {
            return;
        }

        nav.classList.remove('is-open');
        backdrop.classList.remove('is-visible');
        backdrop.setAttribute('aria-hidden', 'true');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', ui.menuOpen || 'Open menu');
        setScrollLock(false);
    }

    function toggleNav() {
        if (nav.classList.contains('is-open')) {
            closeNav();
        } else {
            openNav();
        }
    }

    function closeNavOnScrollAttempt(event) {
        if (!nav.classList.contains('is-open') || nav.contains(event.target)) {
            return;
        }

        closeNav();
    }

    function updateDrawerMode() {
        root.classList.toggle('use-drawer', drawerMediaQuery.matches);

        if (!drawerMediaQuery.matches) {
            closeNav();
        }
    }

    function bindNavLinks() {
        navLinks = nav.querySelectorAll('a');
        navLinks.forEach((link) => {
            link.addEventListener('click', closeNav);
        });
    }

    toggle.addEventListener('click', toggleNav);
    backdrop.addEventListener('click', closeNav);

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeNav();
        }
    });

    window.addEventListener('scroll', closeNav, { passive: true });
    document.addEventListener('wheel', closeNavOnScrollAttempt, { passive: true });
    document.addEventListener('touchmove', closeNavOnScrollAttempt, { passive: true });
    drawerMediaQuery.addEventListener('change', updateDrawerMode);

    bindNavLinks();
    updateDrawerMode();
});
