# Requirements brief — Project Team Collaboration Portal
## Profile
A full-stack project and team collaboration portal where organizations manage projects, teams, tasks, Kanban boards, files, time, reports and AI-assisted planning in one place. · SaaS for many organisations · Project and team collaboration · size: business · depth: standard · personalData, manyOrganisations, files
- **Has a user interface?** Yes (The description asks for interactive dashboards, Kanban boards and a responsive professional UI.)
- **Runs locally?** Yes (It is a web app that serves pages and an API, so Greenfield can start it on the person's machine with a local database.)
## The app
A full-stack project and team collaboration portal for many organizations, with role-based access, dashboards, projects, tasks, Kanban boards, comments, file sharing, notifications, calendars, time tracking, reports and later AI-assisted planning. Each organization's data is kept apart, people sign in with a company login or username and password, and the first release covers project and task management, time tracking and file sharing.
## Goals and success
- G1 Help organizations manage projects, teams and tasks in one centralized platform. (description)
- G2 Give role-based access and interactive dashboards so each person sees the work that matters to them. (description)
- G3 Support team collaboration through comments, file sharing, notifications, calendars and time tracking. (description)
- G4 Provide reports, analytics and AI-powered help for project planning, task generation and progress summaries. (description)
- M1 At least 50 active projects and 2,000 approved time entry hours per month across all organizations by 6 months after launch. [assumed] (Q7)
## Roles
- R1 Organization admin (description)
- R2 Project manager (description)
- R3 Team member (description)
## Permissions
- R1 Organization admin may create a project, delete a project (Q6)
- R2 Project manager may not create a project, delete a project (Q6)
- R3 Team member may not create a project, delete a project (Q6)
## Workflows
### W1 Manage a project (release 1) — actors: R2 Project manager; trigger: A new project is needed; outcome: The project is completed and its history kept (description)
1. Create the project with its name, dates and owner
2. Add team members
3. Break the work into tasks
4. Track progress on the Kanban board
5. Close the project when done
- 
### W2 Work on a task (release 1) — actors: R3 Team member; trigger: A task is assigned; outcome: The task is done and the board shows it (description)
1. Open the task from the board or dashboard
2. Read the details and comments
3. Move the task to in progress
4. Add comments and files as needed
5. Move the task to done
- 
### W3 Track time (release 1) — actors: R3 Team member; trigger: Work is done on a task; outcome: Time is recorded against the task (description, Q3)
1. Open the task
2. Enter the date and hours
3. Add a note
4. Submit the time entry
- 
### W4 Share a file (release 1) — actors: R3 Team member; trigger: A document is needed by the team; outcome: The file is available to the team (description)
1. Open the task or project
2. Upload the file
3. Others are notified
4. Others download or comment
- 
### W5 Plan with AI (later release) — actors: R2 Project manager; trigger: A new project needs a plan; outcome: A draft task list is created (description, Q4)
1. Describe the project goal
2. Ask the AI to suggest tasks
3. Review and adjust the suggested tasks
4. Add them to the project
- 
## Records
- E1 Project. fields: name, description, start date, due date, status, owner; states: planned → active → on hold → completed; owner: Project manager (description)
- E2 Task. fields: title, description, assignee, due date, priority, status, project; states: to do → in progress → done; owner: Team member (description)
- E3 Team. fields: name, members, lead; states: active → archived; owner: Organization admin (description)
- E4 Comment. fields: text, author, created at, task or project; states: posted → edited → deleted; owner: Team member (description)
- E5 File. fields: name, size, type, uploaded by, linked task or project; states: uploaded → deleted; owner: Team member (description)
- E6 Time entry. fields: person, task, date, hours, note; states: draft → submitted → approved; owner: Team member (description)
## Quality targets
- N1 [scale] The app must be responsive and work well on desktop and mobile screens. (description)
- N2 [security] The backend must be secure and role-based access enforced. (description)
## Integrations
- I1 AI service for project planning, task generation and progress summaries. (description)
## Notifications
- NT1 A person is told in the app when a task is assigned to them. (description)
- NT2 People on a task are told in the app when a comment is added. (description)
- NT3 People on a project are told in the app when a file is shared. (description)
## Reports
- RP1 Project progress report showing tasks done, in progress and overdue. (description)
- RP2 Time tracking report by person and project. (description)
- RP3 Team workload and analytics dashboard. (description)
## Scope and constraints
- S1 Build a modern full-stack portal with role-based access, dashboards, project management, task assignments, Kanban boards, comments, file sharing, notifications, calendars, time tracking, reports, analytics and AI features. (description)
## Decisions
- **Stack:** React, Node.js and PostgreSQL (decided by Greenfield; suggested: React and Node.js share one language across the screens and the server, and PostgreSQL handles the relational data and many organizations well.) (Q8)
- **Deploy target:** AWS (managed containers and RDS) (decided by Greenfield; suggested: AWS gives managed containers, a managed PostgreSQL database and backups that fit a multi-organization SaaS with high availability needs.) (Q9)
## Assumptions
- A1 Each organization has about 1 to 3 organization admins, 5 to 20 project managers and 20 to 200 team members. — The description names three roles but gives no head count; a typical mid-sized organization sets the scale. [assumed] (assumption, description)
- A2 Today projects and tasks are tracked in spreadsheets and email, with status meetings to keep everyone aligned. — No current tools were described; this is the most common starting point for teams adopting a collaboration portal. [assumed] (assumption, description)
- A3 The top pains today are scattered task status, missed deadlines and no single view of team workload. — These are the pains the portal's dashboards, Kanban boards and reports are meant to solve. [assumed] (assumption, description)
- A4 The closest products are Trello, Asana and Monday.com; copy their simple Kanban boards and clear task assignment, avoid their complex pricing tiers and feature overload. — These are the best-known tools in this space and set user expectations. [assumed] (assumption, description)
- A5 The app must respond to these events: a task is assigned, a comment is added, a file is uploaded, a task is moved on the board, a time entry is submitted, a time entry is approved, a project is completed, and a task becomes overdue. — These events drive notifications, dashboards and reports. [assumed] (assumption, description)
- A6 A task becomes overdue when its due date passes and it is not done; the assignee and project manager are notified. — Overdue tasks are a core signal for project health and appear in the progress report. [assumed] (assumption, description)
- A7 Each main workflow runs daily for team members and weekly for project managers; project creation happens a few times a month per organization. — No frequency was given; these are typical rhythms for project collaboration work. [assumed] (assumption, description)
- A8 A task may be moved only by its assignee or the project manager; a time entry is approved by the project manager. — Role-based access is required and these are the natural owners of each record.; high impact [assumed] (assumption, description)
- A9 A time entry may not be approved by the person who submitted it. — Separation of duties is a common control for time tracking.; high impact [assumed] (assumption, description)
- A10 A task may not be marked done while it has no assignee. — Every done task should have someone accountable for it. [assumed] (assumption, description)
- A11 Organization admins can change organization name, add and remove users, create teams, set project templates and configure notification defaults without a developer. — Administration is a should-have topic and these are the settings each customer organization needs. [assumed] (assumption, description)
- A12 Files up to 100 MB each are allowed; files are visible to the project members they are shared with and kept for the life of the project. — The person said all common file types but gave no size; 100 MB covers documents, images and spreadsheets. [assumed] (assumption, Q5)
- A13 In year 1 there are 20 organizations, 2,000 users, 1,000 projects and 50,000 tasks; in year 3 there are 100 organizations, 10,000 users, 5,000 projects and 250,000 tasks. — No volumes were given; these numbers fit a growing SaaS collaboration product.; high impact [assumed] (assumption, description)
- A14 The busiest moment is Monday morning when teams plan the week, with up to 20% of all users active within an hour. — Weekly planning is the natural peak for project collaboration tools. [assumed] (assumption, description)
- A15 Key actions such as opening a board, saving a task or loading a dashboard must respond within 2 seconds. — The description asks for a responsive app; 2 seconds is the common expectation for web apps. [assumed] (assumption, description)
- A16 An hour of outage costs about $5,000 in lost productivity across all organizations; maintenance windows are Sunday 02:00–04:00 UTC; at most 15 minutes of data and 1 hour of recovery time may be lost. — No availability targets were given; these are sensible for a business SaaS tool.; high impact [assumed] (assumption, description)
- A17 The worst misuse is one organization seeing another organization's projects or tasks; organization admins must never see another organization's data, and team members must never see projects they are not on. — The portal is sold to many organizations and data must be kept apart.; high impact [assumed] (assumption, description, Q1)
- A18 Personal data held is name, email, profile photo, time entries and comments; users are in the EU and US; GDPR and CCPA apply; data is kept while the organization's account is active and deleted within 30 days of a deletion request; consent is given at sign-up. — The portal holds personal data and serves multiple countries; these are the common legal requirements.; high impact [assumed] (assumption, description)
- A19 The app meets WCAG 2.2 AA, is in English only, left-to-right, uses the user's time zone and shows dates in the user's locale. — Accessibility is a should-have and English is the description's language. [assumed] (assumption, description)
- A20 The portal is used on desktop and mobile browsers; it does not need to work offline. — The description asks for a responsive UI and does not mention offline use. [assumed] (assumption, description)
- A21 When something breaks, the on-call engineer is alerted by email and pager; support can view a user's projects and tasks read-only to help, but cannot act as the user. — Operations is a should-have topic and these are standard support practices. [assumed] (assumption, description)
- A22 The likeliest ways the portal could fail are slow boards with many tasks, notifications being missed, and organizations losing trust over data separation. — These are the risks the person would care about most for a collaboration portal. [assumed] (assumption, description)
- A23 The AI service is OpenAI's API; only the project goal text and task titles are sent; when it is down the AI planning feature shows a message and the person can add tasks manually. — The AI features are in a later release and need a named service and a fallback. [assumed] (assumption, description)
- A24 The company login provider is Microsoft Entra ID (Azure AD) or Google Workspace; when it is down people can still sign in with their username and password. — The person said both company login and username/password; these are the most common providers. [assumed] (assumption, Q2)
- A25 A time entry moves from draft to submitted to approved; the project manager approves; a rejected entry goes back to draft. — The states were named in the model but not who moves them.; high impact [assumed] (assumption, Q3)
- A26 A task moves from to do to in progress to done; the assignee or project manager may move it; a done task can be reopened to in progress. — The states were named in the model but not who moves them.; high impact [assumed] (assumption, description)
- A27 Each organization's data is kept apart by an organization identifier on every record; each organization can set its own name and logo; sign-up is by invitation from an organization admin. — The portal is sold to many organizations and needs separation and per-customer settings.; high impact [assumed] (assumption, Q1)
- A28 There is no existing data to migrate; organizations start fresh. — The profile says existingData is false. [assumed] (assumption)
- A29 Success is measured by the number of active projects run in the portal and the hours of time entries approved each month. — Both are already tracked by the core workflows, so they can be reported without extra data entry. [assumed] (assumption, Q7)
## Other facts
- F1 The UI should be responsive and professional. [scope] (description)
- F2 The app needs a database integration and fully functional workflows. [scope] (description)
- F3 The portal is sold to many separate organizations, each with its own users and data kept apart. [tenancy] (Q1)
- F4 People sign in either with a company login (single sign-on) or with a username and password. [security] (Q2)
- F5 People upload all common file types. [files] (Q5)
## Out of scope and later releases
- W5 Plan with AI (later release) (description, Q4)
## The interview
- Q1 [tenancy · owner] Should the portal be sold to many separate organizations, each with its own users and data kept apart? → Yes, many organizations
- Q2 [security · owner] Do people sign in with a company login (single sign-on) or with a username and password? → Both
- Q3 [release · owner] Should the first release include time tracking, or is that for later? → Include time tracking
- Q4 [release · owner] Should the first release include the AI-powered features, or are they for later? → Later release
- Q5 [files · owner] What files do people upload: documents, images, spreadsheets, or something else? → All common file types
- Q6 [permissions · owner] Who may create and delete projects? → Admins only
- Q7 [success · owner] When the portal has been live for a while, what would tell you it is working: something you could count, like the number of projects run in it or the hours of time entries approved? → Decide for me (settled: Success is measured by the number of active projects run in the portal and the hours of time entries approved each month.)
## Decided by Greenfield (Enough, decide the rest)
- Q8 Which stack should the portal be built with? → Decide for me (settled: React, Node.js and PostgreSQL)
- Q9 Where should the portal be deployed? → Decide for me (settled: AWS (managed containers and RDS))
