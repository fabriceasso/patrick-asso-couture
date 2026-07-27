// Lightbox Logic for Patrick ASSO galleries
(function () {
    var lightbox = document.createElement('div');
    lightbox.id = 'lightbox';
    lightbox.className = 'lightbox';
    lightbox.setAttribute('role', 'dialog');
    lightbox.setAttribute('aria-label', 'Visionneuse d\'images');

    var closeBtn = document.createElement('div');
    closeBtn.className = 'lightbox-close';
    closeBtn.textContent = 'Fermer [X]';
    closeBtn.setAttribute('tabindex', '0');

    var prevBtn = document.createElement('button');
    prevBtn.className = 'lightbox-btn lightbox-prev';
    prevBtn.textContent = '\u003C';
    prevBtn.setAttribute('aria-label', 'Image précédente');

    var contentDiv = document.createElement('div');
    contentDiv.className = 'lightbox-content';

    var img = document.createElement('img');
    img.src = '';
    img.alt = 'Vue agrandie';
    contentDiv.appendChild(img);

    var nextBtn = document.createElement('button');
    nextBtn.className = 'lightbox-btn lightbox-next';
    nextBtn.textContent = '\u003E';
    nextBtn.setAttribute('aria-label', 'Image suivante');

    lightbox.appendChild(closeBtn);
    lightbox.appendChild(prevBtn);
    lightbox.appendChild(contentDiv);
    lightbox.appendChild(nextBtn);
    document.body.appendChild(lightbox);

    var galleryItems = document.querySelectorAll('.gallery-item img');
    var currentIndex = 0;

    galleryItems.forEach(function (galleryImg, index) {
        galleryImg.parentElement.addEventListener('click', function () {
            currentIndex = index;
            updateLightboxSource();
            lightbox.classList.add('active');
        });
    });

    function updateLightboxSource() {
        img.src = galleryItems[currentIndex].src;
        img.alt = galleryItems[currentIndex].alt || 'Vue agrandie';
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
    }

    closeBtn.addEventListener('click', closeLightbox);

    closeBtn.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            closeLightbox();
        }
    });

    prevBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightboxSource();
    });

    nextBtn.addEventListener('click', function (e) {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % galleryItems.length;
        updateLightboxSource();
    });

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') {
            currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
            updateLightboxSource();
        }
        if (e.key === 'ArrowRight') {
            currentIndex = (currentIndex + 1) % galleryItems.length;
            updateLightboxSource();
        }
    });
})();
