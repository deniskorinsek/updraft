/* UPDRAFT site configuration — edit these values, nothing else needs to change. */
window.UPDRAFT_SITE = {
  /* Google Play listing. App ID com.updraft (owner decision 2026-11-16; it cannot change after the first Play upload).
     If the URL ever changes, update the HTML links too and regenerate assets/brand/qr-play.svg (see README). */
  playUrl: "https://play.google.com/store/apps/details?id=com.updraft",
  /* Optional: path to Google's official "Get it on Google Play" badge (download it from
     https://play.google.com/intl/en_us/badges/ and save it as assets/brand/google-play-badge.png). Leave empty to keep
     the site's own gold buttons. Example: "assets/brand/google-play-badge.png"
     Keep it empty while the listing is not live: the badge replaces the "Coming soon to Google Play" button text. */
  playBadge: "",
  /* Support mailbox shown on the support, privacy and terms pages and in the footer legal notice. */
  supportEmail: "korinsekdenis@gmail.com",
  /* Language shown when the visitor has no saved choice: "auto" follows the browser, or "en" / "sl". */
  defaultLang: "auto"
};
