const language = document.getElementById("language");

language.onclick = (e) => {
    const langDrop = document.querySelectorAll(".language-dropdown-list");
    const langDropExist = langDrop.length;

    if (langDropExist === 0)
    {
        const dropDownList = `<div class="language-dropdown-list">
            <ul class="languages-list">
                <li class="lang-item test1" id="ru-lang">
                    <a href="https://topfactor.pro/podbor-personala/?lang=ru">Русский</a>
                </li>
                <li class="lang-item test2" id="en-lang">
                    <a href="https://topfactor.pro/podbor-personala/?lang=en">Английский</a>
                </li>
                <li class="lang-item test3" id="de-lang">
                    <a href="https://topfactor.pro/podbor-personala/?lang=de">Немецкий</a>
                </li>
            </ul>
        </div>`;

        e.target.insertAdjacentHTML("beforeend", dropDownList);
        e.target.classList.add("language-area-active");
    }
};

document.onclick = (e) => {
    const langDrop = document.querySelectorAll(".language-dropdown-list");
    const langDropExist = langDrop.length;
    const parent = e.target.closest(".language-area");

    if (langDropExist > 0 && parent === null)
    {
        langDrop[0].remove();
        language.classList.remove("language-area-active");
    }
};

const swiperUnderheader = new Swiper(".swiper", {
    direction: "horizontal",
    loop: true,

    pagination: {
        el: ".swiper-pagination"
    },

    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev"
    }
});

// accordion section

const firstAccordionRowHeight = document.querySelector('.accordion-row:first-child > .accordion-row__content > .hidden-block').getBoundingClientRect().height;
document.querySelector('.accordion-row:first-child > .accordion-row__content').style.height = `${firstAccordionRowHeight}px`;

const accordionRows = Array.from(document.querySelectorAll(".accordion-row__header"));

accordionRows.forEach((item, i, arr) => {
    item.addEventListener("click", (e) => {
        arr.forEach((el) => {
            el.nextElementSibling.style.transition = 'height .6s ease';
            el.nextElementSibling.style.height = '0';
            el.classList.remove("active-accordion-row");
        });

        const selectorHidden = item.nextElementSibling.querySelector(".hidden-block");
        const neededHeight = selectorHidden.getBoundingClientRect().height;

        item.nextElementSibling.style.height = `${neededHeight}px`;
        item.classList.add("active-accordion-row");
    });
});

// phone mask
const phoneField = document.getElementById("phone-field");

Inputmask({
    mask: "+7 (999) 999-9999",
    showMaskOnHover: !1
}).mask(phoneField);

// examples slider
const swiperExamples = new Swiper(".examples-slider-wrapper", {
    direction: "horizontal",
    slidesPerView: '3',
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

// examples-slider-arrows
const arrows = Array.from(document.querySelectorAll('.arrow'));

arrows.forEach(arrowItem => {
    arrowItem.addEventListener('click', el => {
        const currentArrow = el.target.getAttribute('id');

        document.querySelector(`.under-${currentArrow}`).click();
    })
});

// move to anchors

const links = Array.from(document.querySelectorAll('.anchor-link'));

links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        const destination = e.target.getAttribute('href');
        const destinationPosition = document.querySelector(destination).offsetTop;

        document.querySelector('html').scroll({top: +destinationPosition, behavior: "smooth"})
    })
});

// header menu links preventdefault
const headerMenuLinks = Array.from(document.querySelectorAll('.header-menu-link'));

headerMenuLinks.forEach(link => link.addEventListener('click', event => event.preventDefault()));

// AOS

AOS.init();
