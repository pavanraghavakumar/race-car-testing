# Requirements: 3D Car Racing Game

## Requirement 1: Account and sign-in

**User Story:** As a Player, I want to create an account and sign in with my email and password, so that my cars, progress and race history are kept for me.

_Source: E1, E2, A6, A7_

### Acceptance Criteria

1. WHEN the game starts with no Player signed in THE SYSTEM SHALL open the sign-in screen.
2. WHEN the Player submits a username, an email and a password of at least 8 characters THE SYSTEM SHALL create the account with the state registered, create the Player profile with level 1, 0 experience and 0 in-game currency, and sign the Player in.
3. IF the Player submits an email that an account already uses THEN THE SYSTEM SHALL show the message "An account with this email already exists" and create no account.
4. IF the Player submits a password shorter than 8 characters THEN THE SYSTEM SHALL show the message "Password must be at least 8 characters" and create no account.
5. WHEN the Player submits a registered email and its correct password THE SYSTEM SHALL sign the Player in and open the main menu.
6. IF the Player submits a wrong password THEN THE SYSTEM SHALL show the message "Email or password is incorrect" and sign no one in.
7. WHEN the Player signs in THE SYSTEM SHALL show the Player's display name, level, experience and in-game currency on the main menu.
8. IF the Player's account is suspended THEN THE SYSTEM SHALL show the message "This account is suspended" and sign no one in.
9. WHEN the Player asks to delete their account THE SYSTEM SHALL delete the account, its profile, car collection, race history, achievements and game progress within 30 days.
10. THE SYSTEM SHALL show no Player's email or password to any other Player.

## Requirement 2: Main menu

**User Story:** As a Player, I want a main menu that shows who I am and takes me to every mode, so that I can start what I want to play in one tap.

_Source: G3, E2, A8_

### Acceptance Criteria

1. WHEN the Player is signed in THE SYSTEM SHALL show the main menu with the Player's display name, level, experience bar and in-game currency, and the buttons Career, Time Trial, Multiplayer, Garage and Leaderboard.
2. WHEN the Player clicks Career THE SYSTEM SHALL open the career screen.
3. WHEN the Player clicks Time Trial THE SYSTEM SHALL open the time trial screen.
4. WHEN the Player clicks Multiplayer THE SYSTEM SHALL open the multiplayer screen.
5. WHEN the Player clicks Garage THE SYSTEM SHALL open the garage screen.
6. WHEN the Player clicks Leaderboard THE SYSTEM SHALL open the leaderboard screen.
7. WHEN the Player clicks Sign out THE SYSTEM SHALL sign the Player out and open the sign-in screen.
8. WHILE the Player has no internet connection THE SYSTEM SHALL show the Multiplayer button disabled with the label "Multiplayer needs a connection".
9. WHEN the Player clicks a button THE SYSTEM SHALL show the pressed state of that button within 100 milliseconds.
10. THE SYSTEM SHALL show every menu text at a contrast ratio of at least 4.5 to 1 against its background.

## Requirement 3: Race selection

**User Story:** As a Player, I want to choose a track and a car before a race, so that I race where and in what I want.

_Source: W1, E3, E6, F4, N2_

### Acceptance Criteria

1. WHEN the Player opens race selection THE SYSTEM SHALL list the 15 tracks with each track's name, length, environment and difficulty.
2. WHEN the Player selects a track THE SYSTEM SHALL show that track's preview and the Player's owned cars, with the car the Player last raced already selected.
3. WHEN the Player clicks Start race THE SYSTEM SHALL show a loading screen with a progress bar and start the race within 30 seconds.
4. IF the Player has no owned car THEN THE SYSTEM SHALL show the message "Win a race to earn your first car" and disable Start race.
5. WHEN the Player clicks Back THE SYSTEM SHALL return to the screen the Player came from.

## Requirement 4: Race

**User Story:** As a Player, I want to race with acceleration, braking, drifting and nitro against 7 AI opponents, so that I feel a realistic race.

_Source: W1, G1, G4, F3, A16, A17, N1_

### Acceptance Criteria

