const body = document.querySelector('body');
const display = body.querySelector('.display-area > p');
const inputs = body.querySelector('.inputs');

inputs.addEventListener('click', inputClicked);

let expression = {
    operand1: '0',
    operand2: '',
    operator: ''
};

const operations = {
    calculate: function (a, o , b) {
        return this[o](a, b);
    },

    "+": function (a, b) {
        return a + b;
    },

    "-": function (a, b) {
        return a - b;
    },

    "*": function (a, b) {
        return a * b;
    },

    "/": function (a, b) {
        return a / b;
    }
};

function inputClicked (event) {
    switch (event.target.className) {
        case 'number':
            buildOperand(event.target.textContent);
            break;
        case 'operator':
            break;
    }
}

function buildOperand (val) {
    let operand = '';

    if (!expression['operator']) {
        operand = 'operand1';
    }

    switch (val) {
        case '.':
            if (!expression[operand].includes('.')) {
                expression[operand] += '.';
            }
            break;
        case '±':
            if (!expression[operand].startsWith('-')) {
                expression[operand] = expression[operand].padStart(expression[operand].length + 1, '-');
            } else {
                expression[operand] = expression[operand].slice(1);
            }
            break;
        default:
            expression[operand] = 
                expression[operand] === '0' ? val : 
                expression[operand] + val;
    }

    display.textContent = expression[operand];
}