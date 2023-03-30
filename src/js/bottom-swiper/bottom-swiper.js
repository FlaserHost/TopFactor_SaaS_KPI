// нижниий слайдер
document.addEventListener("DOMContentLoaded", () => {
    let slidesOnView = '3';
    if (window.outerWidth < 800) slidesOnView = '2';
    if (window.outerWidth < 426) slidesOnView = '1';

    const swiperExamples = new Swiper(".examples-slider-wrapper", {
        direction: "horizontal",
        slidesPerView: slidesOnView,
        spaceBetween: 30,
        loop: true,

        pagination: {
            el: ".swiper-pagination"
        },

        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev"
        }
    });
});

// стрелки нижнего слайдера
const arrows = Array.from(document.querySelectorAll('.arrow'));

arrows.forEach(arrowItem => {
    arrowItem.addEventListener('click', el => {
        const currentArrow = el.target.getAttribute('id');
        document.querySelector(`.under-${currentArrow}`).click();
    })
});

// перехват нажатия
const slides = Array.from(document.querySelectorAll('.example-slide'));

slides.forEach(slide => slide.addEventListener('click', e => e.target.closest('.example-slide').querySelector('a').click()));