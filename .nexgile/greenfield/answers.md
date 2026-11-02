# Requirements brief — Weather App
## Profile
A weather app built with Angular, Python and SQLite. · web app · weather · size: small · depth: short
- **Has a user interface?** Yes (It is an Angular app, which serves pages to a browser.)
- **Runs locally?** Yes (An Angular front end with a Python API can be started on the person's machine.)
## The app
A weather app built with Angular, Python and SQLite.
## Goals and success
- G1 Build a weather app. (description)
## Integrations
- I1 Weather data comes from a public weather service. (Q2)
## Scope and constraints
- S1 Use Angular for the front end. [constraint] (description)
- S2 Use Python for the server. [constraint] (description)
- S3 Use SQLite for the database. [constraint] (description)
## Decisions
- **Stack:** The stack the design part of the spec recommends for this app (decided by Greenfield) (Q5)
- **Deploy target:** No deploy for now (decided by Greenfield) (Q6)
## Other facts
- F1 The app shows current conditions and a forecast. [goals] (Q1)
## Out of scope and later releases
- S4 The app shows live data only; it keeps no history of past weather. [out of scope] (Q3)
## The interview
- Q1 [goals · owner] What should the app show about the weather? → Current conditions and a forecast
- Q2 [integrations · owner] Where does the weather data come from? → A public weather service
- Q3 [entities · owner] Does the app keep a record of past weather? → No, it shows live data only
- Q4 [workflows · owner] Walk me through how someone uses the app to check the weather, from opening it to getting the answer they need. → Decide for me
## Decided by Greenfield (Enough, decide the rest)
- Q5 Which languages and frameworks should the app use? → Decide for me (settled: The stack the design part of the spec recommends for this app)
- Q6 Where should the live app run? → Decide for me (settled: No deploy for now)
