// треугольники регулировщики
const triangles = Array.from(document.querySelectorAll('.triangle-btn'));

triangles.forEach(triangle => {
    triangle.addEventListener('click', e => {
        const currentProperty = e.target.getAttribute('data-property');
        const closestInput = e.target.closest('.input-place').querySelector('.form-field');
        const closestInputID = closestInput.getAttribute('id');
        let closestInputValue = +closestInput.value;
        let limit = closestInputID === 'kedo-field' ? 30000 : 100;

        currentProperty === 'up' ? closestInputValue++ : closestInputValue--;

        if (closestInputValue > limit)
        {
            closestInputValue = limit;
        }
        else if (closestInputValue < 0)
        {
            closestInputValue = 0;
        }

        closestInput.value = closestInputValue;
    });
});

// ограничение числовых полей
const numberFields = Array.from(document.querySelectorAll('.new-calculator-form input.form-field'));
numberFields.forEach(field => field.addEventListener('input', e => {
    const thisField = e.target.getAttribute('id');
    const limit = thisField === 'kedo-field' ? 30000 : 100;
    e.target.value = e.target.value <= limit ? +e.target.value : limit;
}));
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
        functionsWindowStyle.height = '370px';
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
    100: 863460,
    200: 1726920,
    300: 2590380
};
document.getElementById('calculate-btn').addEventListener('click', e => {
    e.preventDefault();
    const calculateForm = document.getElementById('new-calculator-form');
    const calculateData = [...new FormData(calculateForm)]; // аналогично как Array.from(new FormData(calculateForm))
    const retailYearD3 = (calculateData[0][1] * unepRetail) + (calculateData[1][1] * ukepRetail);
    const retailYearD4 = parametrs[calculateData[2][1]];
    const summaFastStart = Math.round((retailYearD3 + retailYearD4) / 12);
    const summaFastStartFormatted = summaFastStart.toLocaleString();
    const summaExtendedFormatted = (summaFastStart + 13708).toLocaleString(); // 164500 / 12 = 13 708.33333333

    Array.from(document.querySelectorAll('.fast-start')).forEach(item => item.innerHTML = `${summaFastStartFormatted} руб`);
    Array.from(document.querySelectorAll('.extended')).forEach(item => item.innerHTML = `${summaExtendedFormatted} руб`);
});
