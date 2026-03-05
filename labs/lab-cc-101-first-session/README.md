# Lab CC-101: Your First Claude Code Session

> **Claude Code Trail · Beginner · ~30 min · 200 XP**

---

## Mission Brief

You've joined a team that inherited a half-finished task manager API. The previous dev left 3 bugs and 3 unimplemented endpoints before shipping. The tests are written — they're all failing.

Your job: **use Claude Code to read the codebase, understand what's broken, and make all 14 tests pass.**

The rule: **you direct, Claude Code implements.** You don't write application code manually. You read what it writes, verify it works, and iterate.

---

## Your Tool: Claude Code

Claude Code is a terminal AI agent that reads your files, edits code, and runs commands — all from your instructions. It's pre-configured in this sandbox.

> **No subscription needed.** This sandbox uses Claude Code pointed at an AI coding-optimised model via a compatibility proxy — you get the full experience for free.

### Starting Claude Code for the First Time

Open a terminal (**Terminal → New Terminal** in the menu) and run:

```bash
claude
```

**First-run setup** (only once per Codespace):

1. **Theme picker appears** — use arrow keys to select **Dark** or **Light**, then press **Enter**
2. **Usage data prompt** — press **Enter** to accept (or arrow key to **No** and Enter to decline)
3. **You're in!** — you'll see the `>` prompt. Claude Code is ready.

If `claude` is not found, run `npm install -g @anthropic-ai/claude-code` then try again.

```bash
# Start Claude Code (interactive mode)
claude

# Or ask a single question without entering interactive mode
claude "What files are in this project?"
```

---

## Check Your Starting Point

Before touching anything, see the baseline:

```bash
npm install
npm test
```

You'll see **11 failing tests** across 5 endpoint groups (2 pass already — the baseline behaviour is correct). That's expected. This is your starting point.

---

## Step 1 — Orient Yourself

Start Claude Code:

```bash
claude
```

Then ask it to understand the project:

```
Read src/server.js and tests/server.test.js. Explain what the API does, what's broken, and what's not implemented.
```

Claude Code will read both files and give you a clear breakdown. **Read its response before moving on.** You should understand:
- Which 3 endpoints have bugs
- Which 3 endpoints are not implemented
- What each test expects

---

## Step 2 — Fix the Bugs First

Still inside Claude Code, tackle the bugs one at a time:

```
Fix the GET /tasks endpoint so it supports filtering by ?done=true and ?done=false
```

Then:

```
Fix GET /tasks/:id to return a 404 when the task is not found
```

Then:

```
Fix POST /tasks to validate that title is present and return a 400 if it's missing. Also return 201 (not 200) on success.
```

After each fix, exit and run tests to confirm progress:

```bash
# Ctrl+C to exit Claude Code, then:
npm test
```

---

## Step 3 — Implement the Missing Endpoints

Back in Claude Code:

```
Implement PATCH /tasks/:id so it updates the task fields (title, done, priority) and returns the updated task. Return 404 if the task doesn't exist.
```

```
Implement DELETE /tasks/:id to remove the task and return 204 No Content. Return 404 if not found.
```

```
Implement GET /tasks/stats to return { total, done, pending } counts.
```

Run tests after each one. Most people get everything passing in 2–3 rounds.

---

## Step 4 — Iterate (If Needed)

Tests still failing? Tell Claude Code exactly what's wrong:

```bash
claude
```

Then:

```
These tests are still failing: [paste test names here].
Read the test file to understand what they expect, then fix src/server.js.
```

---

## Step 5 — Verify

All green:

```bash
npm test
```

Expected output:
```
▶ GET /tasks
  ✓ returns all tasks by default
  ✓ filters by ?done=true
  ✓ filters by ?done=false
▶ GET /tasks/:id
  ✓ returns the task when found
  ✓ returns 404 when task not found
▶ POST /tasks
  ✓ creates a task with title
  ✓ returns 400 when title is missing
▶ PATCH /tasks/:id
  ✓ marks a task as done
  ✓ updates the title
  ✓ returns 404 for unknown id
▶ DELETE /tasks/:id
  ✓ deletes an existing task
  ✓ returns 404 for unknown id
▶ GET /tasks/stats
  ✓ returns total, done, and pending counts

✓ passing: 14
✗ failing: 0
```

---

## When Things Go Wrong

**`claude` command not found**
Run `npm install -g @anthropic-ai/claude-code` — it should already be installed but re-installs are fine.

**Tests hang and don't exit**
The server didn't shut down cleanly. Run `npm test` again — it usually resolves itself.

**Claude Code edits the test file**
Tell it explicitly: *"Do not modify tests/server.test.js — only fix src/server.js."*

**Claude Code's fix breaks a test that was passing**
Paste the newly broken test output and say: *"This was passing before. Read the test and fix src/server.js without breaking it."*

---

## Done When

```
✓ passing: 13
✗ failing: 0
```

All 13 tests green. Well done.

---

## What You Just Learned

You ran the agentic coding loop with a real codebase:

```
Read → Understand → Direct Claude Code → Verify tests → Iterate
```

The difference from Lab 101: this isn't just implementing utility functions — it's navigating a real API, fixing bugs with HTTP semantics, and implementing REST endpoints. Claude Code reads context across multiple files, reasons about the code, and makes targeted edits.

This is the pattern you'll use every day.

---

## Up Next: Lab CC-102 — Navigate a Codebase

You've fixed and extended existing code. Next: you'll use Claude Code to understand a real codebase you've never seen before — mapping its routes, finding a bug, and adding a feature — all by asking the right questions.

Head back to [ai-coding.guru](https://ai-coding.guru) to open the next module.
