(function () {
    var btn = document.getElementById('loadMoreBtn');
    if (!btn) return;

    function showMore() {
        var firstRevealed = document.querySelector('.gallery-item-hidden');
        var hiddenItems = document.querySelectorAll('.gallery-item-hidden');
        hiddenItems.forEach(function (item) {
            item.classList.remove('gallery-item-hidden');
        });
        btn.style.display = 'none';
        if (firstRevealed) {
            firstRevealed.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        showMore();
    });
})();
