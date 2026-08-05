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
components/     Navbar, Hero, CopyAddress, AboutTerminal, Tokenomics, AskVerity, Footer
config/         site.ts — nav/social links, contract address, tokenomics, lore + terminal copy
```
