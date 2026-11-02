# Tasks: Scientific Calculator

- [ ] 1. Project setup
  - [ ] 1.1 Create the static app skeleton
    - Create `index.html` with the page shell and the calculator screen's markup: a display above a keypad of buttons, the degrees/radians switch, and the keys `0`–`9`, `.`, `+`, `−`, `×`, `÷`, `^`, `(`, `)`, `√(`, `sin(`, `cos(`, `tan(`, `log(`, `ln(`, `=`, `C` and `⌫`, each with its `data-key` attribute. Link `styles.css` and load `app.js` as a module.
    - Create `styles.css` with the colours, font, spacing and corner radius of the Look and feel section as CSS variables on `:root`, plus the base page styles.
    - Create `app.js` with the screen's behaviour: it holds the expression and the angle mode, appends a clicked or typed key to the display, handles equals, clear and backspace, and switches degrees/radians with `aria-pressed`. It calls `evaluate(expression, { angleMode })` from `calculator.js`.
    - Create `calculator.js` exporting `evaluate(expression, options)` with the tokenizer, parser and evaluator of the expression language, returning `{ ok: true, value }` or `{ ok: false, message }` with `Cannot divide by zero` or `Invalid expression`, and formatting results to up to 10 significant digits.
    - Create `tests/calculator.test.js` with Node's built-in test runner: one passing test for `12 + 8` is `20`, plus the other worked examples and the error cases.
    - Create `README.md` with the commands of Build and run, and a `.gitignore` that includes `.env`.
    - Add `package.json` with a `test` script running `node --test`, and `@playwright/test` as a dev dependency with an `e2e/` folder holding a `.gitkeep`, left out of the unit test run.
    - _Requirements: 1.1, 1.2, 1.3, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6, 3.7_
    - _Files: index.html, styles.css, app.js, calculator.js, package.json, README.md, .gitignore, tests/calculator.test.js, e2e/.gitkeep_
    - _Verify: npm install_
    - _Verify: npm test_
    - _Area: setup_

- [ ] 2. Build the calculator screen
  - [ ] 2.1 Build the calculator screen with its keypad, functions and errors
    - Finish the screen in `index.html`, `app.js` and `calculator.js`: the display above the keypad, digits, operators, decimal point and brackets adding to the display, keyboard input, clear and backspace, equals showing the result, powers and roots, sine, cosine and tangent with the degrees/radians switch, logarithms, and the error messages with the expression kept.
    - Write the screen's own stylesheet `calculator.css` for the calculator card, display, switch and 5-column keypad, in the Look and feel style: phone layout filling the width with 16px margins and keys at least 44px tall, computer layout as a 360px card centred with a soft shadow. Link it from `index.html`.
    - Add `tests/screen.test.js` with Node's built-in test runner, checking the screen's markup and key wiring: every key has its `data-key`, the display sits above the keypad, and the degrees/radians switch starts on degrees.
    - _Requirements: 1.4, 1.5, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7, 4.1, 4.2, 4.3, 4.4, 4.5, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6, 6.1, 6.2, 6.3, 6.4, 6.5, 7.1, 7.2, 7.3, 7.4, 8.1, 8.2_
    - _Depends: 1.1_
    - _Files: index.html, app.js, calculator.js, calculator.css, tests/screen.test.js_
    - _Verify: npm test_
    - _Area: ui_

- [ ] 3. Deployment setup
  - [ ] 3.1 Configure static hosting
    - Add `netlify.toml` that publishes the app's root folder as the site, so `/` opens `index.html`, with no build step and no server.
    - _Requirements: 1.1_
    - _Depends: 2.1_
    - _Files: netlify.toml_
    - _Verify: npm test_
    - _Area: deploy_
