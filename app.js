const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.calculator .button');
const switchThemeButton = document.querySelector('.switchTheme');
const helpButton = document.querySelector('.helpButton');
const helpWindow = document.querySelector('.helpWindow');
const closeHelpWindowButton = document.querySelector('.closeHelpWindowButton');
const buttonAudio = new Audio('assets/audio/btn.wav');
const equalsAudio = new Audio('assets/audio/equal.wav');

let firstOperand = null;
let operator = null;
let waitingForSecondOperand = false;

function play(audio) {
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

function enterDigit(digit) {
  if (display.textContent.length >= 9 && !waitingForSecondOperand) return;
  display.textContent = waitingForSecondOperand || display.textContent === '0'
    ? digit
    : display.textContent + digit;
  waitingForSecondOperand = false;
}

function calculate() {
  if (firstOperand === null || operator === null || waitingForSecondOperand) return;
  const secondOperand = Number(display.textContent);
  const result = operator === '+'
    ? firstOperand + secondOperand
    : firstOperand - secondOperand;
  display.textContent = String(Number(result.toPrecision(10)));
  firstOperand = null;
  operator = null;
  waitingForSecondOperand = true;
  play(equalsAudio);
}

buttons.forEach((button) => {
  button.addEventListener('click', () => {
    const value = button.textContent.trim();
    play(buttonAudio);

    if (/^\d$/.test(value)) {
      enterDigit(value);
      return;
    }
    if (value === 'ac') {
      display.textContent = '0';
      firstOperand = null;
      operator = null;
      waitingForSecondOperand = false;
    } else if (value === '=') {
      calculate();
    } else if (value === '+' || value === '-') {
      if (firstOperand !== null && operator && !waitingForSecondOperand) calculate();
      firstOperand = Number(display.textContent);
      operator = value;
      waitingForSecondOperand = true;
    }
  });
});

display.addEventListener('click', () => {
  if (waitingForSecondOperand) return;
  display.textContent = display.textContent.length > 1
    ? display.textContent.slice(0, -1)
    : '0';
});

switchThemeButton.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
});

function setHelpVisibility(visible) {
  helpWindow.style.display = visible ? 'flex' : 'none';
  helpButton.setAttribute('aria-expanded', String(visible));
}

helpButton.addEventListener('click', () => {
  setHelpVisibility(helpWindow.style.display !== 'flex');
});
closeHelpWindowButton.addEventListener('click', () => setHelpVisibility(false));
