# $VERITY

Single-page landing site for $VERITY — analog-horror / glitchy-AI / retro-yellow-smiley memecoin.

Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + Lucide icons.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000. `npm run build` produces the production build; `npm run lint` runs ESLint.

## Where to edit things

- **`config/site.ts`** — nav links, social links, the fake contract address, tokenomics stats, lore terminal lines, and the "Ask Verity" glitchy responses.
- **`app/globals.css`** — color theme (`--color-verity-bg`, `--color-verity-yellow`, `--color-verity-red`), CRT scanline/vignette overlay, glitch text animation.

## Image assets

No real project artwork was supplied for this build. The hero "sphere" is a pulsing placeholder `div` (glow via Framer Motion) — swap it for real art in `components/Hero.tsx`. `public/images/social-preview.svg` is a placeholder Open Graph image.

## Structure

```
app/            layout.tsx (font, SEO/OG metadata), page.tsx (section order), globals.css (theme + effects)
app/api/        verity/ (chat terminal API), cron/verity-bot/ (X reply bot)
components/     Navbar, Hero, CopyAddress, AboutTerminal, Tokenomics, AskVerity, Footer
config/         site.ts — nav/social links, contract address, tokenomics, lore + terminal copy
lib/            verity-persona.ts — the shared VERITY system prompt used by both the chat terminal and the X bot
```

## Ask Verity (live chat terminal)

The hero's chat terminal calls `app/api/verity/route.ts`, which sends the user's message to Claude Haiku with the VERITY persona and returns a short in-character reply. Requires `ANTHROPIC_API_KEY` set as an environment variable (see `.env.example`) — without it, the terminal falls back to the canned responses in `config/site.ts`.

## X reply bot

`app/api/cron/verity-bot/route.ts` checks @VERITYtoken_'s recent mentions on X and replies to new ones in-character via Claude Haiku, using `twitter-api-v2` with OAuth 1.0a. It's protected by a shared secret — only requests carrying `Authorization: Bearer <CRON_SECRET>` are processed.

**Setup:**

1. Create an X developer app (developer.x.com) for @VERITYtoken_ with **Read and write** permissions, and generate API Key/Secret + Access Token/Secret while authenticated as that account. Reading the mentions timeline typically requires at least the paid Basic API tier — check current pricing before assuming the Free tier covers it.
2. In Vercel (Project Settings → Environment Variables), set `X_API_KEY`, `X_API_SECRET`, `X_ACCESS_TOKEN`, `X_ACCESS_SECRET`, and `CRON_SECRET` (any random string — `openssl rand -hex 32`), alongside the existing `ANTHROPIC_API_KEY`.
3. **Scheduling** is handled by [Upstash QStash](https://console.upstash.com) rather than a cron job in this repo: create a Schedule pointing at `https://<your-domain>/api/cron/verity-bot`, method `POST`, with a custom header `Authorization: Bearer <same CRON_SECRET>`. QStash's free tier supports polling every 1-2 minutes; check its current daily-request quota before picking the interval.
4. `.github/workflows/verity-bot-cron.yml` is kept for manual/on-demand runs only (`workflow_dispatch`) — trigger it from the repo's Actions tab to test without waiting for the schedule. It needs `VERITY_BOT_URL` and `CRON_SECRET` set as GitHub Actions repo secrets.
