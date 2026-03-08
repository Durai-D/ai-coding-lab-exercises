# Devcontainer Standards — AI Coding Lab Exercises

Reference for anyone adding or maintaining lab devcontainers in this repo.

---

## API Key Security Model

**The API key (`ANTHROPIC_API_KEY`) is NEVER stored in code or devcontainer files.**

It is stored as a **GitHub Codespace repository secret** and automatically injected into every Codespace at runtime.

### One-time setup (repo admin only)
1. Go to: **github.com/sanjeev23oct/ai-coding-lab-exercises → Settings → Secrets and variables → Codespaces → New repository secret**
2. Name: `ANTHROPIC_API_KEY` · Value: the current LiteLLM proxy key

GitHub injects this as an environment variable into every Codespace — students never see it.

### How the key reaches Claude Code
The `postStartCommand` in each devcontainer runs on every Codespace start and writes the key into Claude Code's config using `$ANTHROPIC_API_KEY` from the environment:

```bash
printf '{"hasCompletedOnboarding":true,"numStartups":3,"installMethod":"global","oauthAccount":null,"primaryApiKey":"%s"}' "$ANTHROPIC_API_KEY" > ~/.claude.json && \
mkdir -p ~/.claude && \
printf '{"env":{"ANTHROPIC_API_KEY":"%s","ANTHROPIC_BASE_URL":"https://litellm-anthropic-proxy-production.up.railway.app"}}' "$ANTHROPIC_API_KEY" > ~/.claude/settings.json
```

To rotate the key: update Railway env var + update the GitHub repo secret. No code changes needed.

---

## Canonical Path Rule

GitHub Codespaces **only** discovers devcontainers at:
```
.devcontainer/<lab-name>/devcontainer.json
```
Files at `labs/<name>/.devcontainer/` are **invisible** to Codespaces. Always use the canonical path.

---

## Required Fields

Every CC lab devcontainer must have **all** of the following:

### 1. `image` — use the pre-built image, never `build`
```json
"image": "ghcr.io/sanjeev23oct/ailab-cc-base:latest"
```
> Do NOT use `"build": { "dockerfile": ... }` — it rebuilds from scratch on every Codespace creation (2-3 min penalty). The pre-built image has Claude Code pre-installed.

### 2. `postStartCommand` — writes Claude Code config at runtime using env var
```json
"postStartCommand": "printf '{\"hasCompletedOnboarding\":true,\"numStartups\":3,\"installMethod\":\"global\",\"oauthAccount\":null,\"primaryApiKey\":\"%s\"}' \"$ANTHROPIC_API_KEY\" > ~/.claude.json && mkdir -p ~/.claude && printf '{\"env\":{\"ANTHROPIC_API_KEY\":\"%s\",\"ANTHROPIC_BASE_URL\":\"https://litellm-anthropic-proxy-production.up.railway.app\"}}' \"$ANTHROPIC_API_KEY\" > ~/.claude/settings.json"
```
> Uses `printf` + `%s` + `"$ANTHROPIC_API_KEY"` so the key expands from the Codespace secret at runtime. Never hardcode the key here.

### 3. `postCreateCommand` — sets ANTHROPIC_BASE_URL for interactive shells
```json
"postCreateCommand": "echo 'export ANTHROPIC_BASE_URL=https://litellm-anthropic-proxy-production.up.railway.app' >> ~/.bashrc"
```
> `ANTHROPIC_API_KEY` is NOT exported to `.bashrc` — it comes from the Codespace secret.

### 4. `postAttachCommand` — opens the lab README when VS Code connects
```json
"postAttachCommand": "code /workspaces/ai-coding-lab-exercises/labs/<lab-name>/README.md"
```
> Must be `postAttachCommand` (not `postStartCommand`). VS Code client is not attached during `postStartCommand`, so `code <file>` silently does nothing there.

### 5. `remoteEnv` — only ANTHROPIC_BASE_URL (key comes from secret)
```json
"remoteEnv": {
  "ANTHROPIC_BASE_URL": "https://litellm-anthropic-proxy-production.up.railway.app"
}
```
> `ANTHROPIC_API_KEY` is intentionally absent — it is injected by GitHub from the repo secret.

### 6. `extensions`
```json
"extensions": [
  "anthropic.claude-code",
  "RooVeterinaryInc.roo-cline",
  "dbaeumer.vscode-eslint",
  "esbenp.prettier-vscode"
]
```

### 7. `settings`
```json
"settings": {
  "terminal.integrated.defaultProfile.linux": "bash",
  "claudeCode.disableLoginPrompt": true,
  "roo-cline.apiProvider": "anthropic",
  "roo-cline.apiModelId": "claude-sonnet-4-6",
  "roo-cline.anthropicBaseUrl": "https://litellm-anthropic-proxy-production.up.railway.app",
  "workbench.editorAssociations": {
    "**/README.md": "vscode.markdown.preview.editor"
  }
}
```

### 8. `openFiles` — full workspace-relative path
```json
"codespaces": {
  "openFiles": ["labs/lab-cc-XXX-slug/README.md"]
}
```

