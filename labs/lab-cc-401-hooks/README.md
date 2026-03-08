# Lab CC-301: Hooks Quality Gate

**Track:** Claude Code · **Module:** Hooks — Automating Quality Gates
**Difficulty:** Intermediate · **Time:** ~40 min · **Points:** 250

---

> ## ⚡ Claude Code Setup — One-Time Only
>
> Claude Code is pre-configured automatically via your **LAB_TOKEN** Codespace secret.
>
> **First time?** Do this once:
> 1. Go to **[ai-coding.guru/settings](https://ai-coding.guru/settings) → API Keys** and copy your Lab Token
> 2. Add it at **[github.com/settings/codespaces](https://github.com/settings/codespaces)** — secret name: `LAB_TOKEN`
> 3. Rebuild this Codespace — Claude Code will be ready automatically for every lab
>
> **Already set up?** Just run `claude` — no login needed.
>
> **Claude asking for login?** Re-run setup manually: `bash /workspaces/ai-coding-lab-exercises/scripts/setup-claude.sh`

---

## What You'll Build

A set of Claude Code hooks that automatically enforce quality standards every time Claude Code edits a file:

1. A **PostToolUse hook** that runs the linter after every file edit
2. A **PreToolUse hook** that blocks dangerous shell commands before they execute

---

## The Project

A small calculator module with one unimplemented function (`modulo`). Claude Code will implement it — your hooks will fire when it does.

```
src/calculator.js       — calculator functions (Claude will edit this)
tests/calculator.test.js — tests (modulo test currently fails)
scripts/lint.js          — simple linter (checks for console.log in src/)
package.json
```

Run the tests to see the starting state:
```bash
npm test
# modulo test will fail — that's expected
```

---

## Tasks

### Task 1 — Create the settings file

Create `.claude/settings.json` (the hooks live here):

```bash
mkdir -p .claude
touch .claude/settings.json
```

Start with an empty hooks config:

```json
{
  "hooks": {}
}
```

---

### Task 2 — Add a PostToolUse lint hook

Add a hook that runs the linter every time Claude Code writes a file.

**Add this to `.claude/settings.json`:**

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit|MultiEdit",
        "hooks": [
          {
            "type": "command",
            "command": "node scripts/lint.js"
          }
        ]
      }
    ]
  }
}
```

**Test it:**

Start Claude Code and ask it to implement `modulo`:

```bash
claude
```

```
Implement the modulo function in src/calculator.js
```

Watch the terminal. After Claude Code writes the file, you should see `Lint passed ✓` printed automatically.

> **Tip:** If Claude Code adds a `console.log` for debugging, your hook will print `Lint failed` — Claude Code will see this output and remove the console.log automatically.

---

### Task 3 — Add a PreToolUse block hook

Add a hook that blocks any Bash command containing `rm -rf` before it runs.

**Create `scripts/guard.sh`:**

```bash
#!/bin/bash
# Reads the tool input from stdin and blocks dangerous rm commands
INPUT=$(cat)
if echo "$INPUT" | grep -q "rm -rf"; then
  echo "BLOCKED: rm -rf is not allowed in this project" >&2
  exit 2
fi
exit 0
```

Make it executable:
```bash
chmod +x scripts/guard.sh
```

**Add the PreToolUse hook to `.claude/settings.json`:**

```json
{
  "hooks": {
    "PostToolUse": [ ... ],
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bash scripts/guard.sh"
          }
        ]
      }
    ]
  }
}
```

> **Exit code 2** tells Claude Code the tool was blocked (not just failed). Claude Code will stop and report it was blocked.

**Test it:**

```
Try running: rm -rf node_modules
```

You should see Claude Code report that the command was blocked.

---

### Task 4 — Ask Claude Code to fix the failing test

With your hooks in place, ask Claude Code to make all tests pass:

```
Make the modulo function pass the test in tests/calculator.test.js
```

Observe:
- The lint hook fires after every file edit
- Claude Code receives lint output and adjusts if needed
- All 6 tests pass at the end

Run tests to confirm:
```bash
npm test
```

---

## Done When

- [ ] `.claude/settings.json` has both `PostToolUse` (lint) and `PreToolUse` (guard) hooks
- [ ] `rm -rf` commands are blocked by the guard hook
- [ ] Lint hook fires automatically after file edits
- [ ] `npm test` passes (all 6 tests including `modulo`)

```bash
npm test
# ✓ add
# ✓ subtract
# ✓ multiply
# ✓ divide
# ✓ divide by zero throws
# ✓ modulo
```