1. WHEN the race starts THE SYSTEM SHALL place the Player's car on the start line with 7 AI opponents, each with a difficulty from easy to hard.
2. WHILE the Player holds the accelerate control THE SYSTEM SHALL increase the car's speed up to its top speed.
3. WHILE the Player holds the brake control THE SYSTEM SHALL reduce the car's speed to 0.
4. WHEN the Player steers while the car's speed is above 60 km/h and holds the drift control THE SYSTEM SHALL make the car slide with its rear wheels losing grip and show a drift score.
5. WHEN the Player presses the nitro control with nitro available THE SYSTEM SHALL raise the car's top speed by 20% for 3 seconds and empty the nitro bar.
6. WHILE the nitro bar is empty THE SYSTEM SHALL refill it to full in 15 seconds of racing.
7. WHEN the Player's car touches a wall or another car THE SYSTEM SHALL stop the car from passing through it and reduce its speed by the force of the impact.
8. WHILE the race runs THE SYSTEM SHALL show the speedometer with the car's speed in km/h, the gear, the nitro bar and the lap counter as "Lap 2 of 3".
9. WHILE the race runs THE SYSTEM SHALL keep 120 frames per second on a mid-range phone from 2023 and on desktop.
10. WHILE the race runs THE SYSTEM SHALL show dynamic lighting and shadows, and a chase camera behind the Player's car that follows its turns.

## Requirement 5: Race results

**User Story:** As a Player, I want to see my position, time, best lap and rewards after a race, so that I know how I did and what I earned.

_Source: W1, E7, A12, A18_

### Acceptance Criteria

1. WHEN the Player's car crosses the finish line after the last lap THE SYSTEM SHALL show the race results screen.
2. WHEN the race results screen opens THE SYSTEM SHALL show the Player's position, total time, best lap time and the in-game currency earned.
3. WHEN the race results screen opens THE SYSTEM SHALL record the race in the Player's race history with the track, the car, its installed upgrades, the result, the time and the date.
4. WHEN the Player finishes in first place THE SYSTEM SHALL add the race's full reward to the Player's in-game currency and experience.
5. WHEN the Player finishes in second or third place THE SYSTEM SHALL add half of the race's reward to the Player's in-game currency and experience.
6. WHEN the Player finishes in fourth place or lower THE SYSTEM SHALL add a quarter of the race's reward to the Player's in-game currency and experience.
7. WHEN the Player's experience reaches the next level's threshold THE SYSTEM SHALL raise the Player's level by 1 and show the message "Level up".
8. WHEN the Player clicks Race again THE SYSTEM SHALL start the same track with the same car.
9. WHEN the Player clicks Main menu THE SYSTEM SHALL open the main menu.

## Requirement 6: Career mode

**User Story:** As a Player, I want a career of stages with races and rewards, so that I progress toward new cars and tracks.

_Source: W2, E9, E8, A18_

### Acceptance Criteria

1. WHEN the Player opens career mode THE SYSTEM SHALL list the career stages in order, with each stage's races and the Player's completed races marked.
2. WHEN the Player selects the next uncompleted race THE SYSTEM SHALL start that race on its track.
3. WHEN the Player wins a career race THE SYSTEM SHALL mark that race completed and unlock the next race in the stage.
4. WHEN the Player completes every race of a stage THE SYSTEM SHALL unlock the next stage and add the stage's reward car to the Player's car collection.
5. WHEN the Player completes every race of the last stage THE SYSTEM SHALL set the Player's game progress to completed and show the message "Career complete".
6. WHEN the Player unlocks a car or a track for the first time THE SYSTEM SHALL add it to the Player's game progress and show the message "New car unlocked" or "New track unlocked".
7. WHEN the Player wins a race that meets an achievement's condition THE SYSTEM SHALL unlock that achievement and show the message "Achievement unlocked".

## Requirement 7: Time trial

**User Story:** As a Player, I want to race alone against the clock, so that I can set my best lap time and compare it to the leaderboard.

_Source: W3, E7, A11_

### Acceptance Criteria

1. WHEN the Player opens time trial THE SYSTEM SHALL list the 15 tracks and the Player's owned cars.
2. WHEN the Player starts a time trial THE SYSTEM SHALL start the race on the chosen track with no AI opponents and show the lap timer.
3. WHEN the Player completes a lap THE SYSTEM SHALL show that lap's time and the Player's best lap time for the track.
4. WHEN the Player completes a lap faster than their best lap time for the track THE SYSTEM SHALL save it as the Player's best lap time for that track.
5. WHEN the Player finishes the time trial THE SYSTEM SHALL record it in the Player's race history and show the Player's best lap time and their rank on the track's leaderboard.

## Requirement 8: Multiplayer race

