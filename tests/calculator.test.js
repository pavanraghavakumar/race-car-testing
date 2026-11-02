import test from 'node:test';
import assert from 'node:assert/strict';

import { evaluate, formatResult } from '../calculator.js';

function value(expression, options) {
  const result = evaluate(expression, options);
  assert.equal(result.ok, true, `expected ${expression} to evaluate, got ${JSON.stringify(result)}`);
  return result.value;
}

function message(expression, options) {
  const result = evaluate(expression, options);
  assert.equal(result.ok, false, `expected ${expression} to fail, got ${JSON.stringify(result)}`);
  return result.message;
}

test('12 + 8 is 20', () => {
  assert.equal(value('12 + 8'), 20);
});

test('7 × 6 is 42', () => {
  assert.equal(value('7 × 6'), 42);
});

test('(2 + 3) × 4 is 20', () => {
  assert.equal(value('(2 + 3) × 4'), 20);
});

test('2 ^ 10 is 1024', () => {
  assert.equal(value('2 ^ 10'), 1024);
});

test('power is right-associative', () => {
  assert.equal(value('2 ^ 3 ^ 2'), 512);
});

test('√(81) is 9', () => {
  assert.equal(value('√(81)'), 9);
});

test('sin(30) is 0.5 in degrees', () => {
  assert.equal(value('sin(30)'), 0.5);
});

test('cos(60) is 0.5 in degrees', () => {
  assert.equal(value('cos(60)'), 0.5);
});

test('tan(45) is 1 in degrees', () => {
  assert.equal(value('tan(45)'), 1);
});

test('sin(π/2) is 1 in radians', () => {
  assert.equal(value('sin(1.5707963267948966)', { angleMode: 'rad' }), 1);
});

test('log(1000) is 3', () => {
  assert.equal(value('log(1000)'), 3);
});

test('ln(1) is 0', () => {
  assert.equal(value('ln(1)'), 0);
});

test('a leading minus is allowed', () => {
  assert.equal(value('−5 + 2'), -3);
});

test('division by zero is an error', () => {
  assert.equal(message('5 ÷ 0'), 'Cannot divide by zero');
});

test('logarithm of zero is an error', () => {
  assert.equal(message('log(0)'), 'Cannot divide by zero');
});

test('square root of a negative number is an error', () => {
  assert.equal(message('√(−4)'), 'Cannot divide by zero');
});

test('an expression ending in an operator is invalid', () => {
  assert.equal(message('12 +'), 'Invalid expression');
});

test('unbalanced brackets are invalid', () => {
  assert.equal(message('(2 + 3'), 'Invalid expression');
});

test('an unknown character is invalid', () => {
  assert.equal(message('2 & 3'), 'Invalid expression');
});

test('an empty expression is invalid', () => {
  assert.equal(message(''), 'Invalid expression');
});

test('results are formatted to 10 significant digits without trailing zeros', () => {
  assert.equal(formatResult(0.5), '0.5');
  assert.equal(formatResult(20), '20');
  assert.equal(formatResult(1 / 3), '0.3333333333');
});
