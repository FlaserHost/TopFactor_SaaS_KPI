const language = document.getElementById("language"); // получение панели смены языков
const burgerPanel = document.getElementById('hide-burger-menu'); // получение элемента скрытой панели
const searchFieldPlatform = document.getElementById('hidden-field-keeper');

// обработка нажатия на панель смены языков
language.onclick = (e) => {
    const langDrop = document.querySelectorAll(".language-dropdown-list"); // получения элемента со списком языков
    const langDropExist = langDrop.length; // получение факта о существовании списка языков

    if (langDropExist === 0) // если списка не существует, то создать
    {
        // запись конструкции списка в переменную
        const dropDownList = `<div class="language-dropdown-list">
            <ul class="languages-list">
                <li class="lang-item" id="ru-lang">
                    <a href="https://topfactor.pro/podbor-personala/?lang=ru">Русский</a>
                </li>
                <li class="lang-item" id="en-lang">
                    <a href="https://topfactor.pro/podbor-personala/?lang=en">Английский</a>
                </li>
                <li class="lang-item" id="de-lang">
                    <a href="https://topfactor.pro/podbor-personala/?lang=de">Немецкий</a>
                </li>
            </ul>
        </div>`;

        e.target.insertAdjacentHTML("beforeend", dropDownList); // вставка списка с языками в DOM
        e.target.classList.add("language-area-active"); // наложение класса активности нажатия
    }
};

// обработка нажатия в рамках всего документа (делегирование события)
document.onclick = (e) => {
    // скрытие элемента со списком языков
    const langDrop = document.querySelectorAll(".language-dropdown-list"); // получение элемента со списком языков
    const langDropExist = langDrop.length; // получение факта существования списка
    const parent = e.target.closest(".language-area"); // получения родительского элемента списка

    if (langDropExist > 0 && parent === null) // если список в текущий момент отрисован на экране, но нажатие произошло на по нему, то удалить список
    {
        langDrop[0].remove(); // удаление списка из DOM
        language.classList.remove("language-area-active"); // снятие класса активности
    }

    // скрытие бургер панели
    const header = e.target.closest('header'); // получение элемента header как родителя
    header === null && burgerPanel.classList.remove('show'); // скрытие панель посредством удаления класса

    // скрытие поля поиска (для мобильных устройств)
    const searchFieldPlatformParent = e.target.closest('.hidden-search-area');
    searchFieldPlatformParent === null && searchFieldPlatform.classList.remove('hidden-field-showed');
};

// головной слайдер
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

// аккордеон

// получение высоты первого элемента аккордеона
const selectorsOne = '.accordion-row:first-child > .accordion-row__content > .hidden-block';
const firstAccordionRowHeight = document.querySelector(selectorsOne).getBoundingClientRect().height;
// присвоение высоты первому элементу аккордеона (для плавности скрытия)
const selectorsTwo = '.accordion-row:first-child > .accordion-row__content';
document.querySelector(selectorsTwo).style.height = `${firstAccordionRowHeight}px`;

const accordionRows = Array.from(document.querySelectorAll(".accordion-row__header")); // получение всех элементов аккордеона

// перебор всех элементов аккордеона и обработка нажатия
accordionRows.forEach((item, i, arr) => {
    item.addEventListener("click", e => {
        arr.forEach(el => {
            el.nextElementSibling.style.transition = 'height .6s ease'; // присвоение паратров плавности
            el.nextElementSibling.style.height = '0'; // обнуление высоты
            el.classList.remove("active-accordion-row"); // снятие класса активности
        });

        const selectorHidden = item.nextElementSibling.querySelector(".hidden-block"); // получение текущего элемента аккордеона
        const neededHeight = selectorHidden.getBoundingClientRect().height; // получение высоты текущего элемента аккордеона

        item.nextElementSibling.style.height = `${neededHeight}px`; // присвоение высоты к текущему элементу аккордеона
        item.classList.add("active-accordion-row"); // присвоение класса активности
    });
});

// маска телефона
const phoneField = document.getElementById("phone-field");

Inputmask({
    mask: "+7 (999) 999-9999",
    showMaskOnHover: !1
}).mask(phoneField);

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

// стрелки нижнего слайдера
const arrows = Array.from(document.querySelectorAll('.arrow'));

arrows.forEach(arrowItem => {
    arrowItem.addEventListener('click', el => {
        const currentArrow = el.target.getAttribute('id');
        document.querySelector(`.under-${currentArrow}`).click();
    })
});

// прокрутка до якорей

const links = Array.from(document.querySelectorAll('.anchor-link'));

links.forEach(link => {
    link.addEventListener('click', e => {
        e.preventDefault();

        const destination = e.target.getAttribute('href');
        const destinationPosition = document.querySelector(destination).offsetTop;

        document.querySelector('html').scroll({top: +destinationPosition, behavior: "smooth"})
    })
});

// отключение головных меню-ссылок
const headerMenuLinks = Array.from(document.querySelectorAll('.header-menu-link'));

headerMenuLinks.forEach(link => link.addEventListener('click', event => event.preventDefault()));


// запрет отрицательного значения
document.getElementById('recruiter-amount-field').addEventListener('input', e => {if (e.target.value < 0) e.target.value = 0});

// показ бургер панели
document.getElementById('burger_btn').onclick = () => burgerPanel.classList.toggle('show');

// показ скрытого поля поиска (для мобильных устройств)
document.getElementById('hidden-header-search-btn').onclick = () => searchFieldPlatform.classList.toggle('hidden-field-showed');

// AOS

AOS.init();
