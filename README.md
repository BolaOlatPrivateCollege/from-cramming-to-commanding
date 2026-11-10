# From Cramming to Commanding — landing page

A static, single-page site for selling the book to Bola-Olat Private College families.

No build step, no dependencies. Open `index.html` or upload the folder to any host.

## Live site

- Page: https://bolaolatprivatecollege.github.io/from-cramming-to-commanding/
- Repository: https://github.com/BolaOlatPrivateCollege/from-cramming-to-commanding

Hosted with GitHub Pages from the `main` branch. Every push to `main` redeploys it automatically.

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
| Social share image | `og:image` in the `<head>` — already set to the live GitHub Pages URL |
| Structured data price | JSON-LD block at the bottom of `index.html` |

## Replace the photos

Drop new files into `assets/` using the same names (`book-cover.jpg`, `author.jpg`) and update the `width`/`height` attributes in `index.html` to the new pixel dimensions. Keep the cover around 900 px wide and compress it to roughly 300–400 KB.

## Publish

Any static host works:

- **Netlify Drop** — drag this folder onto https://app.netlify.com/drop
- **GitHub Pages** — push the folder to a repository, then enable Pages
- **School website / cPanel** — upload the files to the public web root

After publishing, check that `og:url` and `og:image` match the live address (they are already set for the GitHub Pages URL). If you move to a custom domain, update both so WhatsApp and Facebook previews show the cover.

## Notes

- Fonts load from Google Fonts. Offline, the page falls back to system serif/sans fonts.
- Motion respects `prefers-reduced-motion`.
- The page has been checked at 1440, 1180, 1024, 820, 390 and 360 px with no horizontal overflow.
- Lighthouse (desktop): Accessibility 100, Best Practices 100, SEO 100.
