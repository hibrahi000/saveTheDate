<!--
  Fhoenix & Hashmat — Save the Date
  An editorial, single-page wedding invitation built with React + Redux + Tailwind.
-->

<div align="center">

# 💍 Save the Date

### Fhoenix &nbsp;&amp;&nbsp; Hashmat

***July 24, 2027 · Sugar Hill, Georgia***

A modern, editorial-style **single-page wedding invitation** — full-bleed
chapel hero, scroll-revealed cards, isolated rotating engagement ring, a
"keychain" of cruise-proposal photos, an autoplay soundtrack, a clickable
QR code, and rich link previews when shared.

[![React](https://img.shields.io/badge/React-18-149ECA?logo=react&logoColor=white)](https://react.dev)
[![Redux Toolkit](https://img.shields.io/badge/Redux%20Toolkit-2-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?logo=vercel&logoColor=white)](https://vercel.com)

</div>

---

## ✨ Features

| | |
|---|---|
| 🏛️ **Editorial chapel hero** | Real Ashton Gardens photo dissolves into ivory typography — magazine-cover feel. |
| 💍 **Isolated engagement ring** | The white background of `ring.png` is removed at runtime via `<canvas>` so the ring "floats" on any color. Continuous shine sweep + scroll-driven shimmer. |
| 📸 **Proposal keychain** | Three cruise photos hang from the ring on dashed gold "chains." Auto-cycles a featured one every few seconds; hover to pin. |
| 🌿 **Botanical accents** | Hand-drawn watercolor eucalyptus corners + scattered gold sparkles. |
| 🎵 **Music on load** | Plays *Wedding Band 2026* on mount — starts muted (browser autoplay policy compliant) then fades in on first interaction. |
| 🖱️ **Custom navigator** | Bottom-left pill with up/down arrows, forest-green hover fade, and a "Click here" hint on first load. Spam-click safe via cached target index. |
| 🌒 **Card fade-in scroll** | Each section fades up like an app card via IntersectionObserver. |
| 📱 **Fully responsive** | Fluid `clamp()` typography + `100svh` hero — looks right on iPhones, Androids, iPads, MacBooks. |
| 🔗 **Rich link previews** | Open Graph + Twitter Card meta tags so iMessage / Slack / WhatsApp render a beautiful preview. |
| 📷 **Clickable QR code** | Built-in QR card — guests scan on desktop, or tap to use the native Share / Copy link. |
| ⚙️ **One source of truth** | All wedding details (names, date, venue, RSVP, hashtag, photos) live in a single Redux slice. |

---

## 🎨 Color & Type System

| Token | Use | Hex |
|---|---|---|
| `forest`     | Deep evergreen — primary brand color | `#1E4020` |
| `sage`       | Botanical accent | `#6B9E6B` |
| `champagne`  | Luxe gold accents & shimmer text | `#C8A24C` |
| `gold-rich`  | Pure gold (chains, dividers, sparkles) | `#D4AF37` |
| `ivory`      | Page background — creamy warm white | `#FAF6E9` |
| `ink`        | Body copy — soft black | `#1A1A1A` |

**Fonts** (Google Fonts): Playfair Display, Cormorant Garamond, Great Vibes, Montserrat.

---

## 🧱 Architecture

```
SaveTheDate/
├── public/                          ← static assets (served verbatim)
│   ├── ashton_garden_backdrop.png   ← hero chapel photo
│   ├── dinnerTable.png              ← venue tile photo
│   ├── ring.png                     ← engagement ring (white bg auto-removed)
│   ├── proposal.png / 2 / 3         ← three cruise photos
│   ├── og-preview.jpg               ← link-preview image (1200×630 ish)
│   └── music/                       ← MP3 soundtrack
│
├── index.html                       ← Vite entry + OG / Twitter meta tags
├── src/
│   ├── main.jsx                     ← React + Redux Provider
│   ├── App.jsx                      ← <Page> with all sections in order
│   ├── index.css                    ← Tailwind + custom utilities
│   │
│   ├── store/
│   │   ├── index.js                 ← configureStore
│   │   ├── weddingSlice.js          ← ★ EDIT WEDDING DETAILS HERE
│   │   └── uiSlice.js               ← music started / muted state
│   │
│   ├── hooks/
│   │   ├── useInView.js             ← fade-in-on-scroll observer
│   │   └── useScrollProgress.js     ← scroll progress tracking
│   │
│   └── components/
│       ├── Page.jsx                 ← invitation column + paper texture
│       ├── Tile.jsx                 ← reusable card with fade-in + variants
│       ├── BackdropPhoto.jsx        ← hero/frame/soft photo wrapper
│       ├── BotanicalCorner.jsx      ← eucalyptus + gold-sparkle SVG
│       ├── GoldSparkles.jsx         ← scattered sparkle dots
│       ├── Divider.jsx              ← gold/forest/ivory rule with center ◆
│       ├── IsolatedRing.jsx         ← canvas-based white-pixel removal
│       ├── MusicPlayer.jsx          ← autoplay + mute toggle
│       ├── SectionNavigator.jsx     ← bottom-left up/down pill
│       └── sections/
│           ├── HeroSection.jsx
│           ├── UnionSection.jsx     ← names + ring + 3-photo keychain
│           ├── DateSection.jsx
│           ├── VenueSection.jsx
│           ├── DetailsSection.jsx   ← Adults Only · Black Tie
│           ├── CountdownSection.jsx
│           ├── QRSection.jsx        ← clickable QR + share
│           └── RsvpSection.jsx
```

---

## 🚀 Quickstart

```bash
# 1. Install
npm install

# 2. Run the dev server (hot reload at http://localhost:5173)
npm run dev

# 3. Build for production
npm run build       # → outputs to dist/

# 4. Preview the production build
npm run preview
```

> **Node version:** 18+ required (Vite 5). On macOS with `nvm`:
> ```bash
> nvm use 20
> ```

---

## ✏️ Customizing the invitation

Everything that's "wedding-specific" lives in **one file**:

```js
// src/store/weddingSlice.js
const initialState = {
  bride: 'Fhoenix',
  groom: 'Hashmat',
  dateISO:  '2027-07-24T18:00:00',
  dateShort:'07.24.2027',
  dayName:  'Saturday',
  timeText: "Six O'Clock in the Evening",
  venue:    { city: 'Sugar Hill', state: 'Georgia', /* … */ },
  rsvp:     { email: 'you@example.com', cta: 'Express Your Joy', /* … */ },
  proposalGallery: [
    { src: '/proposal2.png', caption: 'A million times yes',  rotation: -10 },
    { src: '/proposal.png',  caption: 'The night he asked',   rotation:  -2 },
    { src: '/proposal3.png', caption: 'Sailing into forever', rotation:   9 },
  ],
  heroBackdropSrc: '/ashton_garden_backdrop.png',
  siteUrl:         'https://your-domain.vercel.app',  // used by the QR code
};
```

Drop new images into `/public/` and reference them by path (`/your-photo.png`).
The Redux slice flows into every section automatically — no further edits needed.

To **reorder, add, or remove** sections, edit `src/App.jsx`:
```jsx
<Page>
  <HeroSection />
  <UnionSection />
  <DateSection />
  ...
</Page>
```

---

## 🔗 Rich link previews (Open Graph)

When the URL is shared in iMessage / Slack / WhatsApp / Twitter / etc., the
preview image is `public/og-preview.jpg` (referenced from `index.html`).

To use a custom preview, just replace that file with a 1200×630 image — the
meta tags in `<head>` already point to it.

---

## 📷 QR code

The `<QRSection />` renders a clickable QR that:

* On **desktop** — guests scan with their phone to open the invite
* On **mobile** — tapping invokes the native Share sheet (or copies the link)

The URL it encodes is `wedding.siteUrl` from the Redux slice (falls back to
`window.location.origin` if not set).

---

## ☁️ Deployment

Vercel (recommended — `vercel.json` is already configured):

```bash
npx vercel        # preview deploy
npx vercel --prod # production deploy
```

The build outputs to `dist/`. Any static host (Netlify, GitHub Pages,
Cloudflare Pages) works the same.

After deploying, set `siteUrl` in `weddingSlice.js` to your live URL so the
QR code points to the right place.

---

## 🛠️ Tech Stack

* **React 18** — component model
* **Redux Toolkit** — central wedding-details state
* **Vite 5** — dev server + production bundler
* **Tailwind CSS 3** — utility-first styling with custom theme tokens
* **qrcode.react** — inline-SVG QR codes (no network calls)
* **Express** — optional Node server for self-hosted production (`server.js`)

---

## 📜 License

This project is private — all photography and music are personal to Fhoenix &
Hashmat. Use the code structure as inspiration, but please don't redistribute
the assets.

---

<div align="center">

*Made with love · `#FhoenixAndHashmat2027`* 🤍

</div>
