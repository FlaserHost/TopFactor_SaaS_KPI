// отключение головных меню-ссылок
const headerMenuLinks = Array.from(document.querySelectorAll('.header-menu-link'));

headerMenuLinks.forEach(link => link.addEventListener('click', event => event.preventDefault()));

// показ бургер панели
document.getElementById('burger_btn').onclick = () => burgerPanel.classList.toggle('show');

// показ скрытого поля поиска (для мобильных устройств)
document.getElementById('hidden-header-search-btn').onclick = () => searchFieldPlatform.classList.toggle('hidden-field-showed');