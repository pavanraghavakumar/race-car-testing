# Scientific Calculator

A single web page that opens at `/` in a browser, on a phone or a computer. It
shows a display above a keypad of buttons: type a number or a full expression,
press equals, and the calculator shows the result. It covers arithmetic,
powers, roots, trigonometry and logarithms, shows a clear message when an
expression cannot be calculated, and keeps no history.

There is no server, no database and no sign-in. The app is plain HTML, CSS and
JavaScript, served as static files.

## Files

- `index.html` — the calculator screen: the display, the keypad and the degrees/radians switch.
- `styles.css` — the look and feel of the screen, for phones and computers.
- `app.js` — the screen's behaviour: button clicks, keyboard input and the display.
- `calculator.js` — the evaluator: a tokenizer, parser and evaluator with no access to the page.

## Build and run

Install: none (the app has no runtime dependencies).

Test:

```
npm install
npm test
```

Run locally:

```
npx serve . -l %PORT%
```

The `PORT` variable sets the port; the health path `/` answers with the page.

Deploy: static hosting (Netlify or GitHub Pages), publishing the app's root
folder with no build step.
