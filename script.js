const body = document.querySelector('body');
const display = body.querySelector('.display-area > p');
const interface = body.querySelector('.interface');

interface.addEventListener('click', interfaceClicked);

let expression = {
    operand1: '0',
    operand2: '',
    operator: '',
    prevResult: false
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
        if (b === 0) {
            return "Undefined"
        }
        return a / b;
    }
};

function interfaceClicked (event) {
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
        case 'function':
            handleFunction(obj.id);
            break;
    }
}

function handleFunction (val) {
    switch (val) {
        case 'clear':
            resetExpression();
            display.textContent = expression['operand1'];
            break;
        case 'backspace':
            let op;
            switch (display.textContent) {
                case expression['operand2']:
                    op = 'operand2';
                    break;
                case expression['operand1']:
                    if (!expression['operator']) {
                        op = 'operand1';
                    }
                    break;
            }
            if (op) {
                expression[op] = expression[op].slice(0, -1);
                display.textContent = expression[op];
            }
            break;
    }
}

function buildOperand (val) {
    if (expression['prevResult']) {resetExpression()}

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
    resetExpression(display.textContent, newOp, '', true);
}

function resetExpression (a = '0', o = '', b = '', r = false) {
    expression['operand1'] = a;
    expression['operator'] = o;
    expression['operand2'] = b;
    expression['prevResult'] = r;
}