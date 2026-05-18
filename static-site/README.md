# BovineID Ops — Static Site

Pure HTML / CSS / vanilla JS / JSON version of the BovineID Ops UI. No build step, no dependencies.

## Files

- `index.html`, `capture.html`, `verify.html`, `sync.html`, `history.html`, `support.html` — one file per page
- `styles.css` — shared theme (colors, typography, layout, responsive)
- `app.js` — shared header/footer injection, accessibility bar, data loading, page renderers
- `data.json` — all dynamic content (stats, feed, devices, clusters, history rows, FAQs)
- `vercel.json` — clean URLs (`/about` serves `about.html`)

## Deploy to Vercel

1. Push the repo to Git (GitHub / GitLab / Bitbucket).
2. In Vercel, **Import Project** and pick this repo.
3. Configure:
   - **Root Directory**: `static-site`
   - **Framework Preset**: `Other`
   - **Build Command**: *(leave blank)*
   - **Output Directory**: *(leave blank)*
   - **Install Command**: *(leave blank)*
4. Deploy. Vercel serves the folder as static files and uses `vercel.json` for clean URLs.

## Local preview

Any static server works:

```bash
cd static-site
python3 -m http.server 8080
# open http://localhost:8080
```

No npm, no bundler, no framework.