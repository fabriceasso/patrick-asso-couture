// Hero Carousel - Patrick ASSO Couture
document.addEventListener('DOMContentLoaded', function () {
    // Support both class naming conventions
    var containers = document.querySelectorAll('.hero-carousel-container');

    containers.forEach(function (container) {
        var slides = container.querySelectorAll('.hero-carousel-slide');
        var currentIndex = 0;

        if (slides.length > 1) {
            function nextSlide() {
                slides[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % slides.length;
                slides[currentIndex].classList.add('active');
            }

            setInterval(nextSlide, 5000);
        }
    });

    // Legacy carousel support (.carousel-slide) + clickable lightbox
    var legacySlides = document.querySelectorAll('.carousel-slide');
    if (legacySlides.length > 1) {
        var currentIdx = 0;
        var autoPlayTimer = null;
        var AUTOPLAY_DELAY = 4000;

        function updateLegacyCarousel() {
            legacySlides.forEach(function (slide, index) {
                slide.classList.remove('active', 'prev', 'next', 'hidden-left', 'hidden-right');

                if (index === currentIdx) {
                    slide.classList.add('active');
                } else if (index === (currentIdx - 1 + legacySlides.length) % legacySlides.length) {
                    slide.classList.add('prev');
                } else if (index === (currentIdx + 1) % legacySlides.length) {
                    slide.classList.add('next');
                } else if (index < (currentIdx - 1 + legacySlides.length) % legacySlides.length) {
                    slide.classList.add('hidden-left');
                } else {
                    slide.classList.add('hidden-right');
                }
            });
        }

        function goToLegacySlide(index) {
            currentIdx = (index + legacySlides.length) % legacySlides.length;
            updateLegacyCarousel();
        }

        function nextLegacySlide() {
            goToLegacySlide(currentIdx + 1);
        }

        function startAutoPlay() {
            if (autoPlayTimer === null) {
                autoPlayTimer = setInterval(nextLegacySlide, AUTOPLAY_DELAY);
            }
        }

        function stopAutoPlay() {
            if (autoPlayTimer !== null) {
                clearInterval(autoPlayTimer);
                autoPlayTimer = null;
            }
        }

        // --- Lightbox : agrandissement + navigation manuelle ---
        function getSlideImageUrl(slide) {
            var bg = window.getComputedStyle(slide).backgroundImage;
            if (!bg || bg === 'none') { return ''; }
            var match = bg.match(/url\((['"]?)(.*?)\1\)/);
            return match ? match[2] : '';
        }

        var slideImageUrls = [];
        legacySlides.forEach(function (slide) {
            slideImageUrls.push(getSlideImageUrl(slide));
        });

        var lightbox = document.createElement('div');
        lightbox.id = 'hero-lightbox';
        lightbox.className = 'lightbox';
        lightbox.setAttribute('role', 'dialog');
        lightbox.setAttribute('aria-modal', 'true');
        lightbox.setAttribute('aria-label', 'Image agrandie du carrousel');

        var lbClose = document.createElement('button');
        lbClose.type = 'button';
        lbClose.className = 'lightbox-close';
        lbClose.textContent = 'Fermer [X]';

        var lbPrev = document.createElement('button');
        lbPrev.type = 'button';
        lbPrev.className = 'lightbox-btn lightbox-prev';
        lbPrev.setAttribute('aria-label', 'Image pr\u00e9c\u00e9dente');
        lbPrev.textContent = '\u2039';

        var lbContent = document.createElement('div');
        lbContent.className = 'lightbox-content';
        var lbImg = document.createElement('img');
        lbImg.alt = 'Vue agrandie';
        lbContent.appendChild(lbImg);

        var lbNext = document.createElement('button');
        lbNext.type = 'button';
        lbNext.className = 'lightbox-btn lightbox-next';
        lbNext.setAttribute('aria-label', 'Image suivante');
        lbNext.textContent = '\u203A';

        var lbCounter = document.createElement('div');
        lbCounter.className = 'lightbox-counter';

        lightbox.appendChild(lbClose);
        lightbox.appendChild(lbPrev);
        lightbox.appendChild(lbContent);
        lightbox.appendChild(lbNext);
        lightbox.appendChild(lbCounter);
        document.body.appendChild(lightbox);

        var lbIndex = 0;
        var lbIsOpen = false;

        function renderLightboxImage() {
            lbImg.src = slideImageUrls[lbIndex];
            lbCounter.textContent = (lbIndex + 1) + ' / ' + slideImageUrls.length;
        }

        function openLightbox(index) {
            lbIndex = (index + slideImageUrls.length) % slideImageUrls.length;
            renderLightboxImage();
            lightbox.classList.add('active');
            document.body.classList.add('lightbox-open');
            lbIsOpen = true;
            stopAutoPlay();
            lbClose.focus();
        }

        function closeLightbox() {
            if (!lbIsOpen) { return; }
            lightbox.classList.remove('active');
            document.body.classList.remove('lightbox-open');
            lbIsOpen = false;
            // Retour au carrousel, cale sur la derniere image consultee
            goToLegacySlide(lbIndex);
            startAutoPlay();
        }

        function lightboxPrev() {
            lbIndex = (lbIndex - 1 + slideImageUrls.length) % slideImageUrls.length;
            renderLightboxImage();
        }

        function lightboxNext() {
            lbIndex = (lbIndex + 1) % slideImageUrls.length;
            renderLightboxImage();
        }

        // Chaque image du carrousel devient cliquable
        legacySlides.forEach(function (slide, index) {
            slide.addEventListener('click', function () {
                openLightbox(index);
            });
        });

        lbClose.addEventListener('click', closeLightbox);
        lbPrev.addEventListener('click', function (e) { e.stopPropagation(); lightboxPrev(); });
        lbNext.addEventListener('click', function (e) { e.stopPropagation(); lightboxNext(); });
        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox) { closeLightbox(); }
        });

        document.addEventListener('keydown', function (e) {
            if (!lbIsOpen) { return; }
            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                lightboxPrev();
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                lightboxNext();
            }
        });

        updateLegacyCarousel();
        startAutoPlay();
    }
});
