FROM mcr.microsoft.com/devcontainers/javascript-node:22

# Install Python (needed for aider)
RUN apt-get update && apt-get install -y python3 python3-pip python3-venv && rm -rf /var/lib/apt/lists/*

# Install AI coding CLI tools
RUN npm install -g @google/gemini-cli 2>/dev/null || echo "gemini-cli: will install at runtime"
RUN npm install -g @anthropic-ai/claude-code
RUN npm install -g @openai/codex 2>/dev/null || echo "codex: will install at runtime"

# Install aider (works with Groq, DeepSeek, any OpenAI-compatible API)
RUN python3 -m pip install --break-system-packages aider-chat 2>/dev/null || echo "aider: will install at runtime"

# Install lab dependencies
WORKDIR /workspaces
