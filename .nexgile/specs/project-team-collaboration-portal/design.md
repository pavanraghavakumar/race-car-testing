# Design: Project & Team Collaboration Portal

## Overview

The portal is a multi-organization SaaS web app. People sign in at `/` with a username and password (or the company login button), and land on the first screen of their role: the Organization dashboard for an Organization admin, the Project dashboard for a Project manager, and My work for a Team member. From there they work with projects, tasks, Kanban boards, comments, files, time entries, notifications, the calendar and reports.

The stack is the one chosen in `answers.md`: React for the screens, Node.js for the server, PostgreSQL for the data, deployed on AWS with managed containers and RDS.

Release 1 covers requirements 1–16. AI-assisted planning (W5) is a later release and has no part in this design.

## Architecture

One repository with two packages, a web app and an API server, plus a shared package of types.

```
browser ──HTTPS──> web (React SPA, Vite dev server / static build)
                     │  /api/* proxied to the API
                     ▼
                   api (Node.js, Express, TypeScript)
                     │  pg connection pool
                     ▼
                   PostgreSQL
```

- **web** is a React 18 single-page app built with Vite and TypeScript. It is served as static files in production; in development Vite serves it on the port Greenfield sets and proxies `/api` to the API server.
- **api** is an Express server in TypeScript, run with `tsx` in development and compiled to JavaScript for production. It owns every rule: sessions, role checks, organization separation, record states and notifications.
- **shared** holds the TypeScript types of the API request and answer bodies, so both packages agree on them.
- **PostgreSQL** holds every record. Every table that holds organization data has an `organization_id` column, and every query filters on the signed-in person's organization.

The API is stateless apart from the session cookie: the session is a signed, HTTP-only cookie holding a random session token, and the token's hash is stored in the `sessions` table.

## Components and Interfaces

### Web app

| Component | Responsibility |
| --- | --- |
| `AppShell` | Header (app name, organization name, bell button with unread count, user name and role, sign-out button), sidebar navigation on desktop, menu button and drawer on a phone. Wraps every signed-in screen. |
| `SignInPage` | `/` when signed out: company login button, username field, password field, sign-in button, error message. |
| `OrganizationDashboard` | `/dashboard`: counts, project list, team list, New project and New team buttons, People and Reports links. |
| `ProjectDashboard` | `/projects`: the Project manager's first screen, the projects they own or are on, with progress counts. |
| `MyWork` | `/my-work`: the Team member's first screen, their tasks by due date and their unread notifications. |
| `ProjectPage` | `/projects/:projectId` with tabs Overview, Board, Tasks, Files, Time, Comments. |
| `ProjectForm` | `/projects/new` and `/projects/:projectId/edit`. |
| `KanbanBoard` | `/projects/:projectId/board`: three columns, drag and drop with the HTML5 drag events, Add task button. |
| `TaskPage` | `/tasks/:taskId`: details, edit form, comments, files, time entries, Log time button. |
| `TaskForm` | `/projects/:projectId/tasks/new`. |
| `CalendarPage` | `/calendar`: month grid, Previous, Next, Today. |
| `MyTimePage` | `/my-time`: the person's time entries. |
| `ReportsPage` | `/reports` with tabs Project progress, Time tracking, Team workload. |
| `PeoplePage` | `/people`: people list, Invite person form, team list, New team form, organization name form. |
| `TeamPage` | `/teams/:teamId`: team name, lead, members, Add member, Archive. |
| `NotificationPanel` | Bell button popover (drawer over the screen on a phone): list, Mark all as read. |

Data loading uses TanStack Query; forms use React Hook Form; routing uses React Router. Dates are formatted with `Intl.DateTimeFormat` in the user's locale and time zone.

### API server

