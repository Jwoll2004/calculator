function add(a, b) {
    return a + b;
}

function sub(a, b) {
    console.log("Subtracting ", a, " and ", b, a-b);
    return a - b;
}

function mult(a, b) {
    return a * b;
}

function div(a, b) {
    return (a / b);
}

function operate(a, op, b) {
    let ans = 0;
    switch (op) {
        case '+':
            ans = add(a, b);
            break;
        case '-':
            ans = sub(a, b);
            break;
        case '*':
            ans = mult(a, b);
            break;
        case '/':
            if (b === 0) {
                return 'ERROR';
            }
            ans = div(a, b);
            ans = ans.toFixed(2);
            break;
        default:
            break;
    }
    return `${ans}`;
}

function roundResult(number) {
    return Math.round(number * 1000) / 1000
}

function isOprtr(op) {
    return op === '+' || op === '-' || op === '*' || op === '/';
}
function isNum(num) {
    return num >= 0 && num < 10;
}

function gentop(){
    const top = document.querySelector('.top');
    const toprow = document.createElement('div');
    const clr = document.createElement('button');
    const del = document.createElement('button');
    clr.textContent = 'Clear';
    clr.style = 'padding: 30px 48px; margin: 5px; font-size: 25px; ';
    del.textContent = 'Delete';
    del.style = 'padding: 30px 48px; margin: 5px; font-size: 25px; ';
    toprow.appendChild(clr);
    toprow.appendChild(del);
    top.appendChild(toprow);
}
function genleft() {
    const left = document.querySelector('.left');

    for (let i = 2; i >= 0; --i) {
        const row = document.createElement('div');
        for (let j = 3*i + 1; j <= 3*(i+1); ++j) {
            const btn = document.createElement('button');
            btn.textContent = `${j}`;

            btn.style = 'padding: 30px; margin: 5px; font-size: 25px;'
            row.appendChild(btn);
        }
        left.appendChild(row);
    }

    const row = document.createElement('div');
    const zero = document.createElement('button');
    const point = document.createElement('button');
    const equal = document.createElement('button');
    zero.textContent = '0';
    zero.style = 'padding: 30px; margin: 5px; font-size: 25px;';
    point.textContent = '.';
    point.style = 'padding: 30px 33.6px; margin: 5px; font-size: 25px;';
    equal.textContent = '=';
    equal.style = 'padding: 30px; margin: 5px; font-size: 25px; ';
    row.appendChild(zero);
    row.appendChild(point);
    row.appendChild(equal);
    left.appendChild(row);
}

function genright() {
    const right = document.querySelector('.right');
    const optr = ['+', '-', '*', '/'];
    for (let i = 0; i < 4; ++i) {
        const btn = document.createElement('button');
        btn.textContent = `${optr[i]}`;
        btn.style = 'padding: 30px; margin: 5px; font-size: 25px;';
        right.appendChild(btn);
    }

}

gentop();
genleft();
genright();

let num1;
let num2;
let optr;
let evaluation = '';
let input = '0'; document.querySelector('.display').textContent = input;
let numberOfOperators = 0;

const btn = document.querySelectorAll('button');

btn.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.textContent === 'Clear') {
            input = '0';
            evaluation = '';
            num1 = 0;
            num2 = 0;
            optr = '';
            numberOfOperators = 0;
            document.querySelector('.display').textContent = input;
        }
        if (button.textContent === '=') {
            num2 = parseFloat(evaluation);
            console.log("Equal pressed", "input = ", input, "eval = ", evaluation, "num1 = ", num1, "num2 = ", num2, "optr = ", optr, "numOptr = ", numberOfOperators);

            // check for errors
            if(num1 === NaN || num1 === undefined || num2 === NaN || num2 === undefined || optr === undefined || optr === '') {
                
            }
            else{
                input = roundResult(operate(num1, optr, num2));
                evaluation = input;
                num1 = 0;
                num2 = 0;
                optr = '';
                numberOfOperators = 0;
            }
            document.querySelector('.display').textContent = input;
        }
        if(button.textContent === 'Delete') {
            if(input.length === 1) {
                input = '0';
            }
            else {
                input = input.slice(0, -1);
            }
            if(evaluation.length === 1) {
                evaluation = '';
            }
            else {
                evaluation = evaluation.slice(0, -1);
            }
        }
        if(button.textContent === '.') {
            if(!evaluation.includes('.')) {
                input += button.textContent;
                evaluation += '.';
            }

        }

        if(isNum(parseFloat(button.textContent))){
            if(input === '0') {
                input = '';
            }
            evaluation += button.textContent;
        }
        
        if(isOprtr(button.textContent)) {
            if (numberOfOperators === 1) {
                num2 = parseFloat(evaluation);
                num1 = operate(parseFloat(num1), optr, parseFloat(num2));
                optr = button.textContent;
                numberOfOperators = 0;
                evaluation = `${num1}`;
                input = `${num1}`;
            }
            if (numberOfOperators === 0) {
                num1 = parseFloat(evaluation);
                evaluation = '';
                optr = button.textContent;
                numberOfOperators++;
            }
        }
        
        if(button.textContent !== '=' && button.textContent !== 'Clear' && button.textContent !== 'Delete' && button.textContent !== '.'){
            input += button.textContent;
        }
        // if(button.textContent === '.' && !evaluation.includes('.')) {
        //     input += button.textContent;
        // }

        document.querySelector('.display').textContent = input;
        console.log("input = ", input, "eval = ", evaluation, "num1 = ", num1, "num2 = ", num2, "optr = ", optr, "numOptr = ", numberOfOperators);
    });
});