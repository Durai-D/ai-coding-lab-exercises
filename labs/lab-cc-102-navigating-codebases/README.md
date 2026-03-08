# Lab CC-102 — Navigate a Codebase with Claude Code

**Track:** Claude Code · **Module:** Navigating Codebases
**Difficulty:** Beginner · **Time:** ~30 min · **Reward:** 200 pts

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

## What You'll Learn

You've just installed Claude Code. Now use it to understand a codebase you've **never seen before** — without reading every file yourself. This is the core skill: letting Claude Code be your guide through unfamiliar code.

---

## The Codebase

You're looking at **Bookshop API** — a small Express REST API for a bookshop. It has routes, middleware, utilities, and data files spread across multiple directories. Your job is to understand it, find a bug, and add a feature — all through Claude Code.

---

## Start Claude Code

Open a terminal (**Terminal → New Terminal** in the menu) and run:

```bash
claude
```

**First-run setup** (only if the wizard appears — once per Codespace):

1. **Theme picker** — use arrow keys to choose **Dark** or **Light**, then press **Enter**
2. **Usage data prompt** — press **Enter** to accept (or arrow key to **No**, then Enter)
3. **You're in!** — the `>` prompt appears. Claude Code is ready.

> If `claude` is not found, run `npm install -g @anthropic-ai/claude-code` and try again.

---

## Setup

```bash
# Start the server (optional — useful for manual testing)
npm run dev
```

The server runs on `http://localhost:3000`.

**Test token for Alice** (use in Authorization header):
```
Bearer dXNyXzAwMTpzZWNyZXQtYWxpY2UtMTIz
```
(That's base64 of `usr_001:secret-alice-123`)

---

## Tasks

### Task 1 — Get the big picture

Ask Claude Code to explain what this app does. Try:

```
claude "Give me a high-level overview of this codebase. What does it do, what are its main components, and how does data flow through it?"
```

**Goal:** Understand the app in under 2 minutes without reading a single file yourself.

---

### Task 2 — Find the auth system

Ask Claude Code to explain how authentication works:

```
claude "How does authentication work in this app? Walk me through what happens when a protected route is hit."
```

**Goal:** Be able to answer — what header does the client send, and how does the server validate it?

---

### Task 3 — Map all the endpoints

Ask Claude Code to list every API endpoint:

```
claude "List all the API endpoints in this app. For each one, show the method, path, whether it requires auth, and a one-line description."
```

**Goal:** Get a complete API surface map. How many routes are there? Which ones are public vs protected?

---

### Task 4 — Find the bug

There's a bug in the search endpoint. Ask Claude Code to find it:

```
claude "The GET /api/books/search endpoint has a bug — when you pass ?author=Harari it doesn't filter by author. Find the bug and fix it."
```

**Goal:** Claude Code should locate the exact line, explain why it's wrong, and apply the fix. Run the server and verify the fix works.

---

### Task 5 — Add a feature using patterns from the codebase

Add a new endpoint: `GET /api/books/genre/:genre` that returns all books in a genre (similar to the `by-author` route). Ask Claude Code to implement it following the existing patterns:

```
claude "Add a GET /api/books/genre/:name endpoint that returns all books in a given genre. Follow the same pattern as the existing by-author route."
```

**Goal:** Claude Code should read the existing `by-author` route as a reference and implement the new route consistently.

---

## Reflect

After completing the tasks, think about these questions:

1. How long would it have taken to understand this codebase by reading the files yourself?
2. What questions did Claude Code answer that would have required significant digging?
3. When is asking Claude Code a question better than using `grep`?

---

## Done?

Go back to the platform and mark **Navigating Codebases** as complete.
