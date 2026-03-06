# Codespace Startup Speed — Investigation Log

## Problem
GitHub Codespaces for CC labs take 3+ minutes to start. Students wait too long before they can begin a lab.

---

## Attempts Summary

### Attempt 1 — Root `.devcontainer/Dockerfile` ❌ IRRELEVANT
**What**: Pre-install Claude Code in the root devcontainer Dockerfile.
**Why it failed**: All CC lab devcontainers use their own `.devcontainer/devcontainer.json` with an `image:` field directly. The root `.devcontainer/Dockerfile` is completely bypassed for these labs.
**Status**: Root Dockerfile was cleaned up (silent failure suppression removed) but has no effect on CC labs.

---

### Attempt 2 — `"build":` block in devcontainer.json ❌ DOESN'T HELP CODESPACE
**What**: Created `labs/Dockerfile` (Node 22 + Claude Code pre-baked). Changed devcontainer.json from `image:` to `build: { dockerfile, context }`.
**Why it failed**: GitHub Codespaces always rebuilds from the Dockerfile when `"build":` is present — it does NOT use Docker layer cache from any registry. `cacheFrom` in `devcontainer.json` helps CI builds only, not Codespace creation.
**Side bug introduced**: `dockerfile: "Dockerfile"` resolves relative to `.devcontainer/`, not the `context`. Had to use `../../Dockerfile`. Caused CI failure `ENOENT: no such file or directory`.
**Status**: Reverted. Switched to `image:`.

---

### Attempt 3 — `devcontainers/ci` GitHub Actions workflow ❌ WRONG TOOL
**What**: Used the official `devcontainers/ci` action to prebuild.
**Why it failed**: `devcontainers/ci` is for CI testing of devcontainers, not for publishing a cached image that Codespace can pull. It doesn't solve Codespace startup speed.
**Status**: Replaced with `docker/build-push-action` workflow.

---

### Attempt 4 — Custom `prebuilds.yml` + `image: ghcr.io/...` ✅ PARTIAL WIN
**What**: Created `labs/Dockerfile` (Node 22 + Claude Code). Created `.github/workflows/prebuilds.yml` using `docker/build-push-action` to build and push `ghcr.io/sanjeev23oct/ailab-cc-base:latest`. Updated all 5 devcontainer.json to use `image: ghcr.io/sanjeev23oct/ailab-cc-base:latest`.
**What it fixes**: Eliminates the runtime `npm install -g @anthropic-ai/claude-code` (~2-3 min savings). Workflow build: green. Image pushed.
**What it does NOT fix**: VS Code Server download + start (~1-2 min) and extension installation (~30-60s) remain. These are Codespace infrastructure overhead, not addressable by Docker image caching.
**Status**: ✅ In place. This is the current production state.

---

### Attempt 5 — `postStartCommand` for README opening ✅ FIXES README
**What**: Added `"postStartCommand": "code labs/lab-cc-XXX/README.md"` to all 5 devcontainer.json.
**Result**: Lab-specific README opens on every Codespace start (not just initial creation). `codespaces.openFiles` only fires on initial creation; `postStartCommand` runs on every start.
**Status**: ✅ In place.

---

## Verdict

**Current startup breakdown:**
| Phase | Time | Controllable? |
|-------|------|--------------|
| Image pull from ghcr.io | ~30-60s | ✅ Already optimized (pre-built image) |
| VS Code Server download + start | ~60-90s | ❌ GitHub infrastructure, not controllable |
| Extension installation (4 extensions) | ~30-60s | ⚠️ Could reduce by removing optional extensions |
| postCreateCommand (`npm install` for express) | ~5-10s | ✅ Already minimal |
| **Total** | **~2-4 min** | |

**Bottom line**: We've already eliminated the biggest single bottleneck (Claude Code runtime install). The remaining ~2-4 min is VS Code Server + extension overhead — this is inherent to how Codespaces works without Prebuilds.

---

## The Only Remaining Fix: GitHub Codespaces Prebuilds

GitHub's own "Codespaces Prebuilds" feature pre-runs the ENTIRE setup (VS Code Server + extensions + postCreateCommand) and saves a snapshot. Codespace creation restores from the snapshot in ~15-30 seconds.

**Setup steps:**
1. Go to repo **Settings → Codespaces → Prebuilds → New prebuild**
2. For each of the 5 CC labs, configure:
   - Branch: `main`
   - Dev container configuration: select the lab's `devcontainer.json`
   - Trigger: "On push" to `main`
3. Click **Create**

**Availability**: GitHub Codespaces Prebuilds require the repo to be in a GitHub organization with a Team or Enterprise plan, OR a paid Codespaces account. Check availability at Settings → Codespaces.

**Alternative if Prebuilds unavailable**: Reduce extensions in devcontainer.json. `dbaeumer.vscode-eslint` and `esbenp.prettier-vscode` are optional for most labs — removing them saves ~20-30s. `anthropic.claude-code` and `RooVeterinaryInc.roo-cline` are required.

---

## Do NOT Try Again
- ❌ `"build":` in devcontainer.json — Codespace always rebuilds from scratch
- ❌ `devcontainers/ci` action — wrong tool, doesn't help Codespace creation speed
- ❌ Adding `cacheFrom` to devcontainer.json — Codespace ignores it
- ❌ Pre-installing in root `.devcontainer/Dockerfile` — CC labs bypass the root devcontainer
- ❌ Any approach that relies on Docker layer caching at Codespace creation time — Codespace pulls the full image regardless (no layer-level caching benefit beyond the image itself)
