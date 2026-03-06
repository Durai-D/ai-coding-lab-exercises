FROM mcr.microsoft.com/devcontainers/javascript-node:22

# Pre-bake Claude Code so Codespace creation pulls a cached layer (~15-30s) instead of installing at runtime (~2-3 min)
RUN npm install -g @anthropic-ai/claude-code

# Bake Claude proxy config into the image so it's available before any terminal opens.
# The ANTHROPIC_API_KEY and ANTHROPIC_BASE_URL env vars are also set via remoteEnv in
# each devcontainer.json, but having them here ensures the CLI never prompts for login.
ENV ANTHROPIC_API_KEY=lab-ai-coding-2026
ENV ANTHROPIC_BASE_URL=https://litellm-anthropic-proxy-production.up.railway.app

# Write ~/.claude.json and ~/.claude/settings.json for the node user
RUN mkdir -p /home/node/.claude && \
    echo '{"hasCompletedOnboarding":true,"numStartups":3,"installMethod":"global","oauthAccount":null,"primaryApiKey":"lab-ai-coding-2026"}' > /home/node/.claude.json && \
    echo '{"env":{"ANTHROPIC_API_KEY":"lab-ai-coding-2026","ANTHROPIC_BASE_URL":"https://litellm-anthropic-proxy-production.up.railway.app"}}' > /home/node/.claude/settings.json && \
    chown -R node:node /home/node/.claude.json /home/node/.claude

# Also write for root in case Codespace runs as root
RUN mkdir -p /root/.claude && \
    echo '{"hasCompletedOnboarding":true,"numStartups":3,"installMethod":"global","oauthAccount":null,"primaryApiKey":"lab-ai-coding-2026"}' > /root/.claude.json && \
    echo '{"env":{"ANTHROPIC_API_KEY":"lab-ai-coding-2026","ANTHROPIC_BASE_URL":"https://litellm-anthropic-proxy-production.up.railway.app"}}' > /root/.claude/settings.json
