FROM mcr.microsoft.com/devcontainers/javascript-node:22

# Pre-bake Claude Code so Codespace creation pulls a cached layer (~15-30s) instead of installing at runtime (~2-3 min)
RUN npm install -g @anthropic-ai/claude-code

# Bake env vars into /etc/environment so they are available to ALL users/processes
# including the Codespace user (vscode/codespace) before any terminal opens
RUN echo 'ANTHROPIC_API_KEY=lab-ai-coding-2026' >> /etc/environment && \
    echo 'ANTHROPIC_BASE_URL=https://litellm-anthropic-proxy-production.up.railway.app' >> /etc/environment

# Also add to /etc/profile.d so interactive shells pick them up
RUN echo 'export ANTHROPIC_API_KEY=lab-ai-coding-2026' > /etc/profile.d/claude-proxy.sh && \
    echo 'export ANTHROPIC_BASE_URL=https://litellm-anthropic-proxy-production.up.railway.app' >> /etc/profile.d/claude-proxy.sh

# Write claude config for all known home dirs (node, root, codespace, vscode)
RUN for HOME_DIR in /home/node /home/codespace /home/vscode /root; do \
    mkdir -p "$HOME_DIR/.claude" && \
    echo '{"hasCompletedOnboarding":true,"numStartups":3,"installMethod":"global","oauthAccount":null,"primaryApiKey":"lab-ai-coding-2026"}' > "$HOME_DIR/.claude.json" && \
    echo '{"env":{"ANTHROPIC_API_KEY":"lab-ai-coding-2026","ANTHROPIC_BASE_URL":"https://litellm-anthropic-proxy-production.up.railway.app"}}' > "$HOME_DIR/.claude/settings.json" && \
    chmod -R 777 "$HOME_DIR/.claude.json" "$HOME_DIR/.claude"; \
    done || true