| Module | Responsibility |
| --- | --- |
| `auth` | Sign-in, sign-out, company login start and callback, session lookup, password hashing with `scrypt` and a per-person salt. |
| `tenancy` | Middleware that loads the signed-in person's organization and role and rejects a request without a valid session with 401. |
| `projects` | Project list, create, read, update, status change, delete. |
| `tasks` | Task list, create, read, update, move, delete. |
| `teams` | Team list, create, read, add member, archive. |
| `people` | People list, invite, organization name. |
| `comments` | Comment list, post, edit, delete. |
| `files` | Upload, list, download, delete. |
| `time` | Time entry list, create, approve, reject. |
| `notifications` | List, mark read, mark all read, unread count, and the overdue sweep. |
| `reports` | Project progress, time tracking, team workload. |
| `dashboard` | Organization dashboard counts and lists, Project dashboard, My work. |
| `calendar` | The person's tasks and project dates for a month. |

Every module resolves the record through the person's organization and role before it answers, so a record of another organization, or a project a Team member is not on, answers 404 (requirements 15.1, 15.2).

### Background work

The API runs one timer every 5 minutes that finds tasks whose due date has passed, whose status is not `done`, and that have no overdue notification yet, and adds the notification of requirement 9.5. It runs inside the API process, so no separate worker is needed.

## Data Models

PostgreSQL, with migrations in `api/migrations/` applied by a small migration runner (`npm run migrate --workspace api`) that records applied files in a `schema_migrations` table.

```
organizations(id uuid pk, name text not null, created_at timestamptz not null default now())

people(id uuid pk, organization_id uuid not null references organizations,
       name text not null, email text not null, role text not null check (role in
       ('organization_admin','project_manager','team_member')),
       status text not null check (status in ('invited','active')),
       password_hash text, password_salt text, time_zone text not null default 'UTC',
       locale text not null default 'en', created_at timestamptz not null default now(),
       unique (organization_id, email))

sessions(id uuid pk, person_id uuid not null references people, token_hash text not null unique,
         created_at timestamptz not null default now(), expires_at timestamptz not null)

projects(id uuid pk, organization_id uuid not null references organizations,
         name text not null, description text not null default '',
         start_date date not null, due_date date not null, owner_id uuid not null references people,
         status text not null check (status in ('planned','active','on_hold','completed')),
         created_at timestamptz not null default now())

project_members(project_id uuid references projects, person_id uuid references people,
                primary key (project_id, person_id))

tasks(id uuid pk, organization_id uuid not null references organizations,
      project_id uuid not null references projects, title text not null,
      description text not null default '', assignee_id uuid references people,
      due_date date, priority text not null default 'medium' check (priority in ('low','medium','high')),
      status text not null default 'to_do' check (status in ('to_do','in_progress','done')),
      created_at timestamptz not null default now())

teams(id uuid pk, organization_id uuid not null references organizations, name text not null,
      lead_id uuid not null references people,
      status text not null default 'active' check (status in ('active','archived')))

team_members(team_id uuid references teams, person_id uuid references people,
             primary key (team_id, person_id))

comments(id uuid pk, organization_id uuid not null references organizations,
         author_id uuid not null references people, task_id uuid references tasks,
         project_id uuid references projects, text text not null,
         edited_at timestamptz, deleted_at timestamptz, created_at timestamptz not null default now(),
         check ((task_id is null) <> (project_id is null)))

files(id uuid pk, organization_id uuid not null references organizations,
      uploader_id uuid not null references people, task_id uuid references tasks,
      project_id uuid references projects, name text not null, size_bytes bigint not null,
      mime_type text not null, storage_key text not null,
      deleted_at timestamptz, created_at timestamptz not null default now())

time_entries(id uuid pk, organization_id uuid not null references organizations,
             person_id uuid not null references people, task_id uuid not null references tasks,
             entry_date date not null, hours numeric(4,2) not null check (hours > 0 and hours <= 24),
             note text not null default '',
             status text not null default 'submitted' check (status in ('draft','submitted','approved')),
             created_at timestamptz not null default now())

notifications(id uuid pk, organization_id uuid not null references organizations,
              person_id uuid not null references people, text text not null,
              task_id uuid references tasks, project_id uuid references projects,
              kind text not null, read_at timestamptz, created_at timestamptz not null default now())
```

