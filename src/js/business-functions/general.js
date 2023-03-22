const language = document.getElementById("language"); // получение панели смены языков
const burgerPanel = document.getElementById('hide-burger-menu'); // получение элемента скрытой панели
const searchFieldPlatform = document.getElementById('hidden-field-keeper'); // получение платформы-держателя поля

language.onclick = (e) => {
    const langDrop = document.querySelectorAll(".language-dropdown-list");
    const langDropExist = langDrop.length;

    if (!langDropExist)
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

document.onclick = e => {
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

// phone mask
const phoneField = document.getElementById("phone-field");

Inputmask({
    mask: "+7 (999) 999-9999",
    showMaskOnHover: !1
}).mask(phoneField);

const headerMenuLinks = Array.from(document.querySelectorAll('.header-menu-link'));

headerMenuLinks.forEach(link => link.addEventListener('click', event => event.preventDefault()));
document.getElementById('recruiter-amount-field').addEventListener('input', e => {if (e.target.value < 0) e.target.value = 0});

// показ бургер панели
document.getElementById('burger_btn').onclick = () => burgerPanel.classList.toggle('show');

// показ скрытого поля поиска (для мобильных устройств)
document.getElementById('hidden-header-search-btn').onclick = () => searchFieldPlatform.classList.toggle('hidden-field-showed');
