// Navigation Hamburger - Patrick ASSO Couture
(function () {
    var toggle = document.getElementById('menuToggle');
    var nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    function closeNav() {
        nav.classList.remove('nav-open');
        toggle.classList.remove('is-active');
        toggle.setAttribute('aria-expanded', 'false');
    }

    // Hamburger toggle
    toggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = nav.classList.toggle('nav-open');
        toggle.classList.toggle('is-active', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    // Mobile dropdown toggle (click on dropbtn)
    nav.querySelectorAll('.dropbtn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                e.stopPropagation();
                var parentLi = btn.closest('.dropdown');
                // Close other dropdowns
                nav.querySelectorAll('.dropdown.open').forEach(function (d) {
                    if (d !== parentLi) d.classList.remove('open');
                });
                parentLi.classList.toggle('open');
            }
        });
    });

    // Close nav on regular link click (not dropbtn on mobile)
    nav.querySelectorAll('a:not(.dropbtn)').forEach(function (link) {
        link.addEventListener('click', closeNav);
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && !toggle.contains(e.target)) {
            closeNav();
            nav.querySelectorAll('.dropdown.open').forEach(function (d) {
                d.classList.remove('open');
            });
        }
    });

    // On resize back to desktop: reset state
    window.addEventListener('resize', function () {
        if (window.innerWidth > 900) {
            closeNav();
            nav.querySelectorAll('.dropdown.open').forEach(function (d) {
                d.classList.remove('open');
            });
        }
    });
})();