Indexes: `tasks(project_id, status)`, `tasks(organization_id, assignee_id, due_date)`, `notifications(person_id, read_at)`, `time_entries(organization_id, entry_date)`, `comments(task_id)`, `comments(project_id)`.

Files are stored on disk under `api/uploads/<organization_id>/<file_id>` in development and in an S3 bucket in production; the `storage_key` column holds the path or the object key. The API never serves a file without checking that the person is on the task's or project's team (requirement 8.7).

## API

All paths are under `/api`. Every answer is JSON except file downloads. Errors use the shape `{ "error": "<message>" }` with the status named below. Every endpoint except sign-in and the company login routes needs a valid session cookie, and answers 401 `{ "error": "Sign in to continue." }` without one (requirement 15.8).

### Auth

| Method and path | Request body | Answer |
| --- | --- | --- |
| `POST /api/auth/sign-in` | `{ "username": string, "password": string }` | 200 `{ "person": Person, "firstScreen": "/dashboard" \| "/projects" \| "/my-work" }`; 401 `{ "error": "The username or password is not correct." }` |
| `POST /api/auth/sign-out` | — | 204 |
| `GET /api/auth/company-login` | — | 302 to the provider, or 503 `{ "error": "The company login is not available. Sign in with your username and password." }` |
| `GET /api/auth/company-login/callback` | — | 302 to the first screen, or 302 to `/?error=company_login` |
| `GET /api/auth/me` | — | 200 `{ "person": Person, "organization": { "id", "name" } }`; 401 |

`Person` is `{ "id", "name", "email", "role", "timeZone", "locale" }`.

### Dashboard, projects and teams

| Method and path | Request body | Answer |
| --- | --- | --- |
| `GET /api/dashboard/organization` | — | 200 `{ "counts": { "activeProjects", "teams", "people", "overdueTasks" }, "projects": ProjectSummary[], "teams": TeamSummary[] }` |
| `GET /api/dashboard/projects` | — | 200 `{ "projects": ProjectSummary[] }` |
| `GET /api/dashboard/my-work` | — | 200 `{ "tasks": TaskSummary[], "unreadCount": number }` |
| `GET /api/projects` | — | 200 `{ "projects": ProjectSummary[] }` |
| `POST /api/projects` | `{ "name", "description", "startDate", "dueDate", "ownerId" }` | 201 `{ "project": Project }`; 400 `{ "error": "Enter the project name, start date, due date and owner." }` or `{ "error": "The due date must be on or after the start date." }`; 403 `{ "error": "Only an Organization admin can create a project." }` |
| `GET /api/projects/:projectId` | — | 200 `{ "project": Project, "members": Person[], "counts": { "toDo", "inProgress", "done", "overdue" } }`; 404 |
| `PATCH /api/projects/:projectId` | any of `{ "name", "description", "startDate", "dueDate", "ownerId", "status" }` | 200 `{ "project": Project }`; 400; 403; 404 |
| `DELETE /api/projects/:projectId` | — | 204; 403 `{ "error": "Only an Organization admin can delete a project." }`; 404 |
| `POST /api/projects/:projectId/members` | `{ "personId" }` | 201 `{ "members": Person[] }` |
| `DELETE /api/projects/:projectId/members/:personId` | — | 200 `{ "members": Person[] }` |
| `GET /api/teams` | — | 200 `{ "teams": TeamSummary[] }` |
| `POST /api/teams` | `{ "name", "leadId" }` | 201 `{ "team": Team }`; 400 `{ "error": "Enter the team name and lead." }` |
| `GET /api/teams/:teamId` | — | 200 `{ "team": Team, "members": Person[] }`; 404 |
| `POST /api/teams/:teamId/members` | `{ "personId" }` | 201 `{ "members": Person[] }` |
| `PATCH /api/teams/:teamId` | `{ "status": "archived" }` | 200 `{ "team": Team }` |

