# Design: Weather App

## Overview

The Weather App is a small web app that shows the current conditions and the next 5 days' forecast for a city. A person opens it at `/`, sees London's weather straight away, searches for another city, and finds the cities they searched for in a recent cities list that survives a restart.

It has two parts:

- an **Angular** single-page app that serves the screen at `/`, and
- a **Python** API (FastAPI, served by uvicorn) that talks to the public weather service Open-Meteo and keeps the recent cities list in **SQLite**.

The browser never calls Open-Meteo itself: the Python server does, so the API key-less public service is reached from one place, its answers are shaped once, and the recent cities list is written by the server.

## Architecture

```
Browser (Angular SPA at /)
   |  HTTP /api/*
   v
Angular dev server (Vite) on PORT  ---proxy /api-->  Python API (uvicorn) on 127.0.0.1:8000
                                                          |            |
                                                          v            v
                                                    Open-Meteo     SQLite file
```

- In development, `npm run dev` starts both: the Python API with uvicorn on `127.0.0.1:8000`, and the Angular dev server on `127.0.0.1:$PORT`, which proxies `/api` to the API. The page a person opens is the Angular dev server's port, so `Port variable` is `PORT` and `Health path` is `/api/health`, answered through the proxy.
- In a production build, `ng build` writes the static files to `dist/weather-app/browser`, and the Python server serves them at `/` alongside `/api/*`, so one process serves the whole app.
- The SQLite file's path comes from the `DATABASE_PATH` environment variable, defaulting to `data/weather.db` beside the server. Tests point it at a file in a temporary folder.

## Components and Interfaces

### Python API (`server/`)

`server/app/main.py` builds the FastAPI app, mounts the routers and serves the built Angular files when they exist. `server/app/weather.py` calls Open-Meteo. `server/app/recent.py` reads and writes the recent cities list. `server/app/db.py` opens the SQLite connection and applies the schema.

#### `GET /api/health`

Answers `200` with `{"status": "ok"}`.

#### `GET /api/weather?city=<name>`

Looks the city up with Open-Meteo's geocoding API, then fetches its current conditions and 5-day forecast. Answers `200` with:

```json
{
  "city": "London",
  "country": "United Kingdom",
  "latitude": 51.5074,
  "longitude": -0.1278,
  "current": {
    "temperature_c": 12.4,
    "conditions": "Cloudy",
    "humidity_pct": 78,
    "wind_kph": 14.2,
    "observed_at": "2026-11-02T11:00:00Z"
  },
  "forecast": [
    { "date": "2026-11-02", "temp_max_c": 14.1, "temp_min_c": 8.3, "conditions": "Cloudy" },
    { "date": "2026-11-03", "temp_max_c": 13.0, "temp_min_c": 7.9, "conditions": "Rain" }
  ],
  "updated_at": "2026-11-02T11:20:00Z"
}
```

`forecast` holds exactly 5 entries, today first. `conditions` is one of `Clear`, `Cloudy`, `Rain`, `Snow`, `Fog`, `Thunderstorm`, mapped on the server from Open-Meteo's WMO weather codes.

Error answers:

- `404` with `{"detail": "City not found. Check the spelling and try again."}` when the geocoding API finds no city.
- `504` with `{"detail": "Weather data is unavailable right now. Try again."}` when Open-Meteo does not answer within 10 seconds.
- `502` with `{"detail": "Weather data is unavailable right now. Try again."}` when Open-Meteo answers with an error.

The server's Open-Meteo call has a 10 second timeout.

#### `GET /api/recent`

Answers `200` with the recent cities list, most recently searched first, each entry with its current temperature:

```json
{
  "cities": [
    { "city": "Paris", "country": "France", "temperature_c": 9.8, "searched_at": "2026-11-02T11:20:00Z" },
    { "city": "London", "country": "United Kingdom", "temperature_c": 12.4, "searched_at": "2026-11-02T10:05:00Z" }
  ]
}
```

`temperature_c` is `null` when the current temperature for that city cannot be fetched; the entry is still listed.

#### `POST /api/recent`

Request body:

```json
{ "city": "Paris", "country": "France", "latitude": 48.8566, "longitude": 2.3522 }
```

Adds the city to the list, or moves it to the top when it is already there (matched on `city` and `country`, case-insensitively), and drops the oldest entry when the list would hold more than 10. Answers `200` with the same shape as `GET /api/recent`.

#### `DELETE /api/recent/{city}`

Removes the city (matched case-insensitively on the path segment) and answers `200` with the same shape as `GET /api/recent`. Answers `404` with `{"detail": "City is not in the recent cities list."}` when it is not there.

### Angular app (`src/`)

- `src/app/weather.service.ts` — the only place that calls `/api/*`: `getWeather(city)`, `getRecent()`, `addRecent(city)`, `removeRecent(city)`. It turns a `404` into a `CityNotFoundError` and a `502`/`504` into a `WeatherUnavailableError`.
- `src/app/app.routes.ts` — one route, `''`, to `WeatherPageComponent`, so `/` opens the weather screen.
- `src/app/weather-page/weather-page.component.ts` — the weather screen: the search field, the current conditions card, the 5-day forecast and the Refresh button.
- `src/app/recent-cities/recent-cities.component.ts` — the recent cities list, with a remove button beside each city.
- `src/app/weather-page/weather-page.component.html` and `.css`, `src/app/recent-cities/recent-cities.component.html` and `.css` — the screen's markup and its own styles.

The screen keeps its state in `WeatherPageComponent` signals: `city`, `weather`, `recent`, `error`, `loading`. On start it calls `getWeather('London')` and `getRecent()`. A successful search calls `getWeather(city)` and then `addRecent(...)`, which returns the new list.

