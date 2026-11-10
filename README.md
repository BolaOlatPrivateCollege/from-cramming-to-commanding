# From Cramming to Commanding — landing page

A static, single-page site for selling the book to Bola-Olat Private College families.

No build step, no dependencies. Open `index.html` or upload the folder to any host.

## Live site

**Share this link:** https://from-cramming-to-commanding.netlify.app/

- Primary host: Netlify (project `from-cramming-to-commanding`, team `BOPC`)
- Mirror host: https://bolaolatprivatecollege.github.io/from-cramming-to-commanding/
- Repository: https://github.com/BolaOlatPrivateCollege/from-cramming-to-commanding

The Netlify link is the one to give to parents. GitHub Pages serves the same files,
but some networks (including the one this site was built on) block the
`*.github.io` address range, so that URL can be unreachable for some visitors.
The canonical, `og:url`, `og:image` and `twitter:image` tags all point at the
Netlify address.

## Files

```
index.html        Page content and structure
styles.css        All styling and responsive layout
script.js         Menu, scroll reveals, copy buttons, reference builder, FAQ
assets/
  book-cover.jpg  Web-optimised book cover (900 × 1272)
  author.jpg      Web-optimised author photo (900 × 985)
  favicon.svg     Browser icon
  original/       Full-resolution source images (not used by the page)
```

## Run locally

The copy buttons need a real web origin (not a `file://` path). From this folder:

```powershell
python -m http.server 4173
```

Then open `http://localhost:4173`.

## Edit before publishing

| What | Where |
| --- | --- |
| Price (hero, offer, final CTA, meta description) | Search `2,000` and `3,000` in `index.html` |
| Bank details | `.pay-details` in `index.html` |
| Default reference example | `#refText` in `index.html` **and** `SAMPLE_REFERENCE` in `script.js` |
| Account number used by the copy button | `#accountNumber` in `index.html` |
| FAQ answers | `.faq` section in `index.html` |
| Author bio | `.author` section in `index.html` |
| Social share image | `og:image` in the `<head>` — already set to the live Netlify URL |
| Structured data price | JSON-LD block at the bottom of `index.html` |

## Replace the photos

Drop new files into `assets/` using the same names (`book-cover.jpg`, `author.jpg`) and update the `width`/`height` attributes in `index.html` to the new pixel dimensions. Keep the cover around 900 px wide and compress it to roughly 300–400 KB.

## Publish

Two hosts are already live and serve the same files:

- **Netlify (primary)** — project `from-cramming-to-commanding`. To update, go to the
  project's **Deploys** tab and drop a fresh zip of the site, or drag the folder onto
  https://app.netlify.com/drop again.
- **GitHub Pages (mirror)** — push to `main` and Pages redeploys automatically.

**What to include in the zip:** `index.html`, `styles.css`, `script.js` and `assets/`
(only `book-cover.jpg`, `author.jpg` and `favicon.svg` — not `assets/original/`).
Keep `index.html` at the top level of the zip, not inside a subfolder.

Other static hosts work too: Cloudflare Pages, Vercel, or the school's cPanel web root.

If you ever move to a custom domain, update `og:url`, `og:image`, `twitter:image`,
`canonical` and the JSON-LD `image` so WhatsApp and Facebook previews still show the cover.

## Notes

- Fonts load from Google Fonts. Offline, the page falls back to system serif/sans fonts.
- Motion respects `prefers-reduced-motion`.
- The page has been checked at 1440, 1180, 1024, 820, 390 and 360 px with no horizontal overflow.
- Lighthouse (desktop): Accessibility 100, Best Practices 100, SEO 100.
