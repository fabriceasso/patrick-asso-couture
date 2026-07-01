// Lightbox Logic for Patrick ASSO galleries
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.className = 'lightbox';
lightbox.innerHTML = `
    <div class="lightbox-close">Fermer [X]</div>
    <button class="lightbox-btn lightbox-prev">&lt;</button>
    <div class="lightbox-content">
        <img src="" alt="Full view">
    </div>
    <button class="lightbox-btn lightbox-next">&gt;</button>
`;
document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector('img');
const closeBtn = lightbox.querySelector('.lightbox-close');
const prevBtn = lightbox.querySelector('.lightbox-prev');
const nextBtn = lightbox.querySelector('.lightbox-next');
const galleryItems = document.querySelectorAll('.gallery-item img');

let currentIndex = 0;

galleryItems.forEach((img, index) => {
    img.parentElement.addEventListener('click', () => {
        currentIndex = index;
        updateLightboxSource();
        lightbox.classList.add('active');
    });
});

function updateLightboxSource() {
    lightboxImg.src = galleryItems[currentIndex].src;
}

closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

prevBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
    updateLightboxSource();
});

nextBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    currentIndex = (currentIndex + 1) % galleryItems.length;
    updateLightboxSource();
});

// Close on background click
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) lightbox.classList.remove('active');
});