## Data Models

One SQLite table, created by `server/app/db.py` on start when it does not exist:

```sql
CREATE TABLE IF NOT EXISTS recent_city (
  id          INTEGER PRIMARY KEY AUTOINCREMENT,
  city        TEXT    NOT NULL,
  country     TEXT    NOT NULL,
  latitude    REAL    NOT NULL,
  longitude   REAL    NOT NULL,
  searched_at TEXT    NOT NULL
);
CREATE UNIQUE INDEX IF NOT EXISTS recent_city_name
  ON recent_city (lower(city), lower(country));
```

`searched_at` is an ISO 8601 UTC string. The list is read with `ORDER BY searched_at DESC, id DESC`. No weather data is stored: the app keeps no history of past weather.

## Error Handling

- The server maps Open-Meteo's failures to the `404`, `502` and `504` answers above, with the exact messages the requirements give.
- The Angular service turns those answers into typed errors; the screen shows the message in an error banner above the weather card and keeps the weather already on screen.
- A failed `addRecent` or `removeRecent` leaves the list as it was and shows the same unavailable message; the weather on screen is untouched.
- A failed `getRecent` on start shows the empty-list message rather than an error, so the screen still works.

## Testing Strategy

- **Python**: `pytest` in `server/tests/`. Each test starts the FastAPI app with `TestClient`, points `DATABASE_PATH` at a SQLite file in a temporary folder, and replaces the Open-Meteo call with a fake that returns fixed data, so no test needs the network. The tests cover each endpoint's success and error answers, the 10-city cap, the move-to-top rule and the case-insensitive match.
- **Angular**: `vitest` (Angular's unit test runner) in `src/**/*.spec.ts`. `HttpTestingController` stands in for the API, so the screen's tests cover the London start, a search, the error messages, the refresh, the recent list and its remove button.
- **End to end**: Playwright journeys in `e2e/`, saved by Greenfield's Tester and run only through `run_journeys`.

## Look and feel

A clean, modern weather app: soft sky-blue surfaces, generous spacing, rounded cards, one strong accent for the main action.

- **Colours** (CSS variables in `src/styles.css`):
  - `--bg: #eef4fb` (page background)
  - `--surface: #ffffff` (cards, list rows)
  - `--text: #16202b` (primary text)
  - `--text-muted: #5b6b7c` (labels, secondary text)
  - `--primary: #1f6feb` (Search and Refresh buttons, focus rings)
  - `--primary-hover: #1a5fd0`
  - `--error: #c62828` (error banner text and border)
  - `--error-bg: #fdecea`
  - `--success: #1b7f4b`
  - `--border: #d7e2ee`
- **Font**: `Inter, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`. Temperatures use `font-variant-numeric: tabular-nums`.
- **Spacing**: a 4px scale (`4, 8, 12, 16, 24, 32, 48`). Cards pad `24px` on desktop and `16px` on a phone.
- **Corner radius**: `16px` for cards, `10px` for buttons and fields, `999px` for the recent city rows' remove button.
- **Buttons**: filled `--primary` with white text, `10px` radius, `12px 20px` padding, weight 600. Hover darkens to `--primary-hover`; focus shows a `2px` `--primary` ring with a `2px` offset; pressed scales to `0.98`; disabled is `#b9c6d4` with `not-allowed`.
- **Fields**: white background, `1px` `--border`, `10px` radius, `12px 14px` padding, `--text` text. Hover border `#b9c6d4`; focus border `--primary` with a `3px` `rgba(31,111,235,0.18)` ring; disabled background `#f2f6fa`.
- **Lists**: recent city rows are `--surface` cards with `1px` `--border`, `12px` radius, `12px 16px` padding, a `4px` gap between rows. Hover lifts the border to `--primary` and the background to `#f7faff`; the focused row shows the focus ring. The remove button is a small ghost button with `--text-muted` text that turns `--error` on hover.
- **Error banner**: `--error-bg` background, `1px` `--error` border, `--error` text, `12px` radius, `12px 16px` padding.

### Weather screen layout

- **Phone (below 768px)**: one column. The search field with its Search button full width at the top, then the error banner when there is one, then the current conditions card (city name, a large temperature, the conditions word, then humidity and wind as two labelled figures), then the 5-day forecast as a vertical list of rows (date, conditions, high and low), then the recent cities list.
- **Desktop (768px and up)**: a centred column of at most `960px`. The search field and Search button sit in one row at the top. Below it, a two-column grid: the current conditions card and the forecast card on the left (the forecast as 5 columns, one per day), and the recent cities list in a card on the right. The Refresh button and the time of the latest update sit in the current conditions card's header.

## Build and run
Install: npm install && pip install -r server/requirements.txt
Test: npm test && python -m pytest server/tests
Run locally: yes
Dev: npm run dev
Port variable: PORT
Health path: /api/health
Deploy: none

## Assumptions

- The Python API is FastAPI served by uvicorn, and the Angular app is built with the Angular CLI and served in development by its Vite dev server, which proxies `/api` to the API on `127.0.0.1:8000`.
- `npm run dev` starts both servers; the API's port is fixed at `8000` locally because the dev proxy targets it, and the page's port comes from `PORT`.
- The recent cities list is kept by the server in SQLite, so it is the same list for every browser on that machine.
- The server maps Open-Meteo's WMO weather codes to the six condition words `Clear`, `Cloudy`, `Rain`, `Snow`, `Fog` and `Thunderstorm`.
- The recent cities list shows each city's current temperature, fetched when the list is read; a city whose temperature cannot be fetched is still listed, without a temperature.
- The app has no sign-in and no accounts, so there are no test logins.
