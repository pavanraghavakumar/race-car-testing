# Requirements: Project & Team Collaboration Portal

## Assumptions

- The sign-in page at `/` is the app's start; a signed-in person who opens `/` is taken to the first screen of their role.
- A person invited by an Organization admin signs in with the username and password the Organization admin sets for them when inviting them.
- The company login provider is Microsoft Entra ID or Google Workspace, as `answers.md` assumes; the first release signs people in with a username and password and shows the company login button.
- A Team member sees the projects they are on; a Project manager sees the projects they own or are on; an Organization admin sees every project of the organization.
- The first release keeps the AI-assisted planning of W5 for a later release, as `answers.md` says.
- The portal is in English, shows dates in the user's locale and times in the user's time zone, and does not work offline.

## Requirement 1: Sign in to an organization

**User Story:** As a person in an organization, I want to sign in with my company login or my username and password, so that I reach the work of my organization and nobody else's.

_Source: F3, F4, A17, A24, A27, N2_

### Acceptance Criteria

1. WHEN the user opens `/` THE SYSTEM SHALL show the sign-in page with a company login button, a username field, a password field and a sign-in button.
2. WHEN the user submits a username and password that match an account of an active organization THE SYSTEM SHALL open the first screen of that account's role: the Organization dashboard for an Organization admin, the Project dashboard for a Project manager, and My work for a Team member.
3. IF the username and password do not match an account THEN THE SYSTEM SHALL keep the sign-in page open and show the message "The username or password is not correct."
4. WHEN the user clicks the company login button and the company login provider confirms the account THE SYSTEM SHALL open the first screen of that account's role.
5. IF the company login provider does not answer within 10 seconds THEN THE SYSTEM SHALL show the message "The company login is not available. Sign in with your username and password." and keep the username and password fields usable.
6. WHILE the user is signed in THE SYSTEM SHALL show the user's name and role in the header of every screen, with a sign-out button.
7. WHEN the user clicks the sign-out button THE SYSTEM SHALL close the session and open the sign-in page at `/`.
8. IF a signed-out person opens any screen other than the sign-in page THEN THE SYSTEM SHALL open the sign-in page at `/`.
9. IF a signed-in user opens a screen their role may not see THEN THE SYSTEM SHALL show the message "You do not have access to this page." and keep the user signed in.
10. THE SYSTEM SHALL keep every organization's projects, tasks, teams, comments, files and time entries apart, so that no person sees a record of another organization.

## Requirement 2: Organization dashboard

**User Story:** As an Organization admin, I want a dashboard of my organization's projects, teams and people, so that I see the state of the organization in one place.

_Source: G2, R1, E1, E3, RP1, RP3, A11, A15, N1_

### Acceptance Criteria

1. WHEN an Organization admin signs in THE SYSTEM SHALL open the Organization dashboard, which shows the count of active projects, the count of teams, the count of people and the count of tasks that are overdue in the organization.
2. WHEN the Organization dashboard opens THE SYSTEM SHALL show a list of the organization's projects with each project's name, owner, status and due date, and a list of the organization's teams with each team's name, lead and number of members.
3. WHEN the user clicks a project in the list THE SYSTEM SHALL open that project's page.
4. WHEN the user clicks a team in the list THE SYSTEM SHALL open that team's page.
5. WHEN the user clicks the "New project" button THE SYSTEM SHALL open the new project form.
6. WHEN the user clicks the "New team" button THE SYSTEM SHALL open the new team form.
7. WHEN the user clicks the "People" link THE SYSTEM SHALL open the People page.
8. WHEN the user clicks the "Reports" link THE SYSTEM SHALL open the Reports page.
9. WHILE the Organization dashboard is open THE SYSTEM SHALL show its counts and lists within 2 seconds of the request.
10. WHEN the user opens the Organization dashboard on a phone THE SYSTEM SHALL show the counts in a single column and the project and team lists one below the other.

## Requirement 3: Projects

**User Story:** As an Organization admin or a Project manager, I want to create projects and keep their details, so that the work of the organization is organized under projects.

_Source: W1, E1, R1, R2, A8, A15, N2_

### Acceptance Criteria