`ProjectSummary` is `{ "id", "name", "ownerName", "status", "dueDate" }`. `TeamSummary` is `{ "id", "name", "leadName", "memberCount", "status" }`. `Project` is `{ "id", "name", "description", "startDate", "dueDate", "ownerId", "ownerName", "status" }`. `Team` is `{ "id", "name", "leadId", "leadName", "status" }`.

### Tasks

| Method and path | Request body | Answer |
| --- | --- | --- |
| `GET /api/projects/:projectId/tasks` | — | 200 `{ "tasks": TaskSummary[] }` |
| `POST /api/projects/:projectId/tasks` | `{ "title", "description", "assigneeId", "dueDate", "priority" }` | 201 `{ "task": Task }`; 400 `{ "error": "Enter the task title." }` |
| `GET /api/tasks/:taskId` | — | 200 `{ "task": Task, "comments": Comment[], "files": FileSummary[], "timeEntries": TimeEntry[], "canEdit": boolean }`; 404 |
| `PATCH /api/tasks/:taskId` | any of `{ "title", "description", "assigneeId", "dueDate", "priority", "status" }` | 200 `{ "task": Task }`; 400 `{ "error": "Assign the task before marking it done." }`; 403 `{ "error": "Only the assignee or the project manager can move this task." }`; 404 |
| `DELETE /api/tasks/:taskId` | — | 204; 403; 404 |

`TaskSummary` is `{ "id", "title", "assigneeId", "assigneeName", "dueDate", "priority", "status", "projectId" }`. `Task` adds `"description"` and `"projectName"`.

Moving a task is `PATCH /api/tasks/:taskId` with `{ "status": "in_progress" }`. The server allows it only for the task's assignee or the project's owner (requirement 15.6), refuses `done` without an assignee (requirement 5.5), and allows `done` → `in_progress` (requirement 5.7). Assigning a task adds the notification of requirement 6.5.

### Comments, files and time

