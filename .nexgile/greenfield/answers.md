# Requirements brief — Weather App
## Profile
A weather app that shows current conditions and forecasts, built with mockups first. · mobile app · weather · size: small · depth: short
- **Has a user interface?** Yes (A weather app shows screens to the person.)
- **Runs locally?** No (It is an app only for phones, so Greenfield cannot serve it to a browser on the person's machine.)
## The app
A small mobile weather app for one person, who keeps a list of saved places and taps one to see its current conditions and forecast from a public weather service. The first release has the saved-places list and the weather screens, with the last weather shown when the service cannot be reached.
## Goals and success
- G1 Build a weather app. (description)
## Roles
- R1 Person using the app (1) [never signs in to the app] (assumption, Q3)
## Workflows
### W1 Check the weather for a saved place (release 1) — actors: R1 Person using the app; trigger: The person opens the app; outcome: The person has seen the current conditions and forecast for the place they chose.; how often: Several times a day (Q4, Q1, Q3)
1. The app opens on the list of saved places.
2. The person taps a saved place.
3. The app fetches that place's weather from the public weather service.
4. The app shows the current conditions for that place.
5. The app shows the forecast for that place.
- The weather service does not answer
- X1 The public weather service does not answer or returns an error. (assumption, Q2)
## Records
- E1 Saved place. fields: place name, location; states: saved; owner: the person using the app (Q3)
## Rules
- BR1 A place can be saved only once; saving the same place again keeps the one already saved.. Applies: The person saves 'Madrid' when 'Madrid' is already in their list: the list still shows one 'Madrid'.. Does not apply: The person saves 'Madrid' and then 'Barcelona': the list shows both. (assumption, Q3)
## Quality targets
- N1 [performance] Weather for a saved place is shown within 3 seconds of tapping it.: 3 seconds [assumed] (assumption)
- N2 [availability] The app is available 99% of the time in a month.: 99% of the month [assumed] (assumption)
## Integrations
- I1 Weather data comes from a public weather service. (Q2)
## Scope and constraints
- S1 In the first release: the list of saved places, and current conditions and forecast for a saved place. (assumption, Q1, Q3)
## Decisions
- **Stack:** React Native and a small Node.js service (decided by Greenfield; suggested: One codebase for phones, and a small service keeps the weather service's key off the phone and lets the app cache the last weather.) (Q5)
- **Deploy target:** Expo for the app and a small cloud host for the service (decided by Greenfield; suggested: It is the quickest way to try the app on a phone while the service runs cheaply in one place.) (Q6)
## Assumptions
- A1 One person uses the app on their own phone, with no sign-in. — The description and answers name no other people and no accounts. [assumed] (assumption, Q3)
- A2 The app is used on a phone, and works with no connection only by showing the last weather it fetched. — It is a mobile app and no offline need was stated. [assumed] (assumption)
- A3 The app is in English and shows temperatures in Celsius. — The description is in English and names no other language or unit. [assumed] (assumption)
- A4 The first release has the saved-places list and the current conditions and forecast for a saved place; weather alerts and other screens come later. — These are the only things the answers ask for.; high impact [assumed] (assumption, Q1, Q3)
- A5 The person opens the app, sees their saved places, taps one, and the app shows that place's current conditions and forecast from the public weather service. — It is the simplest flow that uses the saved places and the weather data already agreed. [assumed] (assumption, Q4)
## Other facts
- F1 Asked to see mock-ups of the screens first: Greenfield draws none, and builds each screen from the spec. [scope] (description)
- F2 The app shows current conditions and a forecast. [goals] (Q1)
## Out of scope and later releases
- S2 Out of the first release: weather alerts, accounts and sign-in, and sharing places with other people. [out of scope] [assumed, high impact] (assumption)
## The interview
- Q1 [goals · owner] What should the app show about the weather? → Current conditions and a forecast
- Q2 [integrations · owner] Where should the weather data come from? → A public weather service
- Q3 [entities · owner] Should the app remember places the person checks? → Yes, a list of saved places
- Q4 [workflows · owner] Walk me through how someone checks the weather for a saved place, from opening the app to seeing the forecast. → Decide for me (settled: The person opens the app, sees their saved places, taps one, and the app shows that place's current conditions and forecast from the public weather service.)
## Decided by Greenfield (Enough, decide the rest)
- Q5 What should the app be built with? → Decide for me (settled: React Native and a small Node.js service)
- Q6 Where should the app and its small service run? → Decide for me (settled: Expo for the app and a small cloud host for the service)