1. WHEN the user clicks the "New project" button THE SYSTEM SHALL show a form with a name field, a description field, a start date field, a due date field and an owner field that lists the organization's Project managers.
2. WHEN the user submits the form with a name, a start date, a due date and an owner THE SYSTEM SHALL create the project with the status "planned" and open the project's page.
3. IF the user submits the form without a name, a start date, a due date or an owner THEN THE SYSTEM SHALL keep the form open and show the message "Enter the project name, start date, due date and owner."
4. IF the due date is before the start date THEN THE SYSTEM SHALL keep the form open and show the message "The due date must be on or after the start date."
5. WHEN the user clicks the "Edit" button on a project's page THE SYSTEM SHALL show the project's form filled with its current values.
6. WHEN the user saves the project's form THE SYSTEM SHALL keep the changed values and show the message "Project saved."
7. WHEN the user changes a project's status THE SYSTEM SHALL move it along planned → active → on hold → completed and show the new status on the project's page and in the project list.
8. WHEN a project's status becomes "completed" THE SYSTEM SHALL keep the project's tasks, comments, files and time entries readable on its page.
9. IF a Team member or a Project manager clicks the "Delete project" button THEN THE SYSTEM SHALL show the message "Only an Organization admin can delete a project." and keep the project.
10. WHEN an Organization admin clicks the "Delete project" button and confirms THE SYSTEM SHALL remove the project from the organization's project list and open the Organization dashboard.

## Requirement 4: Project page and team members

**User Story:** As a Project manager, I want a project's page to show its team, tasks and progress, so that I can run the project from one place.

_Source: W1, E1, E2, E3, RP1, A8, A15, N1_

### Acceptance Criteria

1. WHEN the user opens a project's page THE SYSTEM SHALL show the project's name, description, owner, start date, due date and status, and the count of tasks that are to do, in progress, done and overdue.
2. WHEN the user opens a project's page THE SYSTEM SHALL show the project's team members with each member's name and role, and the project's tasks.
3. WHEN the user clicks the "Add member" button THE SYSTEM SHALL show a list of the organization's people who are not yet on the project.
4. WHEN the user picks a person from that list THE SYSTEM SHALL add the person to the project's team members and show the person in the member list.
5. WHEN the user clicks the "Remove" button beside a project member and confirms THE SYSTEM SHALL remove the person from the project's team members and keep the tasks assigned to that person.
6. WHEN the user clicks the "Board" tab THE SYSTEM SHALL open the project's Kanban board.
7. WHEN the user clicks the "Tasks" tab THE SYSTEM SHALL show the project's tasks in a list with each task's title, assignee, due date, priority and status.
8. WHEN the user clicks the "Files" tab THE SYSTEM SHALL show the project's files with each file's name, size, type and who uploaded it.
9. WHEN the user clicks the "Time" tab THE SYSTEM SHALL show the project's time entries with each entry's person, date, hours and note.
10. WHILE the project's page is open THE SYSTEM SHALL show its details, members and task counts within 2 seconds of the request.

## Requirement 5: Kanban board

**User Story:** As a Project manager or a Team member, I want to move tasks across a Kanban board, so that everyone sees the progress of the project.

_Source: W1, W2, E2, A8, A26, A15, N1_

### Acceptance Criteria

1. WHEN the user opens a project's Kanban board THE SYSTEM SHALL show three columns, "To do", "In progress" and "Done", each with the tasks of that status as cards showing the task's title, assignee and due date.
2. WHEN the user drags a task card from one column and drops it on another column THE SYSTEM SHALL move the task to that column's status and show the card in that column.
3. WHEN the user drags a task card and drops it on the column it is already in THE SYSTEM SHALL keep the task's status unchanged.
4. IF a Team member who is not the task's assignee drags the task card THEN THE SYSTEM SHALL keep the card in its column and show the message "Only the assignee or the project manager can move this task."
5. IF the user drops a task card on the "Done" column while the task has no assignee THEN THE SYSTEM SHALL keep the card in its column and show the message "Assign the task before marking it done."
6. WHEN the user clicks a task card THE SYSTEM SHALL open the task's page.
7. WHEN the user moves a task to "Done" and later drags it back to "In progress" THE SYSTEM SHALL reopen the task with the status "in progress".
8. WHEN the user clicks the "Add task" button on the board THE SYSTEM SHALL show the new task form with the project already chosen.
9. WHILE the board is open THE SYSTEM SHALL show every card of the project's tasks within 2 seconds of the request.
10. WHEN the user opens the board on a phone THE SYSTEM SHALL show the three columns one below the other, each with its cards.

## Requirement 6: Tasks

**User Story:** As a Project manager, I want to create tasks and assign them, so that each piece of work has an owner and a due date.

_Source: W1, W2, E2, A8, A10, A26, NT1, N2_

### Acceptance Criteria

