// tests/screen.test.js — the calculator screen's markup and key wiring.
//
// Runs with Node's built-in test runner, with no browser: it reads index.html,
// app.js and calculator.css as text and checks the structure the screen needs.

import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const read = (name) => readFileSync(join(root, name), 'utf8');

const html = read('index.html');
const app = read('app.js');
const css = read('calculator.css');

// Every key the screen shows, with its data-key attribute.
const KEYS = [
  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
  '.', '+', '−', '×', '÷', '^', '(', ')', '√(',
  'sin(', 'cos(', 'tan(', 'log(', 'ln(', '=', 'C', '⌫',
];

function dataKeys() {
  return Array.from(html.matchAll(/data-key="([^"]*)"/g), (match) => match[1]);
}

test('index.html links the screen stylesheet', () => {
  assert.match(html, /<link[^>]+href="calculator\.css"/);
});

test('index.html loads app.js as a module', () => {
  assert.match(html, /<script[^>]+type="module"[^>]+src="app\.js"/);
});

test('every key has its data-key attribute', () => {
  const keys = dataKeys();
  for (const key of KEYS) {
    assert.ok(keys.includes(key), `missing key ${JSON.stringify(key)}`);
  }
  assert.equal(keys.length, KEYS.length, `expected ${KEYS.length} keys, found ${keys.length}`);
});

test('the display sits above the keypad', () => {
  const displayAt = html.indexOf('id="display"');
  const keypadAt = html.indexOf('class="keypad"');
  assert.ok(displayAt !== -1, 'display is missing');
  assert.ok(keypadAt !== -1, 'keypad is missing');
  assert.ok(displayAt < keypadAt, 'the display must come before the keypad');
});

test('the degrees/radians switch starts on degrees', () => {
  const degrees = html.match(/<button[^>]*data-angle="deg"[^>]*>/);
  const radians = html.match(/<button[^>]*data-angle="rad"[^>]*>/);
  assert.ok(degrees, 'degrees button is missing');
  assert.ok(radians, 'radians button is missing');
  assert.match(degrees[0], /aria-pressed="true"/);
  assert.match(radians[0], /aria-pressed="false"/);
});

test('app.js starts in degrees and wires the keypad and keyboard', () => {
  assert.match(app, /angleMode:\s*'deg'/);
  assert.match(app, /setAngleMode\('deg'\)/);
  assert.match(app, /data-key/);
  assert.match(app, /keydown/);
  assert.match(app, /evaluate\(/);
});

test('calculator.css lays out a 5-column keypad with keys at least 44px tall', () => {
  assert.match(css, /grid-template-columns:\s*repeat\(5,/);
  assert.match(css, /min-height:\s*var\(--calc-key-min-height/);
  assert.match(css, /--calc-key-min-height:\s*var\(--key-min-height,\s*44px\)/);
});

test('calculator.css centres a 360px card on a computer', () => {
  assert.match(css, /--calc-width:\s*var\(--calculator-width,\s*360px\)/);
  assert.match(css, /margin:\s*0 auto/);
  assert.match(css, /box-shadow:/);
});