| Method and path | Request body | Answer |
| --- | --- | --- |
| `POST /api/tasks/:taskId/comments` | `{ "text" }` | 201 `{ "comment": Comment }`; 400 `{ "error": "Write a comment before posting." }` |
| `POST /api/projects/:projectId/comments` | `{ "text" }` | 201 `{ "comment": Comment }`; 400 |
| `PATCH /api/comments/:commentId` | `{ "text" }` | 200 `{ "comment": Comment }`; 403 `{ "error": "You can change only your own comments." }` |
| `DELETE /api/comments/:commentId` | — | 204; 403 |
| `POST /api/tasks/:taskId/files` | multipart, field `file` | 201 `{ "file": FileSummary }`; 400 `{ "error": "Files must be 100 MB or less." }` |
| `POST /api/projects/:projectId/files` | multipart, field `file` | 201 `{ "file": FileSummary }`; 400 |
| `GET /api/files/:fileId/download` | — | 200 the file bytes; 403 `{ "error": "You do not have access to this file." }`; 404 |
| `DELETE /api/files/:fileId` | — | 204; 403; 404 |
| `POST /api/tasks/:taskId/time-entries` | `{ "date", "hours", "note" }` | 201 `{ "timeEntry": TimeEntry }`; 400 `{ "error": "Enter a date and hours between 0 and 24." }` |
| `GET /api/time-entries` | — | 200 `{ "timeEntries": TimeEntry[] }` (the signed-in person's) |
| `POST /api/time-entries/:entryId/approve` | — | 200 `{ "timeEntry": TimeEntry }`; 403 `{ "error": "You cannot approve your own time entry." }` |
| `POST /api/time-entries/:entryId/reject` | — | 200 `{ "timeEntry": TimeEntry }`; 403 |

`Comment` is `{ "id", "text", "authorId", "authorName", "createdAt", "editedAt", "taskId", "projectId" }`. `FileSummary` is `{ "id", "name", "sizeBytes", "mimeType", "uploaderName", "createdAt" }`. `TimeEntry` is `{ "id", "personId", "personName", "taskId", "taskTitle", "date", "hours", "note", "status" }`.

### Notifications, calendar and reports

| Method and path | Request body | Answer |
| --- | --- | --- |
| `GET /api/notifications` | — | 200 `{ "notifications": Notification[], "unreadCount": number }` |
| `POST /api/notifications/:notificationId/read` | — | 200 `{ "unreadCount": number }` |
| `POST /api/notifications/read-all` | — | 200 `{ "unreadCount": 0 }` |
| `GET /api/calendar?month=YYYY-MM` | — | 200 `{ "days": [{ "date", "tasks": TaskSummary[], "projectDates": [{ "projectId", "projectName", "kind": "start" \| "due" }] }] }` |
| `GET /api/reports/progress` | — | 200 `{ "rows": [{ "projectId", "projectName", "done", "inProgress", "overdue" }] }` |
| `GET /api/reports/time?month=YYYY-MM` | — | 200 `{ "rows": [{ "personId", "personName", "projectId", "projectName", "hours" }], "totalHours": number }` |
| `GET /api/reports/workload` | — | 200 `{ "rows": [{ "personId", "personName", "toDo", "inProgress", "overdue" }] }` |
| `GET /api/people` | — | 200 `{ "people": Person[], "organization": { "id", "name" } }`; 403 for a person who is not an Organization admin |
| `POST /api/people` | `{ "email", "role" }` | 201 `{ "person": Person }`; 400 `{ "error": "This email is already in the organization." }` |
| `PATCH /api/organization` | `{ "name" }` | 200 `{ "organization": { "id", "name" } }` |

`Notification` is `{ "id", "text", "createdAt", "readAt", "taskId", "projectId" }`.

### Shared state between screens

The web app keeps one TanStack Query cache. After a mutation the screen invalidates the query keys it affects, so the header's unread count, the board and the task list agree without a reload:

- `["notifications"]` — the bell button's unread count and the notification list.
- `["project", projectId]` — the project page, its counts and its tabs.
- `["project", projectId, "tasks"]` — the board and the task list.
- `["task", taskId]` — the task page.
- `["dashboard", "organization"]`, `["dashboard", "projects"]`, `["dashboard", "my-work"]` — the three first screens.

A successful save shows the toast messages the requirements name ("Project saved.", "Task saved.", "File uploaded.") in the app's toast area at the bottom right on desktop and the bottom of the screen on a phone.

## Error Handling

- A validation failure answers 400 with the exact message the requirement names, and the screen shows it above the form's submit button and keeps the form's values.
- A permission failure answers 403 with the requirement's message; the screen shows it as a toast and keeps the person where they are.
- A record outside the person's organization or projects answers 404 with `{ "error": "Not found." }`; the screen shows "This page could not be found." with a link back to the person's first screen.
- A missing or expired session answers 401; the web app clears its cache and opens `/`.
- An unexpected server error answers 500 `{ "error": "Something went wrong. Try again." }` and is logged with the request id.
- The company login button opens `/api/auth/company-login`; when the provider does not answer within 10 seconds the web app shows the message of requirement 1.5 and keeps the username and password fields usable.

## Testing Strategy

- **API tests** (`api/tests/`, `node --test` with `supertest`): each test file starts the Express app on a port it picks, and the suite starts a throwaway PostgreSQL container with Testcontainers, applies the migrations to it, seeds an organization with one person of each role, and removes the container at the end. Tests cover each endpoint's success answer, its 400, 403, 404 and 401 answers, and the notifications each action adds.
- **Web tests** (`web/src/**/*.test.tsx`, Vitest with Testing Library and `jsdom`): each screen's rendering, its form validation messages, its role-based controls, and the drag and drop handlers of the board.
- **End-to-end journeys** (`e2e/`, Playwright): sign-in for each role, creating a project, moving a task on the board, posting a comment, uploading a file, logging and approving time, and reading a report. These run only through Greenfield's journey runner against the running app.
- **Performance checks**: a seeded project of 500 tasks, and a test that the board's task query answers within 2 seconds (requirement 16.1).

## Look and feel

A clean, modern product style: white surfaces on a soft grey background, one indigo primary colour, generous spacing and small corner radii. Every screen uses the CSS variables task 1 writes into `web/src/styles/tokens.css`.

**Colours**

| Token | Value | Use |
| --- | --- | --- |
| `--color-bg` | `#f5f6f8` | page background |
| `--color-surface` | `#ffffff` | cards, panels, header, sidebar |
| `--color-text` | `#1c2333` | body text |
| `--color-text-muted` | `#5b6478` | secondary text, labels |
| `--color-border` | `#e2e5eb` | dividers, field borders |
| `--color-primary` | `#4f46e5` | main buttons, active tab, links |
| `--color-primary-hover` | `#4338ca` | hover and pressed |
| `--color-primary-soft` | `#eef0ff` | selected navigation item, badges |
| `--color-error` | `#c0262d` | error text and messages |
| `--color-success` | `#15803d` | success messages, approved label |
| `--color-warning` | `#b45309` | overdue labels |

**Type and spacing**: font `Inter, system-ui, -apple-system, "Segoe UI", sans-serif`; body 15px/1.5; headings 24px (screen title), 18px (section), 14px (card title); labels 13px, weight 500. Spacing scale 4, 8, 12, 16, 24, 32, 48px. Corner radius 8px for cards and fields, 6px for buttons, 999px for badges.

**Controls**

- Button: 36px tall, 16px horizontal padding, 6px radius, weight 500. Primary is `--color-primary` with white text; secondary is a white surface with a `--color-border` border and `--color-text`; danger is white with `--color-error` text and border. Hover darkens the background; focus shows a 2px `--color-primary` outline with a 2px offset; pressed darkens further; disabled is 40% opacity with `cursor: not-allowed`.
- Field: 38px tall, white, 1px `--color-border`, 6px radius, 12px padding; focus shows a 2px `--color-primary` ring; an invalid field shows a `--color-error` border and its message below in 13px `--color-error`.
- List and table row: 48px tall, 1px bottom border, hover background `#f9fafb`, selected row `--color-primary-soft`.
- Card: white, 8px radius, 1px `--color-border`, 16px padding, no shadow except the notification popover and the phone drawer, which use `0 8px 24px rgba(16,24,40,0.12)`.
- Badge: 999px radius, 12px text, `--color-primary-soft` background with `--color-primary` text; status badges use soft tints of the status colour (planned grey, active indigo, on hold amber, completed green; to do grey, in progress indigo, done green; overdue red).

**Layout**

- Desktop (1280px and wider): a 240px sidebar on the left with the navigation (Dashboard, Projects, My work, Calendar, My time, Reports, People for an Organization admin), the content in a centred column of at most 1200px with 32px padding. The header is 64px tall and spans the content area.
- Phone (375px): the header shows the menu button, the app name and the bell; the sidebar becomes a drawer opened by the menu button; content is one column with 16px padding; tables become stacked rows with a label above each value; the board's three columns stack one below the other; the notification list opens over the screen with a close button.

**Screens**

- **Sign-in**: a centred card of 400px on the grey background, the app name above it, the company login button (secondary, full width) above a divider labelled "or", then the username and password fields and the primary sign-in button; the error message sits above the button in `--color-error`.
- **Organization dashboard**: four count cards in a row on desktop (one column on a phone), then two panels side by side on desktop (stacked on a phone): the project list and the team list, each with its header and its New project or New team button.
- **Project dashboard**: a list of project cards, each with the name, status badge, owner, due date and a progress bar of done tasks.
- **My work**: a list of the person's tasks grouped by due date (Overdue, Today, This week, Later), each row with the title, project and status badge.
- **Project page**: a header with the name, status badge, owner, dates and the Edit, Delete project and Add member buttons; a tab bar (Overview, Board, Tasks, Files, Time, Comments); the Overview tab shows the four task counts and the member list.
- **Kanban board**: three equal columns with a header showing the column name and its count; cards are white with the title, the assignee's initials avatar and the due date; a card being dragged is 60% opaque; a column that accepts the drop shows a `--color-primary-soft` background.
- **Task page**: the title and status badge, the details in a two-column grid on desktop (one column on a phone), then the comments, files and time sections one below the other, each with its own header and action button.
- **Calendar**: a month grid of seven columns on desktop; on a phone the same grid with smaller cells and a dot on each day that holds a task or project date; a day's tasks open in a panel below the grid.
- **Reports**: a tab bar, then a table on desktop and stacked rows on a phone; the Time tracking tab has a month field above the table.
- **People**: the people table with the Invite person button, the team list with the New team button, and the organization name form.
- **Notifications**: a popover of 360px under the bell on desktop, a full-screen drawer on a phone, with the Mark all as read button in its header.

## Build and run

Install: npm install
Test: npm test
Run locally: yes
Dev: docker compose up -d --wait && npm run dev
Port variable: PORT
Health path: /api/health
Deploy: ssh-docker

`npm run dev` starts the API on `process.env.API_PORT` (default 4000) and the Vite web server on `process.env.PORT`, with Vite's `server.host: '127.0.0.1'` and a proxy from `/api` to the API. `docker compose up -d --wait` starts the local PostgreSQL from `docker-compose.yml` (project name `project-team-collaboration-portal`, no `container_name`), whose values `.env.example` holds. `npm test` runs the API tests (which start their own Testcontainers database) and the web tests once and exits.

## Test logins

The seed script (`npm run seed --workspace api`) creates one organization, "Northwind Studio", with these accounts. `Dev` runs it only when the database has no organization, and it does nothing when `NODE_ENV` is `production`.

| Role | User name | Password |
| --- | --- | --- |
| Organization admin | `admin@northwind.test` | `Admin1234!` |
| Project manager | `manager@northwind.test` | `Manager1234!` |
| Team member | `member@northwind.test` | `Member1234!` |

The seed also creates two projects ("Website redesign", "Mobile app launch"), a team ("Design"), tasks in each status, a comment, a file record and a submitted time entry, so every screen has content.

## Assumptions

- The company login button is wired to Microsoft Entra ID through the OAuth authorization-code flow; the first release signs people in with a username and password, and the button shows the message of requirement 1.5 when the provider is not configured.
- A person's user name is their email address.
- An invited person signs in with the password the Organization admin sets for them; the invite form has an optional password field, and the API creates the account with the status "invited" and the role chosen.
- Files are stored on the API server's disk in development and in an S3 bucket in production; the bucket is named by the `S3_BUCKET` environment variable.
- The overdue sweep runs every 5 minutes inside the API process.
- The Project manager's Project dashboard lists the projects they own or are on; the Team member's My work lists the tasks assigned to them.
- The calendar shows the person's tasks by due date and the start and due dates of the projects they are on, in the person's time zone.
- The Reports page is open to Project managers and Organization admins; a Team member who opens it sees the message of requirement 1.9.
- The organization name and logo settings are limited to the name in release 1; the logo is a later release.
- The API and the web app are served from one origin in production (the API serves the built web files), so the session cookie is `HttpOnly`, `Secure` and `SameSite=Lax`.