1. WHEN the user clicks the "Add task" button THE SYSTEM SHALL show a form with a title field, a description field, an assignee field that lists the project's team members, a due date field and a priority field with the choices "Low", "Medium" and "High".
2. WHEN the user submits the form with a title THE SYSTEM SHALL create the task with the status "to do" and show it on the board and in the task list.
3. IF the user submits the form without a title THEN THE SYSTEM SHALL keep the form open and show the message "Enter the task title."
4. WHEN the user assigns a task to a person THE SYSTEM SHALL show the person's name on the task card and on the task's page.
5. WHEN a task is assigned to a person THE SYSTEM SHALL add a notification for that person with the text "<Task title> was assigned to you."
6. WHEN the user opens a task's page THE SYSTEM SHALL show the task's title, description, assignee, due date, priority, status and project, and its comments and files.
7. WHEN the user changes a task's assignee, due date or priority and saves THE SYSTEM SHALL keep the new values and show the message "Task saved."
8. WHEN the user clicks the "Delete task" button and confirms THE SYSTEM SHALL remove the task from the board and the task list.
9. IF a Team member who is not the task's assignee opens the task's page THEN THE SYSTEM SHALL show the task's details, comments and files without the "Edit" and "Delete task" buttons.
10. WHEN the user opens a task's page on a phone THE SYSTEM SHALL show the task's details above its comments and files.

## Requirement 7: Comments

**User Story:** As a Team member, I want to comment on tasks and projects, so that the team can discuss the work where it happens.

_Source: W2, E4, NT2, N2_

### Acceptance Criteria

1. WHEN the user opens a task's page or a project's page THE SYSTEM SHALL show its comments with each comment's text, author and created time, newest last.
2. WHEN the user types text in the comment field and clicks the "Post" button THE SYSTEM SHALL add the comment to the task or project and show it at the end of the comment list.
3. IF the user clicks the "Post" button with an empty comment field THEN THE SYSTEM SHALL keep the comment list unchanged and show the message "Write a comment before posting."
4. WHEN a comment is added to a task THE SYSTEM SHALL add a notification for the task's assignee and the project's owner, other than the comment's author, with the text "<Author name> commented on <Task title>."
5. WHEN the user clicks the "Edit" button beside their own comment THE SYSTEM SHALL show the comment's text in the comment field.
6. WHEN the user saves an edited comment THE SYSTEM SHALL show the new text in the comment list with the label "edited".
7. IF the user clicks the "Edit" or "Delete" button beside a comment they did not write THEN THE SYSTEM SHALL show the message "You can change only your own comments." and keep the comment.
8. WHEN the user clicks the "Delete" button beside their own comment and confirms THE SYSTEM SHALL remove the comment from the list.

## Requirement 8: Files

**User Story:** As a Team member, I want to share files on tasks and projects, so that the team has the documents it needs.

_Source: W4, E5, A12, F5, NT3, N2_

### Acceptance Criteria

1. WHEN the user clicks the "Upload file" button on a task's page or a project's page THE SYSTEM SHALL show a file picker that accepts any file type.
2. WHEN the user picks a file of 100 MB or less THE SYSTEM SHALL upload it, show it in the file list with its name, size, type and who uploaded it, and show the message "File uploaded."
3. IF the user picks a file larger than 100 MB THEN THE SYSTEM SHALL not upload it and show the message "Files must be 100 MB or less."
4. WHEN a file is uploaded to a project THE SYSTEM SHALL add a notification for the project's team members, other than the person who uploaded it, with the text "<Uploader name> shared <File name>."
5. WHEN the user clicks a file's name THE SYSTEM SHALL download the file.
6. WHEN the user clicks the "Delete" button beside a file they uploaded and confirms THE SYSTEM SHALL remove the file from the list.
7. IF a person who is not on the project opens a file's address THEN THE SYSTEM SHALL show the message "You do not have access to this file." and not send the file.
8. WHILE a project is open THE SYSTEM SHALL keep its files available for download.

## Requirement 9: Notifications

**User Story:** As a person in the organization, I want to be told in the app when something concerns me, so that I do not miss an assignment, a comment or a file.

_Source: NT1, NT2, NT3, A5, A6, A15_

### Acceptance Criteria