**User Story:** As a Player, I want to race up to 7 other Players online, so that I can compete against real people.

_Source: W4, BR2, BR3, A13, A6_

### Acceptance Criteria

1. WHEN the Player clicks Find race THE SYSTEM SHALL match the Player with other Players of the same car class and career level.
2. WHEN 8 Players are matched, or 30 seconds pass, whichever comes first THE SYSTEM SHALL start the race with the Players matched so far.
3. IF more than 8 Players try to join one race THEN THE SYSTEM SHALL match at most 8 of them into it.
4. WHEN the race starts THE SYSTEM SHALL let each Player choose a car from their own car collection.
5. WHEN a Player finishes a multiplayer race THE SYSTEM SHALL record the result in that Player's race history and show the results screen with every Player's position and time.
6. IF the Player has no internet connection THEN THE SYSTEM SHALL show the message "Multiplayer needs a connection" and start no match.
7. IF a Player's reported race result does not match the race the server ran THEN THE SYSTEM SHALL discard that result and record no race history for it.

## Requirement 9: Garage and customization

**User Story:** As a Player, I want to view my cars, install upgrades and customize them, so that my cars suit how I race.

_Source: W5, E3, E4, E5, BR1, A14, A20_

### Acceptance Criteria

1. WHEN the Player opens the garage THE SYSTEM SHALL list the Player's owned cars with each car's model, class and installed upgrade levels.
2. WHEN the Player selects a car THE SYSTEM SHALL show its base stats, its installed upgrades and its customization options.
3. WHEN the Player installs an upgrade THE SYSTEM SHALL raise that part's level by 1, raise the car's matching stat, and subtract the upgrade's cost from the Player's in-game currency.
4. IF the Player's in-game currency is less than the upgrade's cost THEN THE SYSTEM SHALL show the message "Not enough currency" and install no upgrade.
5. IF the upgrade's cost is more than the reward of 5 races at the Player's level THEN THE SYSTEM SHALL show the message "Upgrade cost too high" and install no upgrade.
6. WHEN the Player applies a paint colour or a decal THE SYSTEM SHALL save it to the car in the Player's car collection and show the car in that colour or decal.
7. WHEN the Player clicks Save changes THE SYSTEM SHALL save the car's upgrades and customization and show the message "Car saved".
8. IF the Player tries to add a car the Player does not own THEN THE SYSTEM SHALL show the message "Cars are earned by racing" and add no car.
9. IF the Player's car collection already holds 30 cars THEN THE SYSTEM SHALL show the message "Garage full" and add no car.

## Requirement 10: Leaderboard

**User Story:** As a Player, I want to see the top times for each track and my own rank, so that I know how I compare.

_Source: A11, W3, W1_

### Acceptance Criteria

1. WHEN the Player opens the leaderboard THE SYSTEM SHALL show the top 100 times for the selected track with each entry's rank, display name, car and time.
2. WHEN the Player selects another track THE SYSTEM SHALL show that track's top 100 times.
3. WHEN the Player has a recorded time on the selected track THE SYSTEM SHALL show the Player's own rank and time below the list.
4. WHEN a race result is recorded THE SYSTEM SHALL show it on the leaderboard within 1 minute.

## Requirement 11: Fair rewards and no forced ads

**User Story:** As a Player, I want to earn cars and upgrades by racing, with no forced ads and no pay-to-win, so that the game stays fair.

_Source: BR1, S1, S2, F5, F6, F7, A14_

### Acceptance Criteria

1. WHEN the Player wins a race THE SYSTEM SHALL add the race's reward to the Player's in-game currency and experience.
2. IF the Player tries to buy a car with in-game currency or real money THEN THE SYSTEM SHALL show the message "Cars are earned by racing" and add no car.
3. THE SYSTEM SHALL show no advertisement between a race's start and its results screen.
4. THE SYSTEM SHALL show no advertisement that the Player cannot close within 5 seconds.
5. WHEN the Player opens the garage THE SYSTEM SHALL show each upgrade's cost in in-game currency and the number of races that earn it.

## Requirement 12: Offline play

**User Story:** As a Player, I want single-player modes to work without a connection, so that I can race anywhere.

_Source: BR3, A10_

### Acceptance Criteria

1. WHILE the Player has no internet connection THE SYSTEM SHALL let the Player start a career race and a time trial.
2. WHILE the Player has no internet connection THE SYSTEM SHALL keep the Player's race history, car collection and game progress in the local SQLite database.
3. WHEN the connection returns THE SYSTEM SHALL send the races recorded offline to the server and show them on the leaderboard.

