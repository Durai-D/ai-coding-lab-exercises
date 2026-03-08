# Lab 101: Hello AI — Your First Pair Programming Session

> **Week 1 Lab · Beginner · ~30 min · 200 XP**

---

## ⚡ Before You Start — Claude Code Setup

Claude Code is pre-installed in this Codespace and configured automatically via your **LAB_TOKEN**.

**First time in any lab?** Do this once:
1. Go to **[ai-coding.guru/settings](https://ai-coding.guru/settings) → API Keys** and copy your Lab Token
2. Add it at **[github.com/settings/codespaces](https://github.com/settings/codespaces)** — secret name: `LAB_TOKEN`
3. Rebuild this Codespace — Claude Code will be ready automatically for every lab

**Already set up?** You're good — just run `claude` in the terminal to verify.

**Claude asking for login?** Re-run setup manually: `bash /workspaces/ai-coding-lab-exercises/scripts/setup-claude.sh`

> No Anthropic subscription needed. Your personal token gives you ~500k tokens included with your account.

---

## Mission Brief

You just joined the Acme Engineering team. Your first task: the previous developer stubbed out 5 utility functions and left before finishing them. Every function currently throws `"Not implemented"`.

Your job: **use Gemini CLI to read the codebase, understand what's needed, and make all 17 tests pass.**

The rule: **you cannot write the implementation code yourself.** Let the AI do it. Your job is to direct, verify, and understand.

---

## Your Tool: Gemini CLI

Gemini CLI is a free, terminal-based AI agent that reads your files and writes code. It comes pre-installed in this sandbox.

```bash
# Start Gemini (interactive mode)
gemini

# Or ask a single question directly
gemini "What files are in this project?"
```

Gemini reads files, edits code, and runs commands — all from your instructions. You talk to it like a developer explaining a task to a colleague.

---

## Check Your Starting Point

Before touching anything, run the tests to see the baseline:

```bash
npm test
```

You'll see **17 failing tests** — one for each behaviour we need. That's fine. This is where you start.

---

## Step 1 — Orient Yourself

Start Gemini and ask it to understand the project:

```bash
gemini
```

Then type:

```
What files are in this project? Read src/utils.js and tests/utils.test.js and explain what each function needs to do.
```

Gemini will read both files and give you a clear breakdown. **Read its response before moving on.** Make sure you understand what each function should do.

---

## Step 2 — Ask Gemini to Implement the Functions

Still inside Gemini, type:

```
Implement all 5 functions in src/utils.js so that every test in tests/utils.test.js passes. Don't change the test file.
```

Watch what Gemini does. It will:
1. Re-read the test file to understand the expectations
2. Write implementations for each function
3. Save the changes to `src/utils.js`

---

## Step 3 — Run the Tests

Exit Gemini (`Ctrl+C` or type `exit`) and run:

```bash
npm test
```

If all 17 tests pass, you're done. Jump to **Step 5**.

If some tests still fail — go to Step 4.

---

## Step 4 — Iterate (If Needed)

Tests still failing? Great — this is the real skill. Tell Gemini exactly what's wrong:

```bash
gemini
```

Then paste the failing test output and say:

```
These tests are still failing: [paste the test names here].
Fix src/utils.js so all tests pass.
```

Repeat until all 17 pass. Most people get there in 1–2 rounds.

---

## Step 5 — Verify and Reflect

Run the tests one final time:

```bash
npm test
```

You should see:

```
▶ capitalize
  ✓ capitalizes the first letter
  ✓ leaves an already-capitalized string unchanged
  ✓ handles an empty string
  ✓ handles a single character
▶ reverseString
  ...
✓ passing: 17
✗ failing: 0
```

Before you close the sandbox, open `src/utils.js` and read through what Gemini wrote. For each function, ask yourself:

- Do you understand what it's doing?
- Would you have written it differently?
- Could you explain it to someone else?

This reflection is not optional — it's the most important part.

---

## When Things Go Wrong

**Gemini says "I can't edit files"**
Try: `gemini --yolo` to allow automatic file edits without confirmation prompts.

**Tests pass locally but the count is wrong**
Make sure you're running `npm test` from the `labs/lab-101-hello-ai/` directory, not the root.

**Gemini writes code but it still fails one edge case**
Point it at the specific failing test: *"The `truncate` function fails when maxLength is 3. Read the test and fix it."*

**Gemini asks for an API key**
Sign in with your Google account: `gemini auth login` — it's free with a Google account.

---

## Done When

```
✓ passing: 17
✗ failing: 0
```

All 17 tests green. That's it. Well done.

---

## What You Just Learned

You just ran the core AI coding loop for the first time:

```
Describe a goal in plain English
        ↓
AI reads context and writes code
        ↓
You run tests to verify
        ↓
You read the output to understand it
        ↓
You iterate if needed
```

This loop — **describe → generate → verify → understand → iterate** — is what you'll use for every AI coding task, whether it's a 5-function utility or a 500-line feature.

The AI does the typing. You do the thinking.

---

## Up Next: Lab 102 — Prompt Dojo

> Drops next week.

You wrote your first AI prompts today. Next week, we look at *bad* prompts — and you'll see just how dramatically the quality of your prompt changes the quality of the output. Five bad prompts to fix. Same verification loop. Much harder than it sounds.

Keep an eye on [ai-coding.guru](https://ai-coding.guru) for the drop.
