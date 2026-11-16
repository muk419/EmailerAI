# Emailer AI

A single-file tool to turn a content brief (or a design image) into ready-to-send
**email HTML** — with a live preview, chat-based editing, and one-click download.

## Use it

- **Live site:** your Vercel URL
- **Locally:** just open `index.html` in a browser (double-click). No install, no build.

## How it works

1. **Upload brief / image** (or paste a brief into the box).
   - Text brief (`.txt/.md/.csv`) → parsed into the email template.
   - Design image (`.jpg/.png`) → AI rebuilds it as email HTML.
2. **Generate** → see the rendered email on the right (toggle to view raw HTML).
3. **Chat edits** → change links, text, colours, widths — or any plain-English
   instruction (AI).
4. **Copy HTML** / **Download .html** → paste into any email platform.

## AI features (chat + image-to-email)

Rule-based edits (links, text replace, colours, image swaps, widths) work with
**no API key**. Free-form AI edits need Claude. There are two ways:

### Deployed (recommended) — no key pasting

Set an environment variable in **Vercel → Project → Settings → Environment
Variables**:

| Name | Value |
|------|-------|
| `ANTHROPIC_API_KEY` | your Anthropic API key (`sk-ant-…`) |

The browser calls `/api/edit` (see [`api/edit.js`](api/edit.js)), which adds the
key server-side. The key is **never** exposed to visitors. Redeploy after adding it.

### Local file — paste a key

When you open `index.html` directly (no server), paste your key into the box on
the **Chat** tab. It is stored only in your browser.

## Deploy

Static site + one serverless function — Vercel auto-detects it:

- **Framework preset:** Other
- **Root directory:** repo root
- No build command needed.
- Add the `ANTHROPIC_API_KEY` env var (above) for AI features.
