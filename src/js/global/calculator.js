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

// логика рассчета
const unepRetail = 560; // B20
const ukepRetail = 1800; // B21
const parametrs = { // A23 и ниже
    5: 131100,
    10: 176316,
    20: 296196,
    50: 568836,
    100: 863460
};
document.getElementById('calculate-btn').addEventListener('click', e => {
    e.preventDefault();
    const calculateForm = document.getElementById('new-calculator-form');
    const calculateData = [...new FormData(calculateForm)]; // like Array.from(new FormData(calculateForm))
    const retailYearD3 = (calculateData[0][1] * unepRetail) + (calculateData[1][1] * ukepRetail);
    const retailYearD4 = parametrs[calculateData[2][1]];
    const summa = Math.round(retailYearD3 + retailYearD4);
    const summaFormattedOutput = summa.toLocaleString();

    Array.from(document.querySelectorAll('.fast-start')).forEach(item => item.innerHTML = `${summaFormattedOutput} руб`);
});
