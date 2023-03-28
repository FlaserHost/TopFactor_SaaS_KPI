// треугольники регулировщики
const triangles = Array.from(document.querySelectorAll('.triangle-btn'));

triangles.forEach(triangle => {
    triangle.addEventListener('click', e => {
        const currentProperty = e.target.getAttribute('data-property');
        const closestInput = e.target.closest('.input-place').querySelector('.form-field');
        let closestInputValue = +closestInput.value;

        currentProperty === 'up' ? closestInputValue++ : closestInputValue--;
        closestInput.value = closestInputValue >= 0 ? closestInputValue : 0;
    });
});

// ограничение числовых полей
const numberFields = Array.from(document.querySelectorAll('.new-calculator-form .form-field'));
numberFields.forEach(field => field.addEventListener('input', e => e.target.value = +e.target.value));
numberFields.forEach(field => {
    field.addEventListener('blur', e => {
        if (e.target.value === '0')
        {
            e.target.value = '';
            e.target.focus();
            e.target.blur();
        }
    })
});

// события прокрутки
const rates = document.querySelector('.rates-outer-block').offsetTop * -1;
document.addEventListener('scroll', e => {
    const scrollWindow = e.target.body.getBoundingClientRect().top;
    const tableHeader = document.querySelector('.rates-wrapper');

    scrollWindow <= rates
        ? tableHeader.classList.add('fixed-header-bg-color')
        : tableHeader.classList.remove('fixed-header-bg-color');
});

// показать все функции
document.getElementById('show-functionality-btn').addEventListener('click', btn => {
    let currentBtnText = btn.target.innerText.toLowerCase();
    const functionsWindow = document.querySelector('.functions-window');
    const mistBlock = document.querySelector('.actions-place')
    const functionsWindowStyle = functionsWindow.style;
    const fullTableHeight = document.querySelector('.functions-window__table-place').getBoundingClientRect().height + 40;
    functionsWindowStyle.height = `${fullTableHeight}px`;

    if (currentBtnText === 'показать функционал')
    {
        mistBlock.classList.remove('mist');
        currentBtnText = 'скрыть функционал';
    }
    else
    {
        document.querySelector('html').scroll({top: (rates * -1) - 200, behavior: 'smooth'});
        functionsWindowStyle.height = '280px';
        mistBlock.classList.add('mist');
        currentBtnText = 'показать функционал';
    }

    btn.target.innerText = currentBtnText;
});
