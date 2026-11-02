// calculator.js — the evaluator.
//
// A small hand-written tokenizer, parser and evaluator for the calculator's
// expression language. It has no access to the page, so it can be tested on
// its own with Node's built-in test runner.
//
//   evaluate(expression, options) -> { ok: true, value } | { ok: false, message }
//
// It never throws: every failure comes back as { ok: false, message }.

const DIVIDE_BY_ZERO = 'Cannot divide by zero';
const INVALID_EXPRESSION = 'Invalid expression';

const FUNCTIONS = new Set(['sin', 'cos', 'tan', 'log', 'ln']);

class CalcError extends Error {
  constructor(message) {
    super(message);
    this.message = message;
  }
}

function fail(message) {
  throw new CalcError(message);
}

// ---------------------------------------------------------------------------
// Tokenizer
// ---------------------------------------------------------------------------

function tokenize(input) {
  const tokens = [];
  let i = 0;

  while (i < input.length) {
    const ch = input[i];

    if (ch === ' ' || ch === '\t' || ch === '\n' || ch === '\r') {
      i += 1;
      continue;
    }

    if (ch >= '0' && ch <= '9') {
      let j = i;
      while (j < input.length && input[j] >= '0' && input[j] <= '9') j += 1;
      if (input[j] === '.') {
        j += 1;
        while (j < input.length && input[j] >= '0' && input[j] <= '9') j += 1;
      }
      tokens.push({ type: 'number', value: Number(input.slice(i, j)) });
      i = j;
      continue;
    }

    if (ch === '.') {
      let j = i + 1;
      while (j < input.length && input[j] >= '0' && input[j] <= '9') j += 1;
      if (j === i + 1) fail(INVALID_EXPRESSION);
      tokens.push({ type: 'number', value: Number(input.slice(i, j)) });
      i = j;
      continue;
    }

    if (ch === '√') {
      tokens.push({ type: 'function', name: 'sqrt' });
      i += 1;
      continue;
    }

    if (/[a-z]/.test(ch)) {
      let j = i;
      while (j < input.length && /[a-z]/.test(input[j])) j += 1;
      const name = input.slice(i, j);
      if (!FUNCTIONS.has(name)) fail(INVALID_EXPRESSION);
      tokens.push({ type: 'function', name });
      i = j;
      continue;
    }

    switch (ch) {
      case '+':
        tokens.push({ type: 'op', value: '+' });
        break;
      case '-':
      case '−':
        tokens.push({ type: 'op', value: '-' });
        break;
      case '*':
      case '×':
        tokens.push({ type: 'op', value: '*' });
        break;
      case '/':
      case '÷':
        tokens.push({ type: 'op', value: '/' });
        break;
      case '^':
        tokens.push({ type: 'op', value: '^' });
        break;
      case '(':
        tokens.push({ type: 'lparen' });
        break;
      case ')':
        tokens.push({ type: 'rparen' });
        break;
      default:
        fail(INVALID_EXPRESSION);
    }
    i += 1;
  }

  return tokens;
}

// ---------------------------------------------------------------------------
// Parser (recursive descent)
//
//   expression := term (('+' | '-') term)*
//   term       := unary (('*' | '/') unary)*
//   unary      := ('-' | '+') unary | power
//   power      := primary ('^' unary)?          (right-associative)
//   primary    := number | function '(' expression ')' | '(' expression ')'
// ---------------------------------------------------------------------------

function parse(tokens) {
  let pos = 0;

  const peek = () => tokens[pos];
  const next = () => tokens[pos++];

  function parseExpression() {
    let node = parseTerm();
    while (peek() && peek().type === 'op' && (peek().value === '+' || peek().value === '-')) {
      const op = next().value;
      node = { type: 'binary', op, left: node, right: parseTerm() };
    }
    return node;
  }

  function parseTerm() {
    let node = parseUnary();
    while (peek() && peek().type === 'op' && (peek().value === '*' || peek().value === '/')) {
      const op = next().value;
      node = { type: 'binary', op, left: node, right: parseUnary() };
    }
    return node;
  }

  function parseUnary() {
    const token = peek();
    if (token && token.type === 'op' && (token.value === '-' || token.value === '+')) {
      next();
      const operand = parseUnary();
      return token.value === '-' ? { type: 'negate', operand } : operand;
    }
    return parsePower();
  }

  function parsePower() {
    const base = parsePrimary();
    if (peek() && peek().type === 'op' && peek().value === '^') {
      next();
      return { type: 'binary', op: '^', left: base, right: parseUnary() };
    }
    return base;
  }

  function parsePrimary() {
    const token = peek();
    if (!token) fail(INVALID_EXPRESSION);

    if (token.type === 'number') {
      next();
      return { type: 'number', value: token.value };
    }

    if (token.type === 'function') {
      next();
      if (!peek() || peek().type !== 'lparen') fail(INVALID_EXPRESSION);
      next();
      const argument = parseExpression();
      if (!peek() || peek().type !== 'rparen') fail(INVALID_EXPRESSION);
      next();
      return { type: 'call', name: token.name, argument };
    }

    if (token.type === 'lparen') {
      next();
      const inner = parseExpression();
      if (!peek() || peek().type !== 'rparen') fail(INVALID_EXPRESSION);
      next();
      return inner;
    }

    fail(INVALID_EXPRESSION);
  }

  const ast = parseExpression();
  if (pos !== tokens.length) fail(INVALID_EXPRESSION);
  return ast;
}

