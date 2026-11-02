// app.js — the screen's behaviour.
//
// Holds the expression and the angle mode, appends a clicked or typed key to
// the display, handles equals, clear and backspace, and switches between
// degrees and radians. It calls evaluate(expression, { angleMode }) from
// calculator.js and never parses the expression itself.

import { evaluate, formatResult } from './calculator.js';

const state = {
  expression: '',
  angleMode: 'deg',
  error: '',
};

const display = document.getElementById('display');
const keypad = document.querySelector('.keypad');
const angleButtons = Array.from(document.querySelectorAll('[data-angle]'));

function render() {
  if (state.error) {
    display.textContent = state.error;
    display.classList.add('is-error');
    display.setAttribute('aria-label', `Display: ${state.error}`);
    return;
  }

  display.classList.remove('is-error');
  display.textContent = state.expression;
  display.setAttribute('aria-label', `Display: ${state.expression || 'empty'}`);
}

function append(text) {
  state.error = '';
  state.expression += text;
  render();
}

function clear() {
  state.expression = '';
  state.error = '';
  render();
}

function backspace() {
  state.error = '';
  state.expression = state.expression.slice(0, -1);
  render();
}

function equals() {
  if (state.expression.trim() === '') return;

  const result = evaluate(state.expression, { angleMode: state.angleMode });
  if (result.ok) {
    state.expression = formatResult(result.value);
    state.error = '';
  } else {
    state.error = result.message;
  }
  render();
}

function setAngleMode(mode) {
  state.angleMode = mode === 'rad' ? 'rad' : 'deg';
  for (const button of angleButtons) {
    button.setAttribute('aria-pressed', String(button.dataset.angle === state.angleMode));
  }
}

function pressKey(key) {
  switch (key) {
    case '=':
      equals();
      break;
    case 'C':
      clear();
      break;
    case '⌫':
      backspace();
      break;
    default:
      append(key);
  }
}

if (keypad) {
  keypad.addEventListener('click', (event) => {
    const button = event.target.closest('[data-key]');
    if (!button) return;
    pressKey(button.dataset.key);
  });
}

for (const button of angleButtons) {
  button.addEventListener('click', () => setAngleMode(button.dataset.angle));
}

const KEYBOARD_MAP = {
  '*': '×',
  '/': '÷',
  '-': '−',
};

document.addEventListener('keydown', (event) => {
  if (event.ctrlKey || event.metaKey || event.altKey) return;

  const { key } = event;

  if (key >= '0' && key <= '9') {
    append(key);
  } else if (key === '.' || key === '+' || key === '^' || key === '(' || key === ')') {
    append(key);
  } else if (key === '*' || key === '/' || key === '-') {
    append(KEYBOARD_MAP[key]);
  } else if (key === 'Enter' || key === '=') {
    event.preventDefault();
    equals();
  } else if (key === 'Backspace') {
    event.preventDefault();
    backspace();
  } else if (key === 'Escape') {
    clear();
  } else {
    return;
  }
});

setAngleMode('deg');
render();
