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

    // Legacy carousel support (.carousel-slide)
    var legacySlides = document.querySelectorAll('.carousel-slide');
    if (legacySlides.length > 1) {
        var currentIdx = 0;

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

        function nextLegacySlide() {
            currentIdx = (currentIdx + 1) % legacySlides.length;
            updateLegacyCarousel();
        }

        updateLegacyCarousel();
        setInterval(nextLegacySlide, 4000);
    }
});
