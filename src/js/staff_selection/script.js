// обработка нажатия в рамках всего документа (делегирование события)
document.onclick = (e) => {
    // скрытие элемента со списком языков
    const langDrop = document.querySelectorAll(".language-dropdown-list"); // получение элемента со списком языков
    const langDropExist = langDrop.length; // получение факта существования списка
    const parent = e.target.closest(".language-area"); // получения родительского элемента списка

    if (langDropExist > 0 && parent === null) // если список в текущий момент отрисован на экране, но нажатие произошло не по нему, то удалить список
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
            el.nextElementSibling.style.transition = 'height .6s ease'; // присвоение параметров плавности
            el.nextElementSibling.style.height = '0'; // обнуление высоты
            el.classList.remove("active-accordion-row"); // снятие класса активности
        });

        const selectorHidden = item.nextElementSibling.querySelector(".hidden-block"); // получение текущего элемента аккордеона
        const neededHeight = selectorHidden.getBoundingClientRect().height; // получение высоты текущего элемента аккордеона

        item.nextElementSibling.style.height = `${neededHeight}px`; // присвоение высоты к текущему элементу аккордеона
        item.classList.add("active-accordion-row"); // присвоение класса активности
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

// AOS
AOS.init();
