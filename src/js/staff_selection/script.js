const language = document.getElementById("language"); // получение панели смены языков

// обработка нажатия
language.onclick = (e) => {
    const langDrop = document.querySelectorAll(".language-dropdown-list"); // получения элемента со списком языков
    const langDropExist = langDrop.length; // получение факта о существовании списка языков

    if (langDropExist === 0) // если списка не существует, то создать
    {
        // запись конструкции списка в переменную
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

        e.target.insertAdjacentHTML("beforeend", dropDownList); // вставка списка с языками в DOM
        e.target.classList.add("language-area-active"); // наложение класса активности нажатия
    }
};

// обработка нажатия в рамках всего документа (делегирование события)
document.onclick = (e) => {
    const langDrop = document.querySelectorAll(".language-dropdown-list"); // получение элемента со списком языков
    const langDropExist = langDrop.length; // получение факта существования списка
    const parent = e.target.closest(".language-area"); // получения родительского элемента списка

    if (langDropExist > 0 && parent === null) // если список в текущий момент отрисован на экране, но нажатие произошло на по нему, то удалить список
    {
        langDrop[0].remove(); // удаление списка из DOM
        language.classList.remove("language-area-active"); // снятие класса активности
    }

    const burgerPanel = document.querySelector('.hide-burger-menu'); // получение элемента скрытой панели
    const burgerPanelParent = e.target.closest('.hide-burger-menu'); // получение элемента скрытой панели как родителя
    const header = e.target.closest('header'); // получение элемента header как родителя

    // если панель на текущий момент выдвинута, и нажатие произошло не по одному из ее дочерних элементов или не по элементу header, то скрыть панель
    if (
        !e.target.classList.contains('hide-burger-menu') &&
        burgerPanelParent === null &&
        header === null
    ) {
        burgerPanel.classList.remove('show'); // скрытие панель посредством удаления класса
    }
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
const firstAccordionRowHeight = document.querySelector('.accordion-row:first-child > .accordion-row__content > .hidden-block').getBoundingClientRect().height;
// присвоение высоты первому элементу аккордеона (для плавности скрытия)
document.querySelector('.accordion-row:first-child > .accordion-row__content').style.height = `${firstAccordionRowHeight}px`;

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

const hideBurgerMenu = document.querySelector('.hide-burger-menu');
document.getElementById('burger_btn').addEventListener('click', () => hideBurgerMenu.classList.toggle('show'));

// AOS

AOS.init();
