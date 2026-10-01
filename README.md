# Aiman Sartaj portfolio (aiman-khan.github.io) — setup notes

Rebuilt 2026-10-02. Replaces the old "dopefolio" template site.

## What it is

- Static site for GitHub Pages user repo `aiman-khan/aiman-khan.github.io` → https://aiman-khan.github.io/
- Plain HTML/CSS/JS, no framework, no build step. Deploy = push to `main` (workflow `.github/workflows/static.yml`, actions v4/v5/v3/v4).
- Files: `index.html` (everything, one `<dialog class="cs">` case study per project), `css/style.css` (tokens at top), `js/main.js`, `assets/img/*.webp`, `project-1..5.html` (redirects from old case-study URLs to `/#slug`), `404.html`, `favicon.svg`, `apple-touch-icon.png`, `assets/og.png`, `robots.txt`, `sitemap.xml`.

## Decisions (from Aiman)

- Dark theme by default with a light toggle (follows system on first visit, remembered in localStorage).
- Headline role: Senior Software Engineer; "4+ years" of experience.
- Contact: email button + copy (aiman.dev.s@gmail.com) and LinkedIn/GitHub/Medium. No form.

## Design

- Fonts: Geist (UI), Instrument Serif italic (accent words), Geist Mono (labels/code) via Google Fonts, loaded non-blocking.
- Accent: iris `#9a8bff` → mint `#46e0c1` gradient. Each project card has its own `--hue` for the image stage.
- Project order: Quickers Venture, Skill Nova, Lucentum, TMIDirect, B2B Connect, Pirata, Breather, Rigel.

## Open items

- Quickers Venture, Skill Nova, Lucentum use SVG illustrations; real screenshots to come (swap the `<svg>` in the card and dialog `.stage` for an `<img>`; see README in the repo).
- Tech stack for those three is not stated (shown as "Focus areas"); Aiman's exact role on each not stated.
- No work-history/experience timeline or résumé PDF yet — needs employers, titles, dates from Aiman.
- "Open to new projects & roles" badge in the hero is an assumption; remove if not true.
- Fonts could be self-hosted (woff2) for one less third-party connection.
