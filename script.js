function add(a, b) {
    return a + b;
}

function sub(a, b) {
    return a - b;
}

function mult(a, b) {
    return a * b;
}

function div(a, b) {
    if (b === 0) {
        return 'ERROR';
    }
    return a / b;
}

function operate(a, op, b) {
    switch (op) {
        case '+':
            add(a, b);
            break;
        case '-':
            sub(a, b);
            break;
        case '*':
            sub(a, b);
            break;
        case '/':
            div(a, b);
            break;
        default:
            break;
    }
}
function genleft() {
    const left = document.querySelector('.left');
    for (let i = 0; i < 3; ++i) {
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
    const clr = document.createElement('button');
    const equal = document.createElement('button');
    zero.textContent = '0';
    zero.style = 'padding: 30px; margin: 5px; font-size: 25px;';
    clr.textContent = 'Clear';
    clr.style = 'padding: 30px 7.2px; margin: 5px; font-size: 25px; ';
    equal.textContent = '=';
    equal.style = 'padding: 30px; margin: 5px; font-size: 25px; ';
    row.appendChild(zero);
    row.appendChild(equal);
    row.appendChild(clr);
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

genleft();
genright();

let num1;
let num2;
let optr;
let input;

const btn = document.querySelectorAll('button');
btn.forEach((button) => {
    button.addEventListener('click', () => {
        if (button.textContent === 'Clear') {
            input = '';
            document.querySelector('.display').textContent = input;
            return;
        }
        if (button.textContent === '=') {
            num2 = parseInt(input);
            input = operate(num1, optr, num2);
            document.querySelector('.display').textContent = input;
            return;
        }
        if (input === undefined) {
            input = '';
        }
        input += button.textContent;
        document.querySelector('.display').textContent = input;
    });
});