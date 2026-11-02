# Requirements: Weather App

## Requirement 1: Saved places list

**User Story:** As a Person using the app, I want to see the places I have saved and add a new one, so that I can check the weather for any of them with one tap.

_Source: W1, E1, BR1, S1_

### Acceptance Criteria

1. WHEN the person opens the app THE SYSTEM SHALL show the list of saved places, each row showing the place name and its location.
2. WHEN the person taps the add button THE SYSTEM SHALL show a search field where the person types a place name.
3. WHEN the person types at least 2 characters in the search field THE SYSTEM SHALL show the matching places from the public weather service, each with its name and location.
4. WHEN the person taps a place in the search results THE SYSTEM SHALL add it to the saved places list and close the search.
5. IF the place the person taps is already in the saved places list THEN THE SYSTEM SHALL keep the one already saved and show the list with one row for that place.
6. WHEN the person swipes a saved place to the left and taps Delete THE SYSTEM SHALL remove that place from the saved places list.
7. WHEN the person taps a saved place in the list THE SYSTEM SHALL open the weather screen for that place.
8. IF the saved places list is empty THEN THE SYSTEM SHALL show a message that no places are saved yet and a button that opens the search field.
9. IF the public weather service does not answer the search THEN THE SYSTEM SHALL show the message "Could not search places. Check your connection and try again." and keep the search field open.

## Requirement 2: Current conditions and forecast for a saved place

**User Story:** As a Person using the app, I want to see the current conditions and the forecast for a saved place, so that I know what the weather will be like there.

_Source: W1, F2, S1, N1_

### Acceptance Criteria

1. WHEN the person taps a saved place THE SYSTEM SHALL show the weather screen for that place with its place name at the top.
2. WHEN the weather screen opens THE SYSTEM SHALL show the current conditions: the temperature in Celsius, the condition (such as Clear, Cloudy or Rain), the feels-like temperature in Celsius, the humidity as a percentage and the wind speed in km/h.
3. WHEN the weather screen opens THE SYSTEM SHALL show the forecast for the next 5 days, each day with its date, its high and low temperature in Celsius and its condition.
4. WHILE the weather screen is loading THE SYSTEM SHALL show a loading indicator in place of the current conditions and the forecast.
5. WHEN the person taps the back button THE SYSTEM SHALL return to the saved places list.
6. WHEN the person taps a saved place THE SYSTEM SHALL show that place's current conditions and forecast within 3 seconds.
7. WHEN the person pulls the weather screen down THE SYSTEM SHALL fetch the weather for that place again and show the updated current conditions and forecast.

## Requirement 3: Last weather when the service cannot be reached

**User Story:** As a Person using the app, I want to see the last weather I saw for a place when the weather service cannot be reached, so that I still have some information about that place.

_Source: W1, X1, A2, N2_

### Acceptance Criteria

1. IF the public weather service does not answer or returns an error THEN THE SYSTEM SHALL show the last current conditions and forecast it fetched for that place, with the message "Showing the last weather saved. Could not reach the weather service." and the time it was fetched.
2. IF the public weather service does not answer or returns an error and the app has no weather saved for that place THEN THE SYSTEM SHALL show the message "Could not load the weather. Check your connection and try again." and a Try again button.
3. WHEN the person taps Try again THE SYSTEM SHALL fetch the weather for that place again.
4. WHEN the weather screen shows the last weather saved THE SYSTEM SHALL keep the saved places list and the weather screen usable while the weather service is unreachable.
5. WHILE the app is open THE SYSTEM SHALL answer every tap on a saved place, the back button and the add button within 1 second, whether or not the weather service answers.
6. WHILE the weather service is unreachable THE SYSTEM SHALL keep the saved places list and the weather screen open and usable for at least 99% of the minutes in a month, showing the last weather saved or the message with the Try again button.

## Assumptions

- The app is in English and shows temperatures in Celsius, as A3 states.
- The forecast covers the next 5 days, one row per day, since the brief names a forecast but no length.
- The person deletes a saved place by swiping its row to the left and tapping Delete, the gesture people know from list apps on a phone.
- The app keeps the last weather it fetched for each saved place on the phone, so it can show it when the weather service cannot be reached.
- The app opens on the saved places list, since the person never signs in (R1) and W1 starts there.
- The app has no sign-in and no accounts, as A1 and S2 state.
