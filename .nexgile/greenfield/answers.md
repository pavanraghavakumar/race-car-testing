# Requirements brief — 3D Car Racing Game
## Profile
A 3D car racing game for players on mobile and desktop, with supercars, tracks, AI opponents, career mode, time trials, multiplayer and a garage, backed by SQLite for accounts and progress. · game · racing video game · size: business · depth: standard · personalData, publicUsers
- **Has a user interface?** Yes (The description names menus, a garage, a speedometer, a lap counter and results screens.)
- **Runs locally?** Yes (The game serves its menus and races on the player's machine, with SQLite kept locally and a stand-in for the multiplayer server.)
## The app
A 3D car racing game for mobile and desktop where players race supercars on 15 tracks against AI or up to 8 players online, earn cars and upgrades by racing, and progress through career mode and time trials. It keeps accounts, car collections, race history, achievements and progress in SQLite, and targets 120 fps with no forced ads and no pay-to-win.
## Goals and success
- G1 Build a realistic 3D car racing game with high-quality graphics, realistic physics, engine sounds, drifting, acceleration, braking and nitro boost. (description)
- G2 Offer multiple supercars, customizable vehicles, different tracks, challenging AI opponents, career mode, time trials and multiplayer racing. (description)
- G3 Provide an attractive gaming UI with a main menu, garage, car selection, race selection, speedometer, lap counter, leaderboard and race results. (description)
- G4 Deliver smooth, responsive gameplay with realistic environments, dynamic lighting, camera angles, collision detection and optimized performance on mobile and desktop. (description)
- M1 Reach 10,000 active players within the first 6 months of launch. (10,000 active players by month 6) (Q6)
- M2 Achieve at least 30% player retention. (30% retention) (Q6)
- M3 Receive positive user ratings of 4.5/5. (4.5/5 average rating) (Q6)
- M4 Have players regularly participate in races, unlock cars and enjoy the realistic racing experience. (regular participation in races and car unlocks) (Q6)
## Roles
- R1 Player (description)
## Workflows
### W1 Race (release 1) — actors: R1 Player; trigger: Player selects a race from race selection; outcome: Race result recorded and leaderboard updated (description)
1. Choose track and car
2. Start race
3. Race with acceleration, braking, drifting and nitro
4. Lap counter tracks laps
5. Finish race
6. See race results
- 
### W2 Career mode (release 1) — actors: R1 Player; trigger: Player enters career mode; outcome: Career progress advanced (description)
1. View career stages
2. Select next race
3. Race and win
4. Earn rewards and progress
- 
### W3 Time trial (release 1) — actors: R1 Player; trigger: Player selects time trial; outcome: Best time recorded (description)
1. Choose track and car
2. Race alone against the clock
3. Record lap time
4. Compare to leaderboard
- 
### W4 Multiplayer race (release 1) — actors: R1 Player; trigger: Player joins a multiplayer race; outcome: Multiplayer result recorded (description)
1. Match with other players
2. Choose car
3. Race together
4. See results
- 
### W5 Garage and customization (release 1) — actors: R1 Player; trigger: Player opens garage; outcome: Car updated (description)
1. View owned cars
2. Select car
3. Apply upgrades or customization
4. Save changes
- 
## Records
- E1 User account. fields: username, password, email; states: registered → active → suspended; owner: R1 (description)
- E2 Player profile. fields: display name, level, experience, currency; states: active; owner: R1 (description)
- E3 Car. fields: model, class, base stats, price; states: available → owned; owner: R1 (description)
- E4 Car collection. fields: player, car, upgrades, customization; states: owned; owner: R1 (description)
- E5 Upgrade. fields: car, part, level, cost; states: available → installed; owner: R1 (description)
- E6 Track. fields: name, length, environment, difficulty; states: available; owner: R1 (description)
- E7 Race history. fields: player, track, car, upgrades, result, time, date; states: recorded; owner: R1 (description, Q1)
- E8 Achievement. fields: name, description, condition; states: locked → unlocked; owner: R1 (description)
- E9 Game progress. fields: player, career stage, unlocked tracks, unlocked cars; states: in progress → completed; owner: R1 (description)
## Rules
- BR1 New cars and upgrades are earned by racing only; they are never bought with in-game currency or real money.. Applies: A player wants a new supercar: they unlock it by winning races and earning rewards.. Does not apply: A player with in-game currency cannot use it to buy a car; the car is still earned by racing. (Q2)
- BR2 A multiplayer race holds up to 8 players.. Applies: Nine players try to join one race: at most 8 are matched into it.. Does not apply: A single-player race has no player limit from this rule. (Q3)
- BR3 With no internet connection, single-player modes work and multiplayer does not.. Applies: A player offline can start a career race or time trial.. Does not apply: A player offline cannot join a multiplayer race. (Q4)
## Quality targets
- N1 [performance] The game must keep 120 frames per second during a race on the phones and computers players use.: 120 frames per second (Q9)
- N2 [performance] Loading a race, from tapping a track to driving, may take at most 30 seconds.: 30 seconds (Q10)
## Scope and constraints
- S2 Fair rewards and affordable upgrades. [constraint] (Q8)
## Decisions
- **Stack:** Unity with C# and SQLite (decided by Greenfield; suggested: Unity ships 3D racing physics, mobile and desktop builds, and SQLite support in one toolchain, which fits the 120 fps target and the launch on both device types.) (Q12)
- **Deploy target:** Mobile app stores and Steam, with a cloud game server (decided by Greenfield; suggested: The game must run well on mobile and desktop, and multiplayer needs a server that is always on.) (Q13)
## Assumptions
- A1 The game has two kinds of player: casual players who race a few times a week, and committed players who race daily and chase leaderboards. — The description names only 'players', but a racing game with career mode and leaderboards serves both. [assumed] (assumption, description)
- A2 About 10,000 players are active in the first six months, with up to 2,000 racing at the busiest moment (evenings and weekends). — The success measure names 10,000 active players; the busiest moment is needed to size multiplayer and servers.; high impact; confirmed by the user [assumed] (assumption)
- A3 Year 1 holds about 10,000 player accounts and 200,000 race history records; year 3 holds about 50,000 accounts and 2,000,000 race records. — Race history grows with every race, so storage and query speed must be sized.; high impact; confirmed by the user [assumed] (assumption)
- A4 An hour of outage at peak costs about 2,000 players their race and a day of leaderboard progress; maintenance happens in a weekly window of at most 30 minutes at 03:00 UTC. — Multiplayer and leaderboards need a recovery target; the cost of downtime shapes hosting.; high impact; confirmed by the user [assumed] (assumption)
- A5 At most 15 minutes of race results may be lost (RPO) and the game must be back within 1 hour (RTO). — Race history and leaderboards are the records players care about; these targets set backups.; high impact; confirmed by the user [assumed] (assumption)
- A6 Players sign in with an email and password; the worst misuse is cheating in multiplayer and leaderboards by tampering with race results, and no player may ever see another player's email or password. — Accounts exist and multiplayer is competitive, so sign-in and anti-cheat are needed.; high impact; confirmed by the user [assumed] (assumption)
- A7 The game holds username, email and race history as personal data; players are in the EU and US, GDPR and CCPA apply, data is kept while the account is active and deleted within 30 days of a deletion request, and consent is asked at sign-up. — Accounts and emails are personal data, and the success measure implies public users in several countries.; high impact; confirmed by the user [assumed] (assumption)
- A8 The game meets WCAG 2.2 AA where it can (menus, text, controls), is in English at launch with more languages later, and shows times in the player's local time zone. — Public users on mobile and desktop expect readable menus and their own time zone. [assumed] (assumption)
- A9 When the game breaks, the on-call developer is alerted by the hosting monitor; support can see a player's account and race history to help, and can reset a password on the player's request. — A live multiplayer game needs someone to fix it and a way to help players. [assumed] (assumption)
- A10 The likeliest ways the game fails are: frame rate drops below 120 fps on older phones, multiplayer cheating ruins leaderboards, and the launch has too few players to fill 8-player races. — These follow from the performance target, the multiplayer rule and the launch measure.; high impact; confirmed by the user [assumed] (assumption)
- A11 The leaderboard report shows the top 100 times per track and the player's own rank, refreshed within 1 minute, read by players after a race. — The description names a leaderboard; its freshness and readers must be set. [assumed] (assumption)
- A12 The race results screen shows the player's position, time, best lap and rewards, refreshed immediately after the race, read by the player. — The description names race results; the decision it supports is what to do next. [assumed] (assumption)
- A13 A multiplayer race starts when 8 players are matched or after 30 seconds, whichever comes first; players are matched by car class and career level. — The rule caps a race at 8 players; matching and a wait limit make races start.; high impact; confirmed by the user [assumed] (assumption)
- A14 An upgrade costs in-game currency earned from races, at most the reward of 5 races per level, so upgrades stay affordable. — The scope says affordable upgrades and fair rewards; a ratio makes it testable.; high impact; confirmed by the user [assumed] (assumption)
- A15 A player regularly participates when they race at least 3 times a week and unlock at least 1 car a month. — The success measure says 'regularly participate'; a number makes it measurable. [assumed] (assumption)
- A16 Each race has 7 AI opponents in single-player, and each AI opponent has a difficulty level from easy to hard. — The description says challenging AI opponents; the count and levels shape the race. [assumed] (assumption)
- A17 High-quality graphics means the game runs at 120 fps with dynamic lighting and shadows on a mid-range phone from 2023 and on desktop. — The frame rate target is set; the device class makes it testable.; high impact; confirmed by the user [assumed] (assumption)
- A18 The game responds to these events: a race finishes, a lap is completed, a player levels up, an achievement unlocks, a multiplayer match is found, and a daily reward becomes available. — The app must respond to race and progression events; timed events like daily rewards are common in racing games. [assumed] (assumption)
- A19 A race is run about 3 times a week by a casual player and daily by a committed player. — Workflow frequency is needed to size servers and leaderboards. [assumed] (assumption)
- A20 A player's car collection holds up to 30 cars, each with up to 5 upgrade parts. — The record volume is needed for storage and the garage screen. [assumed] (assumption)
- A21 The game is compared to Asphalt 9, Real Racing 3 and CarX Street: copy their smooth arcade handling and quick race flow, avoid their pay-to-win upgrades and forced ads. — Players already named these games and their frustrations, so the comparison is grounded in what they know. [assumed] (assumption, Q11)
## Other facts
- F1 The game uses SQLite as the database to store user accounts, player profiles, car collections, upgrades, race history, achievements and game progress. [stack] (description)
- F2 The game must run well on both mobile and desktop at launch. [devices] (description, Q5)
- F3 The game includes realistic environments, dynamic lighting, camera angles and collision detection. [performance] (description)
- F4 At launch the game has 30 supercars and 15 tracks. [scope] (Q7)
- F5 Players today play Asphalt 9, Real Racing 3, Need for Speed and CarX Street, and are frustrated by excessive in-app purchases, expensive upgrades, unrealistic physics, repetitive tracks, difficult controls, frequent ads and pay-to-win features. [current] (Q8)
- F6 The game will focus on realistic driving physics, smooth controls, high-quality graphics, exciting tracks, fair rewards, affordable upgrades and an enjoyable racing experience without forced advertisements. [current] (Q8)
- F7 The closest products are Asphalt 9, Real Racing 3 and CarX Street: copy their smooth arcade handling and quick race flow, avoid their pay-to-win upgrades and forced ads. [similar] (Q11, Q8)
## Out of scope and later releases
- S1 No forced advertisements in the game. [out of scope] (Q8)
## The interview
- Q1 [entities · owner] When a player finishes a race, what should the game record about it? → Result, time, car used and upgrades
- Q2 [money · owner] How should players get new cars and upgrades? → Earned by racing only
- Q3 [scale · owner] How many players race together in one multiplayer race? → Up to 8
- Q4 [devices · owner] What must the game do when a player has no internet connection? → Single-player modes work, multiplayer does not
- Q5 [devices · owner] Which devices must the game run well on at launch? → Both mobile and desktop
- Q6 [success · owner] When the racing game has been live for a while, what number would tell you it is doing well? → Success means reaching 10,000 active players within the first 6 months, achieving at least 30% player retention, receiving positive user ratings of 4.5/5, and having players regularly participate in races, unlock cars, and enjoy the realistic racing experience
- Q7 [scope · operations] How many supercars and how many tracks should the game have at launch? → 30 cars, 15 tracks
- Q8 [current · operations] What racing games do your players play today, and what do they find frustrating about them? → Players currently enjoy popular racing games like Asphalt 9, Real Racing 3, Need for Speed, and CarX Street. However, they often get frustrated with excessive in-app purchases, expensive car upgrades, unrealistic car physics, repetitive tracks, difficult controls, frequent ads, and pay-to-win features. Our game will focus on realistic driving physics, smooth controls, high-quality graphics, exciting tracks, fair rewards, affordable upgrades, and an enjoyable racing experience without forced advertisements.
- Q9 [performance · role:R1] On the phones and computers players use, what frame rate must the game keep during a race? → 120 frames per second
- Q10 [performance · role:R1] From tapping a track to driving, how many seconds may loading a race take at most? → 30 seconds
- Q11 [similar · owner] Which racing games do you want this one to be compared to, and what should it copy or avoid from each? → Decide for me (settled: The game is compared to Asphalt 9, Real Racing 3 and CarX Street: copy their smooth arcade handling and quick race flow, avoid their pay-to-win upgrades and forced ads.)
## Decided by Greenfield (Enough, decide the rest)
- Q12 Which stack should the game be built with? → Decide for me (settled: Unity with C# and SQLite)
- Q13 Where should the game and its multiplayer server be deployed? → Decide for me (settled: Mobile app stores and Steam, with a cloud game server)