1. WHEN a notification is added for the user THE SYSTEM SHALL show a count of unread notifications beside the bell button in the header.
2. WHEN the user clicks the bell button THE SYSTEM SHALL open a list of the user's notifications, newest first, each with its text, the time it was added and whether it is read.
3. WHEN the user clicks a notification THE SYSTEM SHALL mark it read, reduce the unread count by one and open the task or project it names.
4. WHEN the user clicks the "Mark all as read" button THE SYSTEM SHALL mark every notification read and show no unread count.
5. WHEN a task's due date passes and the task is not done THE SYSTEM SHALL add a notification for the task's assignee and the project's owner with the text "<Task title> is overdue."
6. WHEN the user opens the notification list on a phone THE SYSTEM SHALL show it over the screen with a close button.
7. WHILE the user is signed in THE SYSTEM SHALL show the unread count within 2 seconds of the request.

## Requirement 10: Calendar

**User Story:** As a Team member, I want a calendar of my tasks and project dates, so that I can plan my week.

_Source: G3, E1, E2, A19, N1_

### Acceptance Criteria

1. WHEN the user clicks the "Calendar" link THE SYSTEM SHALL open the calendar on the current month, with the user's tasks by due date and the start and due dates of the projects the user is on.
2. WHEN the user clicks the "Next" or "Previous" button THE SYSTEM SHALL show the next or previous month.
3. WHEN the user clicks a day that holds a task THE SYSTEM SHALL show the tasks of that day with each task's title, project and status.
4. WHEN the user clicks a task in a day THE SYSTEM SHALL open the task's page.
5. WHEN the user clicks the "Today" button THE SYSTEM SHALL show the current month with today's date marked.
6. WHEN the user opens the calendar on a phone THE SYSTEM SHALL show the month as a grid of days with a dot on each day that holds a task or a project date.

## Requirement 11: Time tracking

**User Story:** As a Team member, I want to record the hours I work on a task, so that the team knows where the time goes.

_Source: W3, E6, A9, A25, N2_

### Acceptance Criteria

1. WHEN the user clicks the "Log time" button on a task's page THE SYSTEM SHALL show a form with a date field, an hours field and a note field.
2. WHEN the user submits the form with a date and hours greater than 0 and up to 24 THE SYSTEM SHALL create the time entry with the status "submitted" and show it in the task's time list with the person, date, hours and note.
3. IF the user submits the form without a date or with hours of 0 or more than 24 THEN THE SYSTEM SHALL keep the form open and show the message "Enter a date and hours between 0 and 24."
4. WHEN a time entry is submitted THE SYSTEM SHALL add a notification for the project's owner with the text "<Person name> submitted <Hours> hours on <Task title>."
5. WHEN the Project manager clicks the "Approve" button beside a submitted time entry THE SYSTEM SHALL set its status to "approved" and show "approved" beside it.
6. WHEN the Project manager clicks the "Reject" button beside a submitted time entry THE SYSTEM SHALL set its status to "draft" and show "draft" beside it.
7. IF the Project manager clicks the "Approve" button beside a time entry they submitted THEN THE SYSTEM SHALL keep the entry "submitted" and show the message "You cannot approve your own time entry."
8. WHEN the user opens the "Time" tab of a project THE SYSTEM SHALL show the project's time entries with each entry's status.
9. WHEN the user opens the "My time" page THE SYSTEM SHALL show the user's time entries with each entry's task, date, hours, note and status.

## Requirement 12: Reports

**User Story:** As a Project manager or an Organization admin, I want reports of progress, time and workload, so that I can see how the work is going.

_Source: RP1, RP2, RP3, M1, A29, A15, N1_

### Acceptance Criteria

1. WHEN the user clicks the "Reports" link THE SYSTEM SHALL open the Reports page with the tabs "Project progress", "Time tracking" and "Team workload".
2. WHEN the user opens the "Project progress" tab THE SYSTEM SHALL show each project's name and the count of its tasks that are done, in progress and overdue.
3. WHEN the user opens the "Time tracking" tab THE SYSTEM SHALL show, for each person and project, the hours of approved time entries in the chosen month, and the total hours of approved time entries in that month.
4. WHEN the user opens the "Team workload" tab THE SYSTEM SHALL show, for each person, the count of tasks that are to do, in progress and overdue.
5. WHEN the user changes the month in the "Time tracking" tab THE SYSTEM SHALL show the hours of the chosen month.
6. WHEN the user clicks a project's name in the "Project progress" tab THE SYSTEM SHALL open that project's page.
7. WHILE a report tab is open THE SYSTEM SHALL show its figures within 2 seconds of the request.
8. WHEN the user opens the Reports page on a phone THE SYSTEM SHALL show each report as a list of rows, one row for each project or person.

## Requirement 13: People and teams

**User Story:** As an Organization admin, I want to invite people and organize them into teams, so that the right people are in the organization and on its teams.

