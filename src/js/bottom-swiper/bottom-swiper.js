// нижниий слайдер
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
