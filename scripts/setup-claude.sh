#!/bin/bash
# setup-claude.sh — Exchange LAB_TOKEN for a personal LiteLLM virtual key
# and configure Claude Code to use it via the AI Coding Lab proxy.
#
# Required Codespace secret: LAB_TOKEN  (copy from your dashboard → AI Lab Credits widget)
# Set it ONCE at github.com/settings/codespaces — works for every lab automatically.

set -e

API_URL="https://ai-coding.guru/api"
PROXY_URL="https://litellm-anthropic-proxy-production.up.railway.app"

if [ -z "$LAB_TOKEN" ]; then
  echo ""
  echo "╔══════════════════════════════════════════════════════════╗"
  echo "║  ⚠️  LAB_TOKEN not set — Claude Code won't work yet      ║"
  echo "║                                                          ║"
  echo "║  Quick fix (one-time setup):                             ║"
  echo "║  1. Go to ai-coding.guru/settings → API Keys            ║"
  echo "║  2. Copy your Lab Token                                  ║"
  echo "║  3. Add it at github.com/settings/codespaces             ║"
  echo "║     Secret name: LAB_TOKEN                               ║"
  echo "║  4. Rebuild this Codespace — you're done for all labs    ║"
  echo "╚══════════════════════════════════════════════════════════╝"
  echo ""
  exit 0
fi

echo "🔑 Fetching your personal AI key..."

RESPONSE=$(curl -sf \
  -H "X-Lab-Token: $LAB_TOKEN" \
  -H "Content-Type: application/json" \
  "${API_URL}/labs/key" 2>/dev/null || echo "")

if [ -z "$RESPONSE" ]; then
  echo "⚠️  Could not reach AI Coding Lab API. Check your internet connection."
  exit 0
fi

VIRTUAL_KEY=$(echo "$RESPONSE" | python3 -c "import sys,json; d=json.load(sys.stdin); print(d.get('data',{}).get('key',''))" 2>/dev/null || echo "")

if [ -z "$VIRTUAL_KEY" ]; then
  echo "⚠️  Could not get virtual key. Your LAB_TOKEN may be invalid — copy a fresh one from ai-coding.guru/settings → API Keys."
  exit 0
fi

# Write Claude Code config
mkdir -p ~/.claude
printf '{"hasCompletedOnboarding":true,"numStartups":3,"installMethod":"global","oauthAccount":null,"primaryApiKey":"%s"}' \
  "$VIRTUAL_KEY" > ~/.claude.json
printf '{"env":{"ANTHROPIC_API_KEY":"%s","ANTHROPIC_BASE_URL":"%s"}}' \
  "$VIRTUAL_KEY" "$PROXY_URL" > ~/.claude/settings.json

echo "✅ Claude Code configured with your personal AI key. Happy coding!"
