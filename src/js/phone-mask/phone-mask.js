const inputTel = document.querySelector('input[type="tel"]');

Inputmask({
    "mask": "+7 (999) 999-9999",
    showMaskOnHover: false
}).mask(inputTel);
