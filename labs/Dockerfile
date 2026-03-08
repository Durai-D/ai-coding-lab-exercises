FROM mcr.microsoft.com/devcontainers/javascript-node:22

# Pre-bake Claude Code so Codespace creation pulls a cached layer (~15-30s) instead of installing at runtime (~2-3 min)
RUN npm install -g @anthropic-ai/claude-code

# Bake ANTHROPIC_BASE_URL into /etc/environment so all processes see it.
# ANTHROPIC_API_KEY is NOT baked in — it comes from the GitHub Codespace repository secret at runtime.
RUN echo 'ANTHROPIC_BASE_URL=https://litellm-anthropic-proxy-production.up.railway.app' >> /etc/environment

# Also add to /etc/profile.d so interactive shells pick it up
RUN echo 'export ANTHROPIC_BASE_URL=https://litellm-anthropic-proxy-production.up.railway.app' > /etc/profile.d/claude-proxy.sh

# Pre-create .claude directories so postStartCommand can write config at runtime
RUN for HOME_DIR in /home/node /home/codespace /home/vscode /root; do \
    mkdir -p "$HOME_DIR/.claude" && \
    chmod -R 777 "$HOME_DIR/.claude"; \
    done || true