### 9. `forwardPorts`
```json
"forwardPorts": [3000]
```

---

## Full Example

```json
{
  "name": "Lab CC-101: Claude Code First Session",

  "image": "ghcr.io/sanjeev23oct/ailab-cc-base:latest",

  "postCreateCommand": "echo 'export ANTHROPIC_BASE_URL=https://litellm-anthropic-proxy-production.up.railway.app' >> ~/.bashrc",

  "postStartCommand": "printf '{\"hasCompletedOnboarding\":true,\"numStartups\":3,\"installMethod\":\"global\",\"oauthAccount\":null,\"primaryApiKey\":\"%s\"}' \"$ANTHROPIC_API_KEY\" > ~/.claude.json && mkdir -p ~/.claude && printf '{\"env\":{\"ANTHROPIC_API_KEY\":\"%s\",\"ANTHROPIC_BASE_URL\":\"https://litellm-anthropic-proxy-production.up.railway.app\"}}' \"$ANTHROPIC_API_KEY\" > ~/.claude/settings.json",

  "postAttachCommand": "code /workspaces/ai-coding-lab-exercises/labs/lab-cc-101-first-session/README.md",

  "remoteEnv": {
    "ANTHROPIC_BASE_URL": "https://litellm-anthropic-proxy-production.up.railway.app"
  },

  "customizations": {
    "vscode": {
      "extensions": [
        "anthropic.claude-code",
        "RooVeterinaryInc.roo-cline",
        "dbaeumer.vscode-eslint",
        "esbenp.prettier-vscode"
      ],
      "settings": {
        "terminal.integrated.defaultProfile.linux": "bash",
        "claudeCode.disableLoginPrompt": true,
        "roo-cline.apiProvider": "anthropic",
        "roo-cline.apiModelId": "claude-sonnet-4-6",
        "roo-cline.anthropicBaseUrl": "https://litellm-anthropic-proxy-production.up.railway.app",
        "workbench.editorAssociations": {
          "**/README.md": "vscode.markdown.preview.editor"
        }
      }
    },
    "codespaces": {
      "openFiles": ["labs/lab-cc-101-first-session/README.md"]
    }
  },

  "forwardPorts": [3000]
}
```

---

## Common Mistakes

| Mistake | Effect | Fix |
|---------|--------|-----|
| `"ANTHROPIC_API_KEY"` in `remoteEnv` or code | Key visible in public repo | Remove — key comes from GitHub repo secret |
| `"build": { "dockerfile": ... }` | Rebuilds image on every Codespace (~2-3 min) | Use `"image": "ghcr.io/sanjeev23oct/ailab-cc-base:latest"` |
| `code <file>` in `postStartCommand` | Silent failure — VS Code not attached yet | Use `postAttachCommand` for `code` commands |
| `code --install-extension` in `postCreateCommand` | Red X / postCreate fails | Remove — extensions install via `customizations` |
| `npm install -g @anthropic-ai/claude-code` anywhere | 2-3 min startup delay | Claude Code is pre-baked in the image |
| `openFiles: ["README.md"]` | Opens repo root README | Use full path: `"labs/lab-cc-XXX/README.md"` |
| Devcontainer at `labs/<name>/.devcontainer/` | Codespaces ignores it | Place at `.devcontainer/<lab-name>/devcontainer.json` |
| Single quotes around `$ANTHROPIC_API_KEY` in postStartCommand | Key not expanded (writes literal `$ANTHROPIC_API_KEY`) | Use `printf '...' "$ANTHROPIC_API_KEY"` pattern |

---

## Testing a New Devcontainer

1. Add GitHub repo secret `ANTHROPIC_API_KEY` (if not already set)
2. Push devcontainer to `.devcontainer/<lab-name>/devcontainer.json` on `main`
3. Go to GitHub → Code → Codespaces → New codespace with options → select the lab config
4. After Codespace opens, verify:
   - Lab README opens automatically in preview mode
   - `claude --version` works in a new terminal
   - `claude "say hello"` returns a real AI response (not a login prompt)
   - Roo Code (🦘) icon appears in the left sidebar

---

## Troubleshooting

### Claude Code asks for login
`postStartCommand` may have failed. Run in the terminal:
```bash
printf '{"hasCompletedOnboarding":true,"numStartups":3,"installMethod":"global","oauthAccount":null,"primaryApiKey":"%s"}' "$ANTHROPIC_API_KEY" > ~/.claude.json
mkdir -p ~/.claude
printf '{"env":{"ANTHROPIC_API_KEY":"%s","ANTHROPIC_BASE_URL":"https://litellm-anthropic-proxy-production.up.railway.app"}}' "$ANTHROPIC_API_KEY" > ~/.claude/settings.json
```
Then: `Ctrl+Shift+P` → "Developer: Reload Window"

### Wrong README opens
Check `codespaces.openFiles` — path must be workspace-relative (e.g. `labs/lab-cc-101-first-session/README.md`, not just `README.md`).

### API errors / quota exceeded
The shared proxy has a global spend limit. If errors persist, wait a few minutes. Heavy usage may exhaust the budget.
