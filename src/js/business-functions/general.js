document.onclick = e => {
    // скрытие элемента со списком языков
    const langDrop = document.querySelectorAll(".language-dropdown-list"); // получение элемента со списком языков
    const langDropExist = langDrop.length; // получение факта существования списка
    const parent = e.target.closest(".language-area"); // получения родительского элемента списка

    if (langDropExist > 0 && parent === null) // если список в текущий момент отрисован на экране, но нажатие произошло по нему, то удалить список
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

AOS.init();
