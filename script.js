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
        const numA = Number(a);
        const numB = Number(b);
        return this[o](numA, numB);
    },

    "+": function (a, b) {
        return a + b;
    },

    "-": function (a, b) {
        return a - b;
    },

    "×": function (a, b) {
        return a * b;
    },

    "÷": function (a, b) {
        return a / b;
    }
};

function inputClicked (event) {
    const obj = event.target;
    const objClass = obj.className;
    const objText = obj.textContent;

    switch (objClass) {
        case 'number':
            buildOperand(objText);
            break;
        case 'operator':
            handleOperator(objText);
            break;
    }
}

function buildOperand (val) {
    let operand = '';

    operand = !expression['operator'] ? 'operand1' : 'operand2';

    switch (val) {
        case '.':
            if (!expression[operand].includes('.')) {
                expression[operand] += '.';
            }
            break;
        case '±':
            if (!expression[operand].startsWith('-') && 
            expression[operand] !== '0') {
                expression[operand] = expression[operand].
                    padStart(expression[operand].length + 1, '-');
            } else if (expression[operand].startsWith('-')) {
                expression[operand] = expression[operand].slice(1);
            }
            break;
        default:
            const digits = expression[operand].
                replace('-', '').replace('.', '');
            if (digits.length <= 11) {
                expression[operand] = 
                expression[operand] === '0' ? val : 
                expression[operand] + val;
            }
            
    }

    display.textContent = expression[operand];
}

function handleOperator (op) {
    switch (op) {
        case '=':
            if (!expression['operator'] || !expression['operand2']) {
                return;
            }
        default:
            if (!expression['operand2']) {
                expression['operator'] = op;
                return;
            }
    }

    display.textContent = 
    operations.calculate(expression['operand1'], 
    expression['operator'], expression['operand2']);

    const newOp = op === '=' ? '' : op;
    resetExpression(display.textContent, newOp);
}

function resetExpression (a = '0', o = '', b = '') {
    expression['operand1'] = a;
    expression['operator'] = o;
    expression['operand2'] = b;
}