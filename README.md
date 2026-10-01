# aiman-khan.github.io

Personal portfolio of Aiman Sartaj — https://aiman-khan.github.io/

Plain HTML, CSS and JavaScript. No framework, no build step: edit a file, push to `main`, and GitHub Pages deploys it.

```
index.html          the whole site (sections + one <dialog> case study per project)
css/style.css       all styles; colours and fonts are tokens at the top
js/main.js          theme toggle, menu, scroll reveals, case-study dialogs
assets/img/         project images (WebP, 720px and 1440px wide)
project-N.html      redirects from the old case-study URLs
404.html            not-found page
```

## Preview locally

```
python3 -m http.server 8000
```

then open http://localhost:8000.

## Add a real screenshot to a project

Quickers Venture, Skill Nova and Lucentum currently use illustrations.

1. Export the screenshot as WebP, about 1440px wide, into `assets/img/`.
2. In `index.html`, find the project's two `<div class="stage">` blocks (one in its card, one in its `<dialog>`).
3. Replace the `<svg>…</svg>` inside each with:

```html
<img src="assets/img/quickers-1440.webp" width="1440" height="990" alt="Quickers Venture dashboard" loading="lazy" decoding="async">
```

## Add a project

Copy an `<article class="card">` and its matching `<dialog class="cs">`, give both the same slug
(`id="my-project"` and `id="cs-my-project"`, `data-open="my-project"`), and set `--hue` to the project's colour (0–360).
