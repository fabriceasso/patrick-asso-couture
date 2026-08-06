/* ========================================
   INTRO CONTROLLER - "L'Éclat"
   Patrick ASSO Couture
   Preloads main page assets during intro
   Only plays on first visit (sessionStorage)
   ======================================== */

(function () {
    'use strict';

    var SESSION_KEY = 'patrickasso_intro_seen';

    if (sessionStorage.getItem(SESSION_KEY)) {
        var overlay = document.getElementById('intro-overlay');
        if (overlay) overlay.remove();
        return;
    }

    var overlay = document.getElementById('intro-overlay');
    if (!overlay) return;

    var INTRO_MIN_DURATION = 3800;
    var startTime = Date.now();

    document.body.style.overflow = 'hidden';

    var chime = new Audio('sounds/crystal-chime.mp3');
    chime.volume = 0.35;
    chime.preload = 'auto';

    function playChime() {
        var playPromise = chime.play();
        if (playPromise !== undefined) {
            playPromise.catch(function () {
                var unlock = function () {
                    chime.play();
                    document.removeEventListener('click', unlock);
                    document.removeEventListener('touchstart', unlock);
                };
                document.addEventListener('click', unlock);
                document.addEventListener('touchstart', unlock);
            });
        }
    }

    playChime();

    var carouselImages = [
        'images/carrousel/urban_0.jpg',
        'images/carrousel/urban_3.jpg',
        'images/carrousel/urban_50.jpg',
        'images/carrousel/urban_1.jpg',
        'images/carrousel/urban_14.jpg',
        'images/carrousel/urban_17.jpg',
        'images/carrousel/urban_5.jpg',
        'images/carrousel/urban_51.jpg',
        'images/carrousel/urban_7.jpg',
        'images/carrousel/urban_8.jpg',
        'images/carrousel/wedding_1.jpg',
        'images/carrousel/wedding_4.jpg',
        'images/carrousel/wedding_5.jpg',
        'images/carrousel/or_1.jpg',
        'images/patrick_asso/patrick_asso_1.jpg',
        'images/atelier/atelier.jpg',
        'images/collection/wedding_glams/wedding_4.jpg',
        'images/collection/asian/asian_3.jpg'
    ];

    var loaded = 0;
    var total = carouselImages.length;

    function onImageReady() {
        loaded++;
        if (loaded >= total) {
            finishIntro();
        }
    }

    function finishIntro() {
        var elapsed = Date.now() - startTime;
        var remaining = INTRO_MIN_DURATION - elapsed;

        if (remaining > 0) {
            setTimeout(hideOverlay, remaining);
        } else {
            hideOverlay();
        }
    }

    function hideOverlay() {
        sessionStorage.setItem(SESSION_KEY, '1');
        overlay.classList.add('hidden');
        document.body.style.overflow = '';
        chime.pause();
        chime.currentTime = 0;
        setTimeout(function () {
            overlay.remove();
        }, 900);
    }

    carouselImages.forEach(function (src) {
        var img = new Image();
        img.onload = onImageReady;
        img.onerror = onImageReady;
        img.src = src;
    });

    setTimeout(finishIntro, 8000);
})();
