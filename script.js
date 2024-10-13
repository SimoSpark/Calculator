document.addEventListener('DOMContentLoaded', function () {
    let display = document.querySelector('.display');
    let buttons = document.querySelectorAll('button');
    let currentValue = '0';
    let previousValue = '';
    let operation = null;
    let shouldResetDisplay = false;

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            if (button.classList.contains('number')) {
                inputNumber(button.textContent);
            } else if (button.classList.contains('operator')) {
                inputOperator(button.textContent);
            } else if (button.classList.contains('equals')) {
                calculate();
            } else if (button.classList.contains('clear')) {
                clear();
            }
            updateDisplay();
        });
    });

    function inputNumber(num) {
        if (shouldResetDisplay) {
            currentValue = '';
            shouldResetDisplay = false;
        }
        if (currentValue === '0' && num !== '.') {
            currentValue = num;
        } else {
            currentValue += num;
        }
    }

    function inputOperator(op) {
        if (operation !== null) calculate();
        previousValue = currentValue;
        operation = op;
        shouldResetDisplay = true;
    }

    function calculate() {
        if (operation === null || shouldResetDisplay) return;
        let result;
        const prev = parseFloat(previousValue);
        const current = parseFloat(currentValue);
        switch (operation) {
            case '+':
                result = prev + current;
                break;
            case '-':
                result = prev - current;
                break;
            case '×':
                result = prev * current;
                break;
            case '÷':
                result = prev / current;
                break;
            case '%':
                result = prev % current;
                break;
            default:
                return;
        }
        currentValue = result.toString();
        operation = null;
        previousValue = '';
        shouldResetDisplay = true;
    }

    function clear() {
        currentValue = '0';
        previousValue = '';
        operation = null;
        shouldResetDisplay = false;
    }

    function updateDisplay() {
        display.textContent = currentValue;
    }
});
