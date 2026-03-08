# Lab CC-401: Build Custom Slash Commands

**Track:** Claude Code · **Module:** Skills & Custom Slash Commands
**Difficulty:** Intermediate · **Time:** ~35 min · **Points:** 200

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

Two reusable Claude Code skills that you'll use on this project — and can take to any project:

1. **`/review`** — reviews a file for bugs, missing edge cases, and TODOs
2. **`/test-gen`** — generates tests for an untested file

---

## The Project

Two utility modules with intentional issues for you to discover:

```
src/
  string-utils.js   — string helpers (has bugs + edge case gaps)
  date-utils.js     — date helpers (no tests written yet)
tests/
  string-utils.test.js  — partial tests
```

Run the existing tests:
```bash
npm test
```

---

## Tasks

### Task 1 — Create the skills directory

Skills live in `.claude/skills/`. Each skill is a folder with a `SKILL.md` file.

```bash
mkdir -p .claude/skills/review
mkdir -p .claude/skills/test-gen
```

---

### Task 2 — Build the `/review` skill

Create `.claude/skills/review/SKILL.md`:

```markdown
---
name: review
description: Review a file for bugs, missing edge cases, null checks, and TODOs
argument-hint: <file>
user-invocable: true
allowed-tools: Read, Grep
---

Review the file provided as the argument (or ask which file if none given).

For each issue found, output:
- **Bug**: A defect that will cause a crash or wrong result
- **Edge case**: An input the function doesn't handle correctly
- **TODO**: An incomplete implementation noted in comments

For each issue include:
1. The function name
2. The specific input that triggers the issue
3. What happens currently vs what should happen

End with a count: "Found X bugs, Y edge cases, Z TODOs."

Do not fix anything — just report.
```

**Test it:**

```bash
claude
```

```
/review src/string-utils.js
```

Expected output: should find at least 2 bugs (null input to `truncate`, empty string to `capitalize`) and 2 TODOs.

---

### Task 3 — Build the `/test-gen` skill

Create `.claude/skills/test-gen/SKILL.md`:

```markdown
---
name: test-gen
description: Generate comprehensive tests for a source file
argument-hint: <file>
user-invocable: true
allowed-tools: Read, Write
---

Read the source file given as the argument.

For each exported function, write tests that cover:
1. The happy path (normal input, expected output)
2. Edge cases (empty input, zero, negative numbers, boundary values)
3. Error cases (null/undefined input where relevant)

Write the tests to a new file: tests/<filename>.test.js

Use Node.js built-in test runner syntax:
```js
const { test, describe } = require('node:test');
const assert = require('node:assert');
```

After writing, run `npm test` to verify the tests pass.
```

**Test it:**

```
/test-gen src/date-utils.js
```

This should create `tests/date-utils.test.js` and run it. All 4 functions should have tests.

---

### Task 4 — Use `/review` to find and fix the bugs

Now run your `/review` skill on `string-utils.js` and fix the issues Claude Code reports:

```
/review src/string-utils.js
```

Then:
```
Fix all the bugs found in the review
```

Run tests after:
```bash
npm test
```

---

### Stretch Goal — Parameterise the `/review` skill

Update your `/review` SKILL.md to accept an optional `--fix` flag:

```
/review src/string-utils.js --fix
```

When `--fix` is passed, after reporting issues, fix them all in one pass.

> **Hint:** Add to the SKILL.md: "If the argument contains `--fix`, fix all bugs and edge cases after reporting them. Run tests when done."

---

## Done When

- [ ] `.claude/skills/review/SKILL.md` exists and `/review` works
- [ ] `.claude/skills/test-gen/SKILL.md` exists and `/test-gen` works
- [ ] `tests/date-utils.test.js` generated and passes
- [ ] Bugs in `string-utils.js` are fixed
- [ ] `npm test` passes (all tests in both test files)

```bash
npm test
```
