# Requirements brief — Scientific Calculator
## Profile
A simple scientific calculator app for anyone who needs to do scientific calculations. · web app · calculator · size: small · depth: short
- **Has a user interface?** Yes (A calculator is used on a screen with buttons and a display.)
- **Runs locally?** Yes (It is a web page Greenfield can open in the browser on the person's machine.)
## The app
A simple scientific calculator web app for one person, who types an expression and gets the result. It covers arithmetic, powers, roots, trigonometry and logarithms, works on phones and computers, and keeps no history.
## Goals and success
- G1 Give people a simple scientific calculator they can use in a browser. (description)
## Roles
- R1 User — Owner (1) [never signs in to the app] (description, Q4)
## Workflows
### W1 Do a scientific calculation (release 1) — actors: R1 Owner; trigger: The user wants a result; outcome: The user sees the result; how often: A few times a day (description, Q4, Q5)
1. The user types a number or a full expression
2. The user presses equals
3. The app evaluates the expression and shows the result
## Scope and constraints
- S1 Scientific calculations: arithmetic, powers, roots, trigonometry, logarithms. (description)
- S3 Functions: powers, roots, trigonometry and logarithms, beyond + − × ÷. (Q2)
## Decisions
- **Stack:** Plain HTML, CSS and JavaScript (decided by Greenfield; suggested: A calculator needs no server or database, so plain web files are the simplest fit.) (Q6)
- **Deploy target:** Static hosting (Netlify or GitHub Pages) (decided by Greenfield; suggested: Plain web files can be served free and instantly from static hosting.) (Q7)
## Assumptions
- A1 The owner is the only user and uses the calculator alone, a few times a day. — The person said it is just for them.; confirmed by the user [assumed] (assumption, Q4)
- A2 No records are kept: the calculator holds no history and no saved calculations. — The person said no history.; confirmed by the user [assumed] (assumption, Q1)
- A3 The calculator shows an error message when the expression cannot be evaluated, such as dividing by zero. — Every calculator must handle bad input. [assumed] (assumption)
- A4 The calculator works on phones and computers in a browser, with no sign-in. — The person said both devices and it is just for them.; confirmed by the user [assumed] (assumption, Q3, Q4)
- A5 The calculator is used by one person, so load is tiny: one user at a time. — The person said it is just for them.; confirmed by the user [assumed] (assumption, Q4)
- A6 Results appear as soon as the user presses equals, within a second. — A calculator must feel instant. [assumed] (assumption)
- A7 The calculator is in English and uses the basic accessibility level. — The description is in English and it is a simple tool. [assumed] (assumption)
- A8 The calculator is released as one first release with all the scientific functions. — It is a small app with one workflow. [assumed] (assumption)
- A9 The user types an expression, the app evaluates it and shows the result. — A single expression box is the simplest way to do scientific calculations. [assumed] (assumption, Q5)
## Other facts
- F1 The calculator must work on both phones and computers. [devices] (Q3)
- F2 No history of past calculations is kept. [entities] (Q1)
## Out of scope and later releases
- S2 No money, files, other systems, reports or sign-in. [out of scope] (description)
## The interview
- Q1 [entities · owner] Should the calculator keep a history of past calculations? → No history
- Q2 [scope · owner] Which extra functions must it have beyond + − × ÷? → Powers, roots, trigonometry and logarithms
- Q3 [devices · owner] Should it work on phones as well as on a computer? → Both
- Q4 [stakeholders · owner] Who will use it? → Just me
- Q5 [workflows · role:R1] Walk me through the last time you did a scientific calculation you would want this calculator for, step by step. → Decide for me (settled: The user types an expression, the app evaluates it and shows the result.)
## Decided by Greenfield (Enough, decide the rest)
- Q6 Which stack should the calculator be built with? → Decide for me (settled: Plain HTML, CSS and JavaScript)
- Q7 Where should the calculator be deployed? → Decide for me (settled: Static hosting (Netlify or GitHub Pages))