// ---------------------------------------------------------------------------
// Evaluator
// ---------------------------------------------------------------------------

function evaluateNode(node, angleMode) {
  switch (node.type) {
    case 'number':
      return node.value;

    case 'negate':
      return -evaluateNode(node.operand, angleMode);

    case 'binary': {
      const left = evaluateNode(node.left, angleMode);
      const right = evaluateNode(node.right, angleMode);
      switch (node.op) {
        case '+':
          return left + right;
        case '-':
          return left - right;
        case '*':
          return left * right;
        case '/':
          if (right === 0) fail(DIVIDE_BY_ZERO);
          return left / right;
        case '^':
          return Math.pow(left, right);
        default:
          fail(INVALID_EXPRESSION);
      }
      break;
    }

    case 'call': {
      const value = evaluateNode(node.argument, angleMode);
      switch (node.name) {
        case 'sqrt':
          if (value < 0) fail(DIVIDE_BY_ZERO);
          return Math.sqrt(value);
        case 'sin':
          return roundSignificant(Math.sin(toRadians(value, angleMode)));
        case 'cos':
          return roundSignificant(Math.cos(toRadians(value, angleMode)));
        case 'tan':
          return roundSignificant(Math.tan(toRadians(value, angleMode)));
        case 'log':
          if (value <= 0) fail(DIVIDE_BY_ZERO);
          return Math.log10(value);
        case 'ln':
          if (value <= 0) fail(DIVIDE_BY_ZERO);
          return Math.log(value);
        default:
          fail(INVALID_EXPRESSION);
      }
      break;
    }

    default:
      fail(INVALID_EXPRESSION);
  }
}

function toRadians(value, angleMode) {
  return angleMode === 'rad' ? value : (value * Math.PI) / 180;
}

// Trigonometry in degrees picks up floating-point noise (sin(30) is
// 0.49999999999999994); round to the 10 significant digits the display shows.
function roundSignificant(value) {
  if (!Number.isFinite(value) || value === 0) return value;
  return Number(value.toPrecision(10));
}

// ---------------------------------------------------------------------------
// Display formatting
// ---------------------------------------------------------------------------

// Up to 10 significant digits, trailing zeros removed, exponent form when the
// plain form would be too long or too small to read.
export function formatResult(value) {
  if (!Number.isFinite(value)) return String(value);
  if (value === 0) return '0';

  const magnitude = Math.abs(value);
  if (magnitude >= 1e21 || magnitude < 1e-9) {
    return trimExponent(value.toExponential(9));
  }

  const rounded = Number(value.toPrecision(10));
  return String(rounded);
}

function trimExponent(text) {
  // "1.000000000e+21" -> "1e+21"
  const [mantissa, exponent] = text.split('e');
  const trimmed = mantissa.includes('.') ? mantissa.replace(/0+$/, '').replace(/\.$/, '') : mantissa;
  return `${trimmed}e${exponent}`;
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function evaluate(expression, options = {}) {
  const angleMode = options.angleMode === 'rad' ? 'rad' : 'deg';

  try {
    const text = String(expression == null ? '' : expression);
    const tokens = tokenize(text);
    if (tokens.length === 0) return { ok: false, message: INVALID_EXPRESSION };
    const ast = parse(tokens);
    const value = evaluateNode(ast, angleMode);
    if (typeof value !== 'number' || Number.isNaN(value)) {
      return { ok: false, message: INVALID_EXPRESSION };
    }
    if (!Number.isFinite(value)) {
      return { ok: false, message: DIVIDE_BY_ZERO };
    }
    return { ok: true, value };
  } catch (error) {
    if (error instanceof CalcError) {
      return { ok: false, message: error.message };
    }
    return { ok: false, message: INVALID_EXPRESSION };
  }
}

export default evaluate;
