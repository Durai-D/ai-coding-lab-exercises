# Lab Vibe-902: Prototype a SaaS Landing Page

> **Vibe Coding Trail · Intermediate · ~35 min · 200 XP**

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

## The Vibe

You're a founder. You've just had the idea. You need a landing page up today — not next sprint, not after the design review, **today**.

You have a product description. Claude Code builds the page. You iterate until it converts.

---

## Your Product

> *"TaskFlow AI — an AI-powered project management tool that automatically prioritises your tasks based on deadlines, dependencies, and your work patterns. It learns how you work and tells you exactly what to focus on each morning."*

That's your product. Two sentences. Build a landing page that makes someone want to sign up.

---

## What the Page Needs

A great SaaS landing page has five things:

1. **Hero** — headline, subheadline, CTA button ("Start free" or "Join waitlist")
2. **Problem/Solution** — 2–3 lines on the pain, then how you solve it
3. **Features** — 3 feature cards with icon, name, and one-line description
4. **Social proof** — 2–3 fake testimonials (name, role, quote)
5. **Final CTA** — bottom section with another signup prompt

---

## Step 1 — Start Claude Code

```bash
claude
```

---

## Step 2 — Give It the Brief

```
Build a complete SaaS landing page for this product:

"TaskFlow AI — an AI-powered project management tool that automatically
prioritises your tasks based on deadlines, dependencies, and your work
patterns. It learns how you work and tells you exactly what to focus on
each morning."

The page needs:
- Hero section: bold headline, subheadline, "Join waitlist" CTA button
- Problem/solution section: the pain of too many tasks, how TaskFlow AI fixes it
- 3 feature cards with icons
- 2-3 testimonials
- Footer CTA to sign up

Make it a single index.html with embedded CSS. Modern SaaS aesthetic —
clean, white with a bold accent colour, good typography. Make it look funded.
```

Preview it:

```bash
npx serve . -p 3000
```

Open the **Ports** tab → click the port 3000 link.

---

## Step 3 — Make It Look Funded

A first pass is usually functional but flat. Now push the design.

**Headline:**
```
The headline "AI-Powered Task Management" is too generic. Rewrite it to be
more specific and benefit-focused. Something like "Stop drowning in tasks.
TaskFlow AI tells you exactly what to work on next."
```

**Hero design:**
```
The hero section needs more visual impact. Add a subtle gradient background
(deep indigo to blue-black), make the headline much larger, and add a
small "No credit card required" line below the CTA button.
```

**Feature icons:**
```
Replace the emoji icons in the feature cards with clean SVG icons — use
simple geometric shapes or minimal line-art style. The cards should feel
more premium.
```

**Testimonials:**
```
The testimonials look fake. Make them feel more real:
- Specific names and job titles (e.g. "Head of Product at a Series B startup")
- Quotes that reference specific product features
- A star rating (5 stars) above each quote
```

**Social proof bar:**
```
Add a thin strip between the hero and features: "Trusted by 2,400+ teams"
with 4-5 placeholder company logos (just use well-known brand names in a
simple font, no images needed). Grey, subtle.
```

---

## Step 4 — Add One Interaction

A static HTML page is a prototype. Add one interactive element:

**Option A — Email capture:**
```
Replace the "Join waitlist" button with an actual email input + button.
When submitted, show a success message: "You're on the list! We'll be in
touch soon." Don't submit anywhere — just handle it client-side.
```

**Option B — FAQ accordion:**
```
Add an FAQ section below the testimonials with 4 questions about the product.
Each question should expand/collapse when clicked. Only one open at a time.
```

**Option C — Pricing toggle:**
```
Add a pricing section with Monthly / Annual toggle. Monthly: $29. Annual: $19/mo
(billed annually). Toggle should switch the prices shown. Highlight the annual
plan as "Most Popular".
```

Pick one and ask Claude Code to build it.

---

## Done When

Your landing page:
- [ ] Has all 5 sections (hero, problem/solution, features, testimonials, CTA)
- [ ] Looks like a real funded product (not a template)
- [ ] Has at least one interactive element
- [ ] Runs at `http://localhost:3000`
- [ ] You'd actually show it to someone

No automated tests. Would you click "Join waitlist"? That's the bar.

---

## Troubleshooting

**`npx serve` not found**
```bash
npm install -g serve
serve . -p 3000
```

**The design looks dated**
```
The overall design feels like 2018. Update it to feel modern:
- Use Inter or a system sans-serif font
- Add more whitespace between sections
- Use a subtle box shadow on the feature cards instead of a border
- Make the CTA button use a gradient fill
```

**Sections feel disconnected**
```
Add a thin horizontal rule or a very subtle background colour alternation
between sections so the page has a clear visual rhythm.
```

---

## What You Just Practised

```
Product description → Full page build → Visual critique → Polish → Interaction
```

This is how real MVPs get made. You didn't spend three days in Figma. You described what you needed, reacted to what you got, and shipped a prototype in under an hour.

The output isn't production code. It's a prototype — something you can show investors, test with users, or hand to a developer as a visual reference.

Vibe coding is a tool. You just used it.

---

## Up Next

Head back to [ai-coding.guru](https://ai-coding.guru) to continue the Vibe Coding trail.
