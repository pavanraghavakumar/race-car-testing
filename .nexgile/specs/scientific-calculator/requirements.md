# Requirements: Scientific Calculator

## Requirement 1: Open the calculator

**User Story:** As a User, I want to open the calculator in my browser, so that I can do a scientific calculation straight away.

_Source: G1, R1, A4_

### Acceptance Criteria

1. WHEN the user opens the address `/` THE SYSTEM SHALL show the calculator screen with a display and a keypad of buttons.
2. THE SYSTEM SHALL show the calculator without asking the user to sign in.
3. THE SYSTEM SHALL show the calculator in English.
4. WHEN the user opens the calculator on a phone THE SYSTEM SHALL show the display above the keypad, with every button visible without scrolling sideways.
5. WHEN the user opens the calculator on a computer THE SYSTEM SHALL show the display above the keypad, centred on the page.

## Requirement 2: Enter an expression

**User Story:** As a User, I want to type a number or a full expression, so that I can calculate what I need.

_Source: W1, A9_

### Acceptance Criteria

1. WHEN the user clicks a digit button THE SYSTEM SHALL add that digit to the display.
2. WHEN the user clicks an operator button for plus, minus, times or divide THE SYSTEM SHALL add that operator to the display.
3. WHEN the user types on the keyboard THE SYSTEM SHALL add the typed digits, operators, decimal point and brackets to the display.
4. WHEN the user clicks the decimal point button THE SYSTEM SHALL add a decimal point to the display.
5. WHEN the user clicks the bracket buttons THE SYSTEM SHALL add an opening or a closing bracket to the display.
6. WHEN the user clicks the clear button THE SYSTEM SHALL empty the display.
7. WHEN the user clicks the backspace button THE SYSTEM SHALL remove the last character from the display.

## Requirement 3: Calculate the result

**User Story:** As a User, I want to press equals and see the result, so that I get the answer to my expression.

_Source: W1, A6, A9_

### Acceptance Criteria

1. WHEN the user presses equals THE SYSTEM SHALL evaluate the expression in the display and show the result in the display.
2. WHEN the user presses equals on `12 + 8` THE SYSTEM SHALL show `20`.
3. WHEN the user presses equals on `7 × 6` THE SYSTEM SHALL show `42`.
4. WHEN the user presses equals on `(2 + 3) × 4` THE SYSTEM SHALL show `20`.
5. WHEN the user presses equals THE SYSTEM SHALL show the result within 1 second.
6. WHEN the user presses equals on an expression that ends in an operator THE SYSTEM SHALL show an error message in the display and keep the expression.
7. WHEN the user presses equals on an expression with unbalanced brackets THE SYSTEM SHALL show an error message in the display and keep the expression.

## Requirement 4: Use powers and roots

**User Story:** As a User, I want to raise numbers to a power and take roots, so that I can do scientific calculations beyond the four basic operations.

_Source: S1, S3, Q2_

### Acceptance Criteria

1. WHEN the user clicks the power button THE SYSTEM SHALL add a power operator to the display.
2. WHEN the user presses equals on `2 ^ 10` THE SYSTEM SHALL show `1024`.
3. WHEN the user clicks the square root button THE SYSTEM SHALL add a square root function to the display.
4. WHEN the user presses equals on `√(81)` THE SYSTEM SHALL show `9`.
5. IF the user presses equals on the square root of a negative number THEN THE SYSTEM SHALL show an error message in the display.

## Requirement 5: Use trigonometry

**User Story:** As a User, I want to calculate sine, cosine and tangent, so that I can solve trigonometry problems.

_Source: S1, S3, Q2_

### Acceptance Criteria

1. WHEN the user clicks the sine, cosine or tangent button THE SYSTEM SHALL add that function to the display.
2. WHEN the user presses equals on `sin(30)` THE SYSTEM SHALL show `0.5`.
3. WHEN the user presses equals on `cos(60)` THE SYSTEM SHALL show `0.5`.
4. WHEN the user presses equals on `tan(45)` THE SYSTEM SHALL show `1`.
5. WHEN the user clicks the degrees button THE SYSTEM SHALL calculate trigonometry in degrees, and show the degrees button as selected.
6. WHEN the user clicks the radians button THE SYSTEM SHALL calculate trigonometry in radians, and show the radians button as selected.

## Requirement 6: Use logarithms

**User Story:** As a User, I want to calculate logarithms, so that I can solve problems that use them.

_Source: S1, S3, Q2_

### Acceptance Criteria

1. WHEN the user clicks the log button THE SYSTEM SHALL add a base-10 logarithm function to the display.
2. WHEN the user clicks the ln button THE SYSTEM SHALL add a natural logarithm function to the display.
3. WHEN the user presses equals on `log(1000)` THE SYSTEM SHALL show `3`.
4. WHEN the user presses equals on `ln(1)` THE SYSTEM SHALL show `0`.
5. IF the user presses equals on the logarithm of zero or of a negative number THEN THE SYSTEM SHALL show an error message in the display.

## Requirement 7: Handle errors

**User Story:** As a User, I want a clear message when my expression cannot be calculated, so that I know what went wrong and can fix it.

_Source: A3_

### Acceptance Criteria

1. IF the user presses equals on an expression that divides by zero THEN THE SYSTEM SHALL show the message `Cannot divide by zero` in the display.
2. IF the user presses equals on an expression the calculator cannot read THEN THE SYSTEM SHALL show the message `Invalid expression` in the display.
3. WHEN the calculator shows an error message THE SYSTEM SHALL keep the expression in the display so the user can change it.
4. WHEN the user clicks the clear button after an error THE SYSTEM SHALL empty the display and remove the error message.

## Requirement 8: Keep no history

**User Story:** As a User, I want the calculator to keep no record of my calculations, so that it stays simple and private.

_Source: A2, F2_

### Acceptance Criteria

1. THE SYSTEM SHALL keep no history of past calculations.
2. WHEN the user reloads the page THE SYSTEM SHALL show an empty display.

## Later releases

- S2 No money, files, other systems, reports or sign-in.

## Assumptions

- The calculator shows one screen at `/`; there is no other page.
- The display shows the expression as the user enters it, and the result replaces it after equals.
- Trigonometry starts in degrees when the page opens.
- The result is shown with up to 10 significant digits, and trailing zeros are removed (`0.5`, not `0.5000000000`).
- The power operator is written `^` in the display.
- The calculator uses the browser's own storage for nothing, so a reload starts fresh.
