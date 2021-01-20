function add() {
    return a + b;
}

function subtract() {
    return a - b;
}

function multiply() {
    return a * b;
}

function divide() {
    if(b === 0) return 'Error';
    return a / b;
}

function mod() {
    return a % b;
}

function operate() {
    if(a === null && b === null) return;

    h1[2].classList.toggle('yellowText');
    h1[3].classList.toggle('yellowText');

    switch (operator) {
        case '+':
            displayValue = add(a, b);
            break;
        case '-':
            displayValue = subtract(a, b);
            break;
        case 'x':
            displayValue = multiply(a, b);
            break;
        case '/':
            displayValue = divide(a, b);
            break;
        case '%':
            displayValue = mod(a, b);
    }

    console.log(displayValue);
    a = Number(displayValue);
    b = null;
    operator = null;
    isDecimal = false;
    currentOperator = null;

    displayValue = String(displayValue);
    if(a >= 100000000) {
        console.log("her");
        let exp = String(Math.log10(a))[0];
        displayValue = displayValue[0] + '.' + displayValue.slice(1,3) + `E${exp}`;
    } else if(displayValue.length > 8) {
        displayValue = displayValue.slice(0,8);
        console.log("here");
    }

    populateDisplay();
}

function populateDisplay() {
    displayText.textContent = displayValue;
}

function updateDisplayValue() {
    if(displayValue.length === 8 && operator === null) return;

    if(displayValue === '0' || enteringSecond) {
        displayValue = '';
        if(enteringSecond) enteringSecond = false;
    } 
    displayValue += this.textContent;

    storeValue();
    populateDisplay();
}

function clear() {
    a = null;
    b = null;
    operator = null;
    isDecimal = false;
    displayValue = '0';
    h1.forEach(text => text.classList.remove('yellowText'));
    populateDisplay();
}

function storeValue() {
    if(operator === null) {
        a = Number(displayValue);
        h1[0].classList.add('yellowText');
    } else {
        b = Number(displayValue);
        h1[1].classList.remove('yellowText');
        h1[2].classList.add('yellowText');
    }
}

function storeOperator(text) {
    h1[0].classList.remove('yellowText');
    h1[1].classList.add('yellowText');
    h1[3].classList.remove('yellowText');

    operator = text;
    enteringSecond = true;
    isDecimal = false;
}

function putDecimal() {
    if(isDecimal) return;

    displayValue += '.';
    populateDisplay();
    isDecimal = true;
}

const numberBtns = document.querySelectorAll('.number');
const operatorBtns = document.querySelectorAll('.operator');
const clearBtn = document.querySelector('#AC');
const posNegBtn = document.querySelector('#pn');
const decimalBtn = document.querySelector('#dot');
const equalBtn = document.querySelector('#equal');
const displayText = document.querySelector('#text');
const h1 = document.querySelectorAll('span');
let displayValue = '0';
let operator = null;
let a = null;
let b = null;
let enteringSecond = false;
let isDecimal = false;

numberBtns.forEach(button => button.addEventListener('click', updateDisplayValue));
operatorBtns.forEach(button => button.addEventListener('click', function(e) {
    if(a !== null && b !== null) {
        operate();
    }
    storeOperator(this.textContent);
}));
clearBtn.addEventListener('click', clear);
posNegBtn.addEventListener('click', function() {
    displayValue = Number(displayValue) * -1;
    storeValue();
    populateDisplay();
});
decimalBtn.addEventListener('click', putDecimal);
equalBtn.addEventListener('click', operate);