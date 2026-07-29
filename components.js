document.addEventListener('DOMContentLoaded', function () {
    var headerEl = document.getElementById('site-header');
    var footerEl = document.getElementById('site-footer');
    var pathname = window.location.pathname.replace(/\/$/, '') || '/index';
    var page = pathname.split('/').pop().split('?')[0].split('#')[0];
    if (page === 'index') page = '/';

    function setActiveLink(doc) {
        doc.querySelectorAll('.main-nav a').forEach(function (a) {
            var href = a.getAttribute('href').replace(/\.html$/, '').split('?')[0].split('#')[0];
            if (href === page || href === '/' + page) {
                a.classList.add('active-nav');
                a.setAttribute('aria-current', 'page');
            }
        });
    }

    if (headerEl) {
        fetch('/header.html')
            .then(function (r) {
                if (!r.ok) throw new Error(r.status);
                return r.text();
            })
            .then(function (html) {
                headerEl.innerHTML = html;
                setActiveLink(headerEl);
                if (typeof initNav === 'function') initNav();
            })
            .catch(function () {
                console.warn('Header non chargé.');
            });
    }

    if (footerEl) {
        fetch('/footer.html')
            .then(function (r) {
                if (!r.ok) throw new Error(r.status);
                return r.text();
            })
            .then(function (html) {
                footerEl.innerHTML = html;
            })
            .catch(function () {
                console.warn('Footer non chargé.');
            });
    }
});
