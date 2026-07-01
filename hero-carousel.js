document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.hero-carousel-container');
    
    containers.forEach(container => {
        const slides = container.querySelectorAll('.hero-carousel-slide');
        let currentIndex = 0;
        
        if (slides.length > 1) {
            function nextSlide() {
                slides[currentIndex].classList.remove('active');
                currentIndex = (currentIndex + 1) % slides.length;
                slides[currentIndex].classList.add('active');
            }
            
            // Start rotation every 5 seconds
            setInterval(nextSlide, 5000);
        }
    });
});
