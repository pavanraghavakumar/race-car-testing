# Requirements: Weather App

## Requirement 1: Check the weather for a city

**User Story:** As a person checking the weather, I want to search for a city and see its current conditions and forecast, so that I know what the weather will be like there.
_Source: G1, F1, I1, Q1, Q2, Q4_

### Acceptance Criteria

1. WHEN the user opens the app at `/` THE SYSTEM SHALL show the weather screen with a search field for a city and the current conditions and forecast for the default city, London.
2. WHEN the user types a city name in the search field and presses Enter or clicks the Search button THE SYSTEM SHALL show the current conditions and forecast for that city.
3. WHEN the app shows a city's weather THE SYSTEM SHALL show the city name, the current temperature in degrees Celsius, the current conditions as a word such as Clear, Cloudy or Rain, the humidity as a percentage, and the wind speed in kilometres per hour.
4. WHEN the app shows a city's weather THE SYSTEM SHALL show a forecast of the next 5 days, each day with its date, its highest and lowest temperature in degrees Celsius, and its conditions as a word.
5. WHEN the user clicks a city in the recent cities list THE SYSTEM SHALL show the current conditions and forecast for that city.
6. IF the weather service cannot find the city the user searched for THEN THE SYSTEM SHALL show the message `City not found. Check the spelling and try again.` and keep the weather already on screen.
7. IF the weather service does not answer within 10 seconds THEN THE SYSTEM SHALL show the message `Weather data is unavailable right now. Try again.` and keep the weather already on screen.
8. WHEN the user clicks the Refresh button THE SYSTEM SHALL fetch the city's weather again and show the time of the latest update.

## Requirement 2: Keep the cities the user checked

**User Story:** As a person checking the weather, I want the cities I searched for to stay in a list, so that I can check them again without typing their names.
_Source: G1, S3, Q4_

### Acceptance Criteria

1. WHEN the user searches for a city that the weather service finds THE SYSTEM SHALL add that city to the recent cities list.
2. WHEN the app shows the recent cities list THE SYSTEM SHALL list the cities the user searched for, most recently searched first, each with its name and its current temperature in degrees Celsius.
3. WHEN the user opens the app again THE SYSTEM SHALL show the recent cities list saved from the last time the user used it.
4. WHEN the user clicks the remove button beside a city in the recent cities list THE SYSTEM SHALL remove that city from the list and keep the weather on screen.
5. IF the recent cities list is empty THEN THE SYSTEM SHALL show the message `No recent cities yet. Search for a city to add it.`
6. WHEN the user searches for a city that is already in the recent cities list THE SYSTEM SHALL move that city to the top of the list without adding it twice.

## Assumptions

- The weather data comes from Open-Meteo, a public weather service that needs no API key, called by the Python server.
- The app opens on London's weather, so the first screen is never empty.
- The recent cities list holds at most 10 cities, and the oldest is dropped when an 11th is added.
- The app shows temperatures in degrees Celsius and wind speed in kilometres per hour, with no unit switch.
- The forecast covers the next 5 days, today included.
- The app keeps no history of past weather, as the brief rules out.

## Later releases

- S4 The app shows live data only; it keeps no history of past weather.
