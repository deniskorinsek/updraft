# Updraft-Web — the UPDRAFT promo website

Static landing page for the UPDRAFT Android game, built for GitHub Pages (repository name `updraft`). No build step, no framework, no tracking: plain HTML, CSS and JavaScript, with the fonts and art shipped in the repo.

- `index.html` — the landing page (hero with a playable feather: move to steer, hold / Space / microphone to blow, tap for a Gust, climb from golden hour to the night sky, six skins to try; how it works, flyers, the worlds ascent, Winter Winds, daily progression, privacy strip, download). The Google Play link appears in the header, the hero, after the flyers, in the download section (button, QR code and the written store link), the footer and, on phones, a sticky bar that follows the visitor once the hero scrolls away. Until the listing is live the buttons say "Coming soon to Google Play" (see the checklist below).
- `privacy.html` — privacy policy (English + Slovenian)
- `terms.html` — terms of use (English + Slovenian; a draft for a lawyer to confirm, legal review L-03)
- `support.html` — FAQ and contact (English + Slovenian)
- `404.html` — custom not-found page
- `css/site.css` — all styling; the colour and type tokens come from `design/tokens/design-tokens.json`
- `js/config.js` — **the only file you normally need to edit**: Play Store URL, support e-mail, default language
- `js/strings.js` — all landing-page copy in EN and SL
- `js/biomes.js` — the biome list for the Worlds section (from `design/specs/biomes.json`)
- `js/site.js` — behaviour: language switch, hero flight demo, parallax and scroll animations, scroll-progress feather in the nav, worlds ascent, snow, menu
- `assets/` — logos, flyer sprites, biome art, store screenshots, app screens, fonts (OFL), QR code
- `assets/video/` — the promo video (720 × 1280, ≈ 4 MB each) and posters: `updraft-promo.mp4` all year, `updraft-promo-christmas.mp4` in the season (`html.xmas`). Made in the game repo (`scripts/make_promo_video.py`, then `PROMO_SIZE=720x1280 PROMO_BITRATE=1800000 scripts/promo/encode`); not from the design package

## Animation and parallax

- **Parallax:** any element with `data-px="k"` moves at (1 − k)× the page speed while scrolling: `k > 0` puts it farther away (sky, stars, far clouds), `k < 0` brings it closer (near clouds, the flying golden feather). `data-pxx` adds sideways drift. Change the numbers in `index.html` to tune the depth.
- **Scroll moments:** the hero sky falls behind as you leave it; headings rise word by word; a feather rides a wind trail through the three "How it works" steps and lights each one; flyer cards tilt up into place; cloud banks bridge the sky changes between sections; clouds slide past the phone during the worlds ascent; the screen marquee follows your scroll; a golden feather flies up into the download section.
- **Accessibility:** with *Reduce motion* turned on in the operating system, all of this is switched off and the page shows its final, still state.

Everything in `assets/` was exported from the design package v1.3; replace it from a newer package instead of editing it by hand. This folder is independent of the Android app — nothing here is used by the app build.

## Publish on GitHub Pages

1. Create a repository named `updraft` (the local folder is still called `Updraft-Web`) and push the **contents** of this folder to its root (`index.html` must be at the top level). For example: `cd Updraft-Web && git init && git add -A && git commit -m "UPDRAFT website" && git branch -M main && git remote add origin https://github.com/deniskorinsek/updraft.git && git push -u origin main`.
2. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
3. After a minute the site is live at `https://deniskorinsek.github.io/updraft/`. Every push to `main` republishes it.

`.nojekyll` is included so GitHub serves the files exactly as they are.

### Custom domain (optional)

Add a file named `CNAME` containing the domain (for example `updraft.si`), point the domain's DNS at GitHub Pages (A/AAAA records or a CNAME to `deniskorinsek.github.io`), then enable **Enforce HTTPS** in the Pages settings. The microphone demo needs HTTPS, which GitHub Pages provides on both the default and custom domains.

## Before going live — checklist

