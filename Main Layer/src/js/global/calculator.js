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
const priceList = {
    one_recruiter: 4000,
    additional_recruiter: 1900,
    additional_connection: 950,
    allowance: 2000
};

document.getElementById('calculate-btn').addEventListener('click', e => {
    e.preventDefault();
    const calculateForm = document.getElementById('new-calculator-form');
    const calculateData = [...new FormData(calculateForm)]; // аналогично как Array.from(new FormData(calculateForm))

    const tmpSumm = calculateData[0][1] > 1
        ? (--calculateData[0][1]) * priceList.additional_recruiter + priceList.one_recruiter
        : calculateData[0][1] * priceList.one_recruiter;

    const fastStart = tmpSumm + calculateData[1][1] * priceList.additional_connection;

    const fastStartFormatted = fastStart.toLocaleString();
    const extendedFormatted = (fastStart + priceList.allowance).toLocaleString();

    Array.from(document.querySelectorAll('.fast-start')).forEach(item => item.innerHTML = `${fastStartFormatted} руб`);
    Array.from(document.querySelectorAll('.extended')).forEach(item => item.innerHTML = `${extendedFormatted} руб`);
});