## Requirement 13: Records kept in SQLite

**User Story:** As a Player, I want my account, cars, upgrades, race history, achievements and progress kept, so that nothing I earn is lost.

_Source: F1, E1, E2, E3, E4, E5, E6, E7, E8, E9, A3, A20_

### Acceptance Criteria

1. THE SYSTEM SHALL keep user accounts, player profiles, cars, car collections, upgrades, tracks, race history, achievements and game progress in the SQLite database.
2. WHEN the Player signs in on another device THE SYSTEM SHALL show the same car collection, race history, achievements and game progress.
3. WHEN the Player finishes a race THE SYSTEM SHALL record it in the race history with the player, track, car, upgrades, result, time and date.
4. WHEN the Player unlocks an achievement THE SYSTEM SHALL change its state from locked to unlocked and keep it for the Player.
5. THE SYSTEM SHALL keep 200,000 race history records in year 1 and 2,000,000 in year 3.

## Requirement 14: Devices and performance

**User Story:** As a Player, I want the game to run smoothly on my phone and my computer, so that I can race on either.

_Source: F2, N1, N2, G4, A17_

### Acceptance Criteria

1. THE SYSTEM SHALL run on Android phones, iPhones, Windows and macOS computers.
2. WHILE a race runs on a mid-range phone from 2023 or on a desktop computer THE SYSTEM SHALL keep 120 frames per second.
3. WHEN the Player taps a track THE SYSTEM SHALL start the race within 30 seconds.
4. WHEN the game runs on a device that cannot keep 120 frames per second THE SYSTEM SHALL lower the graphics quality until it keeps 60 frames per second.

## Requirement 15: Support and recovery

**User Story:** As the on-call developer, I want alerts and a way to help Players, so that the game recovers quickly and Players get help.

_Source: A4, A5, A9_

### Acceptance Criteria

1. WHEN the game server stops answering for 1 minute THE SYSTEM SHALL alert the on-call developer.
2. WHEN support opens a Player's account THE SYSTEM SHALL show the Player's account and race history to support.
3. WHEN support resets a Player's password at the Player's request THE SYSTEM SHALL set a new password and sign the Player out of every device.
4. THE SYSTEM SHALL lose at most 15 minutes of race results and be back within 1 hour after a failure.

## Later releases

- None: every workflow of the brief is in release 1.

## Assumptions

- The game has two kinds of Player, casual Players who race a few times a week and committed Players who race daily and chase leaderboards (A1).
- About 10,000 Players are active in the first six months, with up to 2,000 racing at the busiest moment (A2).
- A race is run about 3 times a week by a casual Player and daily by a committed Player (A19).
- A Player regularly participates when they race at least 3 times a week and unlock at least 1 car a month (A15).
- The game is compared to Asphalt 9, Real Racing 3 and CarX Street: it copies their smooth arcade handling and quick race flow and avoids their pay-to-win upgrades and forced ads (A21, F7).
- The game responds to these events: a race finishes, a lap is completed, a Player levels up, an achievement unlocks, a multiplayer match is found, and a daily reward becomes available (A18).
- The likeliest ways the game fails are frame rate drops below 120 fps on older phones, multiplayer cheating that ruins leaderboards, and a launch with too few Players to fill 8-player races (A10).
- The game is in English at launch, shows times in the Player's local time zone, and meets WCAG 2.2 AA for menus, text and controls (A8).
- The game has 30 supercars and 15 tracks at launch (F4), and a Player's car collection holds up to 30 cars, each with up to 5 upgrade parts (A20).
- Each single-player race has 7 AI opponents, each with a difficulty from easy to hard (A16).
- A multiplayer race starts when 8 Players are matched or after 30 seconds, whichever comes first, and Players are matched by car class and career level (A13).
- An upgrade costs in-game currency earned from races, at most the reward of 5 races per level (A14).
- The leaderboard shows the top 100 times per track and the Player's own rank, refreshed within 1 minute (A11).
- The race results screen shows the Player's position, time, best lap and rewards, refreshed immediately after the race (A12).
- The game has no forced advertisements (S1), and no Player may see another Player's email or password (A6).
- The game keeps username, email and race history as personal data, asks for consent at sign-up, and deletes it within 30 days of a deletion request (A7).
