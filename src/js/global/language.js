const language = document.getElementById("language"); // получение панели смены языков
const burgerPanel = document.getElementById('hide-burger-menu'); // получение элемента скрытой панели
const searchFieldPlatform = document.getElementById('hidden-field-keeper');

// обработка нажатия на панель смены языков
language.onclick = (e) => {
    const langDrop = document.querySelectorAll(".language-dropdown-list"); // получения элемента со списком языков
    const langDropExist = langDrop.length; // получение факта о существовании списка языков

    if (!langDropExist) // если списка не существует, то создать
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
