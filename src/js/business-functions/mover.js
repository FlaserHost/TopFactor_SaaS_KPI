// перемещение к секции при входе на страницу

const sectionPosition = document.querySelector('.main-content__page-destination').getBoundingClientRect().top;
document.querySelector('html').scroll({top: sectionPosition, behavior: 'smooth'});