_Source: E3, A11, A27, N2_

### Acceptance Criteria

1. WHEN the Organization admin clicks the "People" link THE SYSTEM SHALL show the organization's people with each person's name, email and role.
2. WHEN the Organization admin clicks the "Invite person" button THE SYSTEM SHALL show a form with an email field and a role field with the choices "Organization admin", "Project manager" and "Team member".
3. WHEN the Organization admin submits the form with an email and a role THE SYSTEM SHALL add the person to the organization with the status "invited" and show the person in the people list.
4. IF the email is already in the organization THEN THE SYSTEM SHALL keep the form open and show the message "This email is already in the organization."
5. WHEN the Organization admin clicks the "New team" button THE SYSTEM SHALL show a form with a name field and a lead field that lists the organization's people.
6. WHEN the Organization admin submits the form with a name and a lead THE SYSTEM SHALL create the team with the status "active" and show it in the team list.
7. WHEN the Organization admin adds a person to a team THE SYSTEM SHALL show the person in the team's member list.
8. WHEN the Organization admin clicks the "Archive" button beside a team and confirms THE SYSTEM SHALL set the team's status to "archived" and show it with the label "archived".
9. IF a person who is not an Organization admin opens the People page THEN THE SYSTEM SHALL show the message "You do not have access to this page." and keep the person signed in.
10. WHEN the Organization admin changes the organization's name and saves THE SYSTEM SHALL show the new name in the header.

## Requirement 14: Responsive and accessible screens

**User Story:** As a person using the portal, I want every screen to work on my phone and my desktop and to be usable with a keyboard, so that I can work wherever I am.

_Source: N1, A19, A20, F1_

### Acceptance Criteria

1. WHEN the user opens any screen on a screen 375 pixels wide THE SYSTEM SHALL show the content in one column with no horizontal scrolling.
2. WHEN the user opens any screen on a screen 1280 pixels wide THE SYSTEM SHALL show the content in the layout of that screen with the navigation in a sidebar.
3. WHEN the user presses the Tab key on any screen THE SYSTEM SHALL move the focus to the next control and show a visible outline around the focused control.
4. WHEN the user opens any screen THE SYSTEM SHALL show the text and controls in a contrast ratio of at least 4.5 to 1 against their background.
5. WHEN the user opens any screen on a phone THE SYSTEM SHALL show a menu button that opens the navigation.
6. WHEN the user opens any screen THE SYSTEM SHALL show the dates in the user's locale and the times in the user's time zone.

## Requirement 15: Security and data separation

**User Story:** As an Organization admin, I want the portal to keep my organization's data apart and to enforce each role's permissions, so that nobody sees or changes what they should not.

_Source: N2, A17, A27, R1, R2, R3, A8_

### Acceptance Criteria

1. IF a signed-in person asks the server for a project, task, comment, file or time entry of another organization THEN THE SYSTEM SHALL answer with the status 404 and no record.
2. IF a Team member asks the server for a project they are not on THEN THE SYSTEM SHALL answer with the status 404 and no record.
3. IF a Project manager or a Team member asks the server to create or delete a project THEN THE SYSTEM SHALL answer with the status 403 and keep the project.
4. IF a person asks the server to approve a time entry they submitted THEN THE SYSTEM SHALL answer with the status 403 and keep the entry "submitted".
5. IF a person asks the server to change a comment they did not write THEN THE SYSTEM SHALL answer with the status 403 and keep the comment.
6. IF a person asks the server to move a task they are neither the assignee of nor the project manager of THEN THE SYSTEM SHALL answer with the status 403 and keep the task's status.
7. THE SYSTEM SHALL keep each person's password stored only as a salted hash.
8. IF a request arrives without a valid session THEN THE SYSTEM SHALL answer with the status 401 and no record.

## Requirement 16: Performance

**User Story:** As a person using the portal, I want the screens to open quickly, so that the portal does not slow my work.

_Source: A15, A14, N1_

### Acceptance Criteria

1. WHEN the user opens a Kanban board of a project with 500 tasks THE SYSTEM SHALL show every card within 2 seconds.
2. WHEN the user opens the Organization dashboard THE SYSTEM SHALL show its counts and lists within 2 seconds.
3. WHEN the user saves a task THE SYSTEM SHALL show the message "Task saved." within 2 seconds.
4. WHILE 20% of the organization's people use the portal within one hour THE SYSTEM SHALL answer each request within 2 seconds for 95% of requests.

## Later releases

- W5 Plan with AI: AI-assisted project planning, task generation and progress summaries (I1, A23).
