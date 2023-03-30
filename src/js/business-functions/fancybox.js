Fancybox.bind('[data-fancybox="image"]', {});

document.addEventListener('click', e => {
    e.target.classList.contains('fancybox-image') && document.querySelector('button[title="Close"]').click();
});