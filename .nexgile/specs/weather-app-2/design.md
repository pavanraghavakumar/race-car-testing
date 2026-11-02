# Design: Weather App

## Overview

The Weather App is a small mobile app for one Person using the app, who never signs in. It opens on the list of saved places; tapping a saved place opens the weather screen for that place, which shows the current conditions and the forecast for the next 5 days. The weather comes from a public weather service, reached through a small Node.js service so the weather service's key stays off the phone and the app can cache the last weather it fetched.

The app is built with React Native (Expo) for the phone and a small Node.js service (Express, TypeScript) for the weather data. The app keeps the saved places and the last weather it fetched for each place on the phone, so both survive the app being closed and the weather service being unreachable.

## Architecture

Two parts, in one repository:

- **`app/`** — the React Native app, run with Expo. It holds the screens, the saved places list, the last weather saved for each place, and the calls to the service.
- **`server/`** — the small Node.js service. It holds the weather service's key, calls the public weather service (Open-Meteo, which needs no key, and its geocoding search), and answers the app with the shapes below.

```
Phone (Expo / React Native)
  Saved places list ──tap──▶ Weather screen
        │                        │
        │ AsyncStorage           │ fetch
        ▼                        ▼
  saved places, last weather   Node.js service  ──▶  Open-Meteo (geocoding + forecast)
```

The app never calls the public weather service directly. Every request goes to the Node.js service, which is the only part that knows the weather service's address.

## Components and Interfaces

### The Node.js service

Base path: `/api`. Every answer is JSON. The service listens on the port in `process.env.PORT` (default `4000`) on `127.0.0.1`.

#### `GET /api/health`

Answers `200` with `{ "status": "ok" }`.

#### `GET /api/places?q=<text>`

Searches places by name. `q` is the text the person typed (at least 2 characters).

Answer `200`:

```json
{
  "places": [
    {
      "id": "3117735",
      "name": "Madrid",
      "location": "Community of Madrid, Spain",
      "latitude": 40.4165,
      "longitude": -3.70256
    }
  ]
}
```

- `id` — the weather service's place id, a string. Two results with the same `id` are the same place.
- `name` — the place name.
- `location` — the region and country, shown under the name.
- `latitude`, `longitude` — numbers, used by the weather request.

Answer `400` with `{ "error": "query_too_short" }` when `q` is missing or shorter than 2 characters.

Answer `502` with `{ "error": "weather_service_unavailable" }` when the public weather service does not answer or returns an error.

#### `GET /api/weather?lat=<number>&lon=<number>&name=<text>`

Answers the current conditions and the forecast for one place.

Answer `200`:

```json
{
  "place": { "name": "Madrid", "location": "Community of Madrid, Spain" },
  "fetchedAt": "2026-11-02T13:30:00.000Z",
  "current": {
    "temperatureC": 14,
    "feelsLikeC": 12,
    "condition": "Cloudy",
    "humidityPercent": 68,
    "windKph": 11
  },
  "forecast": [
    { "date": "2026-11-03", "highC": 17, "lowC": 8, "condition": "Rain" },
    { "date": "2026-11-04", "highC": 16, "lowC": 7, "condition": "Cloudy" },
    { "date": "2026-11-05", "highC": 18, "lowC": 9, "condition": "Clear" },
    { "date": "2026-11-06", "highC": 19, "lowC": 10, "condition": "Clear" },
    { "date": "2026-11-07", "highC": 15, "lowC": 8, "condition": "Rain" }
  ]
}
```

- `fetchedAt` — an ISO 8601 time, the moment the service fetched the weather. The app shows it as the time the last weather was fetched.
- `current.temperatureC`, `current.feelsLikeC` — whole degrees Celsius.
- `current.condition` — one of `Clear`, `Partly cloudy`, `Cloudy`, `Fog`, `Rain`, `Snow`, `Thunderstorm`.
- `current.humidityPercent` — a whole percentage.
- `current.windKph` — a whole number of km/h.
- `forecast` — exactly 5 entries, the next 5 days starting tomorrow, each `date` as `YYYY-MM-DD`, `highC` and `lowC` whole degrees Celsius, `condition` as above.

Answer `400` with `{ "error": "invalid_coordinates" }` when `lat` or `lon` is missing or not a number.

Answer `502` with `{ "error": "weather_service_unavailable" }` when the public weather service does not answer or returns an error.

The service maps the weather service's WMO weather codes to the `condition` words above: `0` → `Clear`; `1`, `2` → `Partly cloudy`; `3` → `Cloudy`; `45`, `48` → `Fog`; `51`–`67`, `80`–`82` → `Rain`; `71`–`77`, `85`, `86` → `Snow`; `95`–`99` → `Thunderstorm`.

### The app

#### Saved places storage

The app keeps its data in the phone's own storage with `@react-native-async-storage/async-storage`, under these keys:

- `weather-app:savedPlaces` — a JSON array of saved places, each `{ id, name, location, latitude, longitude }`, in the order the person saved them.
- `weather-app:lastWeather:<id>` — the last weather the app fetched for the place with that `id`, exactly the `200` answer of `GET /api/weather` as it arrived.

A saved place is added only when no saved place has the same `id` (BR1). Deleting a saved place removes its row and its `weather-app:lastWeather:<id>` entry.

#### Service address

The app reads the service's address from `EXPO_PUBLIC_API_URL` (for example `http://127.0.0.1:4000`). `.env.example` names it.

#### Screens

- **Saved places list** (`app/app/index.tsx`) — the app's first screen. A header with the title "Weather" and an add button (`+`). The list of saved places, each row showing the place name and its location, with a chevron. Swiping a row to the left reveals a red Delete button. An empty state with the message "No places saved yet." and a button "Add a place". Tapping a row opens the weather screen for that place; tapping the add button opens the search screen.
- **Search places** (`app/app/search.tsx`) — a search field at the top with a Cancel button, focused when the screen opens. Below it, the matching places, each with its name and location. Tapping a result saves the place and returns to the list. The message "Could not search places. Check your connection and try again." appears under the field when the search fails, and the field stays open.
- **Weather screen** (`app/app/place/[id].tsx`) — a back button and the place name at the top. The current conditions block: the temperature in large type, the condition, and a row of feels-like, humidity and wind. Below it, the 5-day forecast, one row per day with the date, the condition, and the high and low. Pulling the screen down fetches again. While loading, a loading indicator stands in place of the current conditions and the forecast. When the service cannot be reached and the app has the last weather for the place, the last weather is shown with the banner "Showing the last weather saved. Could not reach the weather service." and the time it was fetched. When the service cannot be reached and the app has nothing saved for the place, the message "Could not load the weather. Check your connection and try again." and a Try again button are shown.

#### Navigation

Expo Router, with a stack: `index` (saved places list) → `search` (modal) and `place/[id]` (weather screen). The back button on the weather screen and Cancel on the search screen return to the list.

## Data Models

### Saved place (on the phone)

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | the weather service's place id; unique in the list |
| `name` | string | the place name |
| `location` | string | region and country |
| `latitude` | number | |
| `longitude` | number | |

### Last weather (on the phone, one per saved place)

The `200` answer of `GET /api/weather`, stored as it arrived: `place`, `fetchedAt`, `current`, `forecast`.

The service keeps no data of its own: it holds no database and stores nothing between requests.

## Error Handling

- **Search fails** — the app shows "Could not search places. Check your connection and try again." under the search field and keeps the field open (1.9).
- **Weather fails, last weather saved** — the app shows the last weather for the place with the banner "Showing the last weather saved. Could not reach the weather service." and the time it was fetched (3.1).
- **Weather fails, nothing saved** — the app shows "Could not load the weather. Check your connection and try again." and a Try again button, which fetches again (3.2, 3.3).
- **Weather request times out** — the app gives up after 10 seconds and treats it as the service not answering.
- **The service cannot reach the public weather service** — it answers `502` with `{ "error": "weather_service_unavailable" }`, which the app treats as the service not answering.
- **Taps stay responsive** — the list, the back button and the add button never wait on a request: a request runs beside the screen, so every tap is answered within 1 second (3.5), and the list and the weather screen stay usable while the service is unreachable (3.4, 3.6).

