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

// AOS
AOS.init();
