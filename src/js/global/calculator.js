// треугольники регулировщики
const triangles = document.querySelectorAll('.triangle-btn');

const leftFieldMax = 3000;
const rightFieldMax = 5000;

triangles.forEach(triangle => {
    triangle.addEventListener('click', e => {
        const currentProperty = e.target.dataset.property;
        const closestInput = e.target.closest('.input-place').querySelector('.form-field');
        const closestInputID = closestInput.getAttribute('id');
        let closestInputValue = +closestInput.value;
        let limit = closestInputID === 'kedo-field' ? leftFieldMax : rightFieldMax;

        currentProperty === 'up' ? closestInputValue++ : closestInputValue--;

        if (closestInputValue > limit)
        {
            closestInputValue = limit;
        }
        else if (closestInputID === 'kedo-field' && closestInputValue <= 0)
        {
            closestInputValue = 1;
        }
        else if (closestInputValue <= 0)
        {
            closestInputValue = 0;
        }

        closestInput.value = closestInputValue;
    });
});

// ограничение числовых полей
const numberFields = document.querySelectorAll('.new-calculator-form input.form-field');
numberFields.forEach(field => field.addEventListener('input', e => {
    const thisField = e.target.getAttribute('id');
    const limit = thisField === 'kedo-field' ? leftFieldMax : rightFieldMax;
    e.target.value = e.target.value <= limit ? +e.target.value : limit;
}));

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
const middle = 1700;

const priceList = {
    5: 131100,
    10: 176316,
    20: 296196,
    50: 568836,
    100: 863460
};

document.getElementById('calculate-btn').addEventListener('click', e => {
    e.preventDefault();
    const calculateForm = document.getElementById('new-calculator-form');
    const calculateData = [...new FormData(calculateForm)]; // аналогично как Array.from(new FormData(calculateForm))

    // calculateData[0][1] - левое поле
    // calculateData[1][1] - правое поле

    const leftYear = calculateData[0][1] * middle;
    const leftMonth = leftYear / 12;

    const rightYear = priceList[calculateData[1][1]];
    const rightMonth = rightYear / 12;

    const fullYearSumm = leftYear + rightYear;
    const fullMonthSumm = leftMonth + rightMonth;

    const fastStartFormatted = Math.round(fullMonthSumm).toLocaleString();

    document.querySelectorAll('.fast-start').forEach(item => item.innerHTML = `${fastStartFormatted} руб`);
    //document.querySelectorAll('.extended').forEach(item => item.innerHTML = `${extendedFormatted} руб`);*/
});
