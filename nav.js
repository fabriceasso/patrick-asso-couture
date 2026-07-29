// Navigation Hamburger - Patrick ASSO Couture
function initNav() {
    var toggle = document.getElementById('menuToggle');
    var nav = document.querySelector('.main-nav');
    if (!toggle || !nav) return;

    // Remove old listeners by cloning
    var newToggle = toggle.cloneNode(true);
    toggle.parentNode.replaceChild(newToggle, toggle);

    function closeNav() {
        nav.classList.remove('nav-open');
        newToggle.classList.remove('is-active');
        newToggle.setAttribute('aria-expanded', 'false');
    }

    newToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        var isOpen = nav.classList.toggle('nav-open');
        newToggle.classList.toggle('is-active', isOpen);
        newToggle.setAttribute('aria-expanded', String(isOpen));
    });

    nav.querySelectorAll('.dropbtn').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            if (window.innerWidth <= 900) {
                e.preventDefault();
                e.stopPropagation();
                var parentLi = btn.closest('.dropdown');
                nav.querySelectorAll('.dropdown.open').forEach(function (d) {
                    if (d !== parentLi) d.classList.remove('open');
                });
                parentLi.classList.toggle('open');
            }
        });
    });

    nav.querySelectorAll('a:not(.dropbtn)').forEach(function (link) {
        link.addEventListener('click', closeNav);
    });

    document.addEventListener('click', function (e) {
        if (!nav.contains(e.target) && !newToggle.contains(e.target)) {
            closeNav();
            nav.querySelectorAll('.dropdown.open').forEach(function (d) {
                d.classList.remove('open');
            });
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 900) {
            closeNav();
            nav.querySelectorAll('.dropdown.open').forEach(function (d) {
                d.classList.remove('open');
            });
        }
    });
}

// Auto-init if header is already in the DOM (legacy pages)
if (document.getElementById('site-header') === null) {
    document.addEventListener('DOMContentLoaded', initNav);
}
