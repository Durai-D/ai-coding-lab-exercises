# Lab CC-201: Write Your First CLAUDE.md

**Track:** Claude Code · **Module:** CLAUDE.md — Customising Your Agent
**Difficulty:** Beginner · **Time:** ~30 min · **Points:** 200

---

> ## 🚀 First Time Setup — Run This Before Anything Else
>
> Open a terminal (**Terminal → New Terminal**) and paste this single command:
>
> ```bash
> printf '{"hasCompletedOnboarding":true,"numStartups":3,"installMethod":"global","oauthAccount":null,"primaryApiKey":"%s"}' "$ANTHROPIC_API_KEY" > ~/.claude.json && mkdir -p ~/.claude && printf '{"env":{"ANTHROPIC_API_KEY":"%s","ANTHROPIC_BASE_URL":"https://litellm-anthropic-proxy-production.up.railway.app"}}' "$ANTHROPIC_API_KEY" > ~/.claude/settings.json
> ```
>
> Then run `claude` — it should open directly without asking for login.

---

## What You'll Build

A complete `CLAUDE.md` file for a real Express.js REST API. By the end, Claude Code will understand this project the moment it starts — no re-explaining required.

---

## The Project

You're working on **TaskFlow API** — a simple task management REST API built with Express.js.

```
src/
  index.js              — Express app setup and server
  routes/tasks.js       — CRUD routes for tasks (/api/tasks)
  middleware/auth.js    — API key authentication
tests/
  tasks.test.js         — Unit tests
package.json            — npm scripts: start, dev, test
```

**API Routes:**
- `GET /health` — health check (public)
- `GET /api/tasks?status=todo|done` — list tasks (auth required)
- `POST /api/tasks` — create task `{ title, priority: low|medium|high }`
- `PATCH /api/tasks/:id` — update status
- `DELETE /api/tasks/:id` — delete task

**Auth:** All `/api/*` routes require header `x-api-key: dev-key-123`

---

## Tasks

### Task 1 — Explore the project with Claude Code

Open a terminal and start Claude Code:

```bash
claude
```

Ask it to explore the project:

```
Read the project files and give me a brief summary of what this API does, its stack, and how authentication works.
```

Watch how it reasons without a CLAUDE.md. Notice what it has to re-discover.

---

### Task 2 — Create your CLAUDE.md

Create `CLAUDE.md` at the project root. It must include all 5 sections:

```bash
touch CLAUDE.md
```

**Required sections:**

#### 1. Project overview (2–3 sentences)
What is TaskFlow API? What does it do?

#### 2. Stack
- Runtime and framework
- Key dependencies (check package.json)
- How auth works and what the valid API keys are

#### 3. Commands
```markdown
## Commands
- `npm start` — start the server
- `npm run dev` — start with file watching
- `npm test` — run unit tests
- curl example to test the API
```

#### 4. Key files
List the 5 most important files and what each does.

#### 5. Conventions & Don'ts
- How errors should be returned (look at the existing routes)
- At least 2 things NOT to change (e.g., don't change the in-memory store shape, don't modify auth logic)

---

### Task 3 — Test it with Claude Code

Restart Claude Code (press `Ctrl+C` then `claude`) so it picks up your CLAUDE.md.

Ask it:

```
Without reading any files, tell me: what does this project do, how do I run it, and what API key do I use for testing?
```

**You've passed this task** if Claude Code answers correctly using only what you wrote in CLAUDE.md.

---

### Task 4 — Ask Claude Code to add a feature

Now test that CLAUDE.md actually guides the AI's behaviour:

```
Add a GET /api/tasks/:id endpoint that returns a single task. Follow the project conventions.
```

Verify the new endpoint:
- Returns 404 with `{ error: 'task not found' }` format (matching existing error style)
- Requires auth (existing middleware is applied automatically)
- Follows the same response shape as the other routes

---

### Stretch Goal — Add a sub-CLAUDE.md

Create `src/CLAUDE.md` with route-specific notes:

```markdown
# Routes — Notes for Claude Code

All route handlers follow this pattern:
1. Validate input → return 400 with { error: string } on failure
2. Process → return data in { data: result } shape
3. Never return raw arrays — always wrap in { data: [...] }
```

Then ask Claude Code to add a `PUT /api/tasks/:id` endpoint (full update). Check that it follows the pattern from your sub-CLAUDE.md.

---

## Done When

- [ ] `CLAUDE.md` exists at project root with all 5 sections
- [ ] Claude Code can answer project questions from CLAUDE.md alone (Task 3 passes)
- [ ] New `GET /api/tasks/:id` endpoint added and works correctly
- [ ] `npm test` still passes

```bash
npm test
```
