let operand1;
let operand2;
let operator;

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