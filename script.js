document.addEventListener('DOMContentLoaded', () => {
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('.btn');

    let currentInput = '0';
    let operator = null;
    let previousInput = '';
    let resetDisplay = false;

    function updateDisplay() {
        display.textContent = currentInput;
    }

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const buttonText = button.textContent;

            if (button.classList.contains('number')) {
                if (resetDisplay) {
                    currentInput = buttonText === '00' ? '0' : buttonText;
                    resetDisplay = false;
                } else if (currentInput === '0' && buttonText !== '.') {
                    currentInput = buttonText === '00' ? '0' : buttonText;
                } else if (buttonText === '00') {
                    if (currentInput !== '0') {
                        currentInput += '00';
                    }
                } else if (buttonText === '.' && currentInput.includes('.')) {
                    // Do nothing if decimal already exists
                } else {
                    currentInput += buttonText;
                }
                updateDisplay();
            } else if (button.classList.contains('operator')) {
                if (operator && !resetDisplay) {
                    calculate();
                }
                operator = buttonText;
                previousInput = currentInput;
                resetDisplay = true;
                updateDisplay(); // Show previous input temporarily or clear if starting new operation
            } else if (button.classList.contains('ac')) {
                currentInput = '0';
                operator = null;
                previousInput = '';
                resetDisplay = false;
                updateDisplay();
            } else if (button.classList.contains('de')) {
                currentInput = currentInput.slice(0, -1);
                if (currentInput === '') {
                    currentInput = '0';
                }
                updateDisplay();
            } else if (button.classList.contains('equals')) {
                calculate();
                operator = null;
                resetDisplay = true;
            }
        });
    });

    function calculate() {
        let result;
        const prev = parseFloat(previousInput);
        const current = parseFloat(currentInput);

        if (isNaN(prev) || isNaN(current)) return;

        switch (operator) {
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
                result = prev * (current / 100);
                break;
            default:
                return;
        }

        currentInput = result.toString();
        updateDisplay();
    }

    updateDisplay(); // Initialize display with '0'
});