| What | Where | Why |
|---|---|---|
| Final site URL | set to `https://deniskorinsek.github.io/updraft/` in `index.html`, `privacy.html`, `terms.html`, `support.html` (canonical link and `og:` tags); change it there if you move to a custom domain | Share previews on WhatsApp, Slack, X and Facebook need absolute URLs |
| Privacy policy and terms URLs in the app and Play Console | `https://deniskorinsek.github.io/updraft/privacy.html` (already `PRIVACY_POLICY_URL` in `updraft-android`) and `…/terms.html` (About → terms, trader status in the Play Console; see `LAUNCH_CHECKLIST.md`) | Required for `RECORD_AUDIO`, ads, in-app purchases and the DSA trader declaration |
| Play Store link | `js/config.js → playUrl`, and the matching `href`s in the HTML (`grep -n "details?id=" *.html`) | The app ID is `com.updraft` (owner decision 16 Nov 2026); it cannot change after the first upload |
| QR code | regenerate after changing the link, outside the repo: with segno, `python3 -c "import segno; segno.make('https://play.google.com/store/apps/details?id=com.updraft', error='m').save('assets/brand/qr-play.svg', scale=6, border=2, dark='#241D14', light=None)"`; without Python packages, a small Swift script with CoreImage `CIFilter.qrCodeGenerator()` (correction level M, 6 px modules, 2-module border, `#241D14` on transparent, `viewBox` set) does the same. Check the result decodes (e.g. render it with `qlmanage -t` and read it with CoreImage `CIDetector`) | The QR on the download section encodes the store URL (regenerated for `com.updraft` on 16 Nov 2026) |
| Support mailbox | `js/config.js → supportEmail` (now `korinsekdenis@gmail.com`) and the `data-email` fallbacks in the HTML | Shown on the support, privacy and terms pages and in the footer legal notice |
| Publisher identity | Denis Korinšek, Slovenia is filled in (privacy, terms, footer legal notice). Still open: the postal address and the Google Play developer name, marked `<!-- TODO owner: … -->` (`grep -n "TODO" *.html`) | GDPR requires the controller's name and address; ZEPT art. 5 asks for a legal notice on the site (legal review L-02, L-13, L-16) |
| Privacy policy and terms review | `privacy.html`, `terms.html` | Rewritten after the legal review of 16 Nov 2026 (no analytics or crash SDK, DEC-140; no Google Play Games in V1; under-age option A, DEC-142). A lawyer should confirm the `<!-- TODO lawyer: … -->` points and the terms draft; keep the policy in sync with the Play Data safety form |
| Official Google Play badge (optional, after launch) | download the badge from Google's badge generator (play.google.com/intl/en_us/badges/), save it as `assets/brand/google-play-badge.png` and set `playBadge: "assets/brand/google-play-badge.png"` in `js/config.js`; the hero and download buttons then show the badge automatically | The site ships with its own gold buttons so no Google artwork is redistributed without the licence; Google's brand guidelines apply to the badge |
| Store links | **live since 25 Nov 2026** (owner: "the buttons should open the store for our app"): `storeLive: true` — every button says "Get it on Google Play" / "Prenesi z Google Play" and opens `play.google.com/store/apps/details?id=com.updraft`. Until the production release that page opens only for internal testers (others see Google's "item not found"). Back to "Coming soon": `storeLive: false` in `js/config.js`. |

## Editing copy

- Landing page: every text is in `js/strings.js`, once in `en` and once in `sl`. The English text is also written in the HTML as the no-JavaScript fallback, so change both when you edit a sentence.
- Privacy, terms and support pages: the English and Slovenian versions are two blocks in the HTML (`<div data-lang="en">` and `<div data-lang="sl">`); the toggle in the header shows one of them.
- The language opens from the visitor's saved choice, otherwise from the browser language (Slovenian browsers get SL), otherwise English. `js/config.js → defaultLang` can force one.

## Local preview

Open the folder with any static server, for example `python3 -m http.server 8000` and then `http://localhost:8000/`. Opening `index.html` directly from disk also works, except that the microphone demo falls back to "hold to blow" (the microphone needs HTTPS or localhost).

## Credits

Fonts: Cormorant Garamond and Jost, SIL Open Font License (licence texts in `assets/fonts/`). Google Play is a trademark of Google LLC. Art, logo and copy © 2026 UPDRAFT.