## Look and feel

A clean, modern weather app: a soft blue sky gradient behind the content, white cards with generous rounding, and one accent colour for the main actions.

- **Colours** — background `#EAF2FB`; surface `#FFFFFF`; text `#0F1E33`; muted text `#5B6B80`; primary `#1E6FD9`; primary pressed `#1757AB`; error `#C62828`; success `#2E7D32`; border `#D6E2F0`.
- **Font** — the system font (SF Pro on iOS, Roboto on Android), sizes: 34 for the current temperature, 22 for screen titles, 17 for body and rows, 13 for captions and the fetched time.
- **Spacing** — a 4-point scale: 4, 8, 12, 16, 24, 32. Screen padding 16.
- **Corner radius** — 16 for cards, 12 for buttons and fields, 8 for small chips.
- **Buttons** — primary: filled `#1E6FD9`, white 17-point label, radius 12, height 48; hover (web preview) `#1757AB`; pressed `#1757AB` with 0.9 opacity; focused a 2-point `#1E6FD9` ring with 2-point offset; disabled `#D6E2F0` with `#5B6B80` label. Secondary (Cancel, Try again): white with a `#D6E2F0` border and `#1E6FD9` label.
- **Fields** — white, radius 12, 1-point `#D6E2F0` border, 16 padding, 17-point text; focused border `#1E6FD9`; placeholder `#5B6B80`.
- **Lists** — rows on white cards, 16 padding, a 1-point `#D6E2F0` divider between rows, the place name in 17-point `#0F1E33` and the location in 13-point `#5B6B80`; pressed row `#EAF2FB`; the swipe-to-delete action a `#C62828` block with a white "Delete" label.
- **Weather screen** — the current conditions on a card with the temperature in 34-point bold, the condition in 17-point, and a row of three small blocks (feels like, humidity, wind) with 13-point captions; the forecast as a card of 5 rows, each with the date on the left, the condition in the middle and "high° / low°" on the right.
- **Banner** — the last-weather banner a `#FFF4E5` block with `#0F1E33` text and a 13-point fetched time.

### Layout on a phone

- **Saved places list** — a header row (title left, round add button right), then the list filling the screen, one row per place. The empty state is centred: a large cloud glyph, the message, then the "Add a place" button.
- **Search places** — the search field and Cancel in one row at the top, the results as a list below, each row a place name with its location underneath.
- **Weather screen** — the back button and place name in a header row; the current conditions card; the forecast card below it; the content scrolls, and pulling down fetches again.

### Layout on a desktop (web preview)

The same screens, centred in a column at most 480 points wide on the `#EAF2FB` background, so the phone layout is kept. The saved places list and the weather screen sit side by side when the window is at least 900 points wide: the list on the left at 320 points, the weather screen on the right.

## Testing Strategy

- **The service** — `node --test` with `tsx`, calling the Express app in-process with `supertest` and a stubbed weather service client, so no test needs the network: the search answer, the weather answer, the 5-day forecast, the condition mapping, and the `400` and `502` answers.
- **The app** — `jest-expo` with `@testing-library/react-native`, rendering each screen with the service client mocked and AsyncStorage mocked: the saved places list, adding a place, the duplicate rule, deleting a place, the weather screen's current conditions and forecast, the loading state, the last-weather banner, the error message with Try again, and the search error message.
- **End to end** — `@playwright/test` in `e2e/` for the web preview of the app, run only through `run_journeys`.

## Build and run
Install: npm install
Test: npm test
Run locally: no
Deploy: expo-and-cloud-host

## Assumptions

- The public weather service is Open-Meteo (geocoding search and forecast), which needs no key; the service still holds its address so the app never calls it directly.
- The app's service address is read from `EXPO_PUBLIC_API_URL`, named in `.env.example`.
- The forecast is the next 5 days starting tomorrow, one row per day.
- The app stores its data with `@react-native-async-storage/async-storage`, the storage people know from Expo apps.
- The app is in English and shows temperatures in Celsius, as A3 states.
- The app has no sign-in and no accounts, as A1 and S2 state.
