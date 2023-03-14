const language = document.getElementById('language');

language.onclick = e => {
    const langDrop = document.querySelectorAll('.language-dropdown-list');
    const langDropExist = document.querySelectorAll('.language-dropdown-list').length;

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

        e.target.insertAdjacentHTML('beforeend', dropDownList);
        e.target.classList.add('language-area-active');
    }
    else
    {
        return false;
    }
}

document.onclick = e => {
    const langDrop = document.querySelectorAll('.language-dropdown-list');
    const langDropExist = document.querySelectorAll('.language-dropdown-list').length;
    const parent = e.target.closest('.language-area');

    if (langDropExist > 0 && parent === null)
    {
        langDrop[0].remove();
        language.classList.remove('language-area-active');
    }
    else
    {
        return false;
    }
}

const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: true,

    pagination: {
        el: '.swiper-pagination',
    },

    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});