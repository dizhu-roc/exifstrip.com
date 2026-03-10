# ExifStrip

A browser-based tool for reading what’s inside your photos—camera, time, GPS if it’s there—and stripping metadata when you’re about to share. Nothing gets uploaded: parsing, edits, and downloads all run on your machine.

**[简体中文](README.zh-CN.md)**

## On the web

If you just want to try it or read more:

| | Link |
|--|------|
| **Site** | [exifstrip.com](https://exifstrip.com) |
| **What is EXIF?** (guide) | […/guides/what-is-exif](https://exifstrip.com/guides/what-is-exif) |
| **Cleaning lots of photos** (blog) | […/blog/tip-batch-clean](https://exifstrip.com/blog/tip-batch-clean) |

On GitHub, it’s worth setting **About → Website** to `https://exifstrip.com` so the repo points people straight to the live app.

---

## What it does

You drop images in (or pick them), then browse EXIF grouped by theme—device, shooting settings, location, dates, and the rest. JPEGs can be edited field by field or scrubbed with presets (everything, privacy-ish bits, GPS-only, device-only, and similar). Other formats can be re-encoded so metadata goes away; you can also export what you read as text or hex where it applies.

There’s a small map when GPS is present, and a simple chart so you can see how “heavy” a file is with metadata. The UI speaks English, 中文, or 日本語; your choice sticks around in local storage.

Under the hood it’s all client-side—handy when you’d rather not ship originals to someone else’s server.

---

## Tech stack

| Area | Stack |
|------|--------|
| Framework | [Next.js](https://nextjs.org/) 16 (App Router), [React](https://react.dev/) 19 |
| Language | [TypeScript](https://www.typescriptlang.org/) 5 |
| Styling | [Tailwind CSS](https://tailwindcss.com/) 3 |
| EXIF read | [exifreader](https://github.com/mattiasw/ExifReader) |
| EXIF edit/strip (JPEG) | [piexifjs](https://github.com/hMatoba/piexifjs) |
| Map | [Leaflet](https://leafletjs.com/) + [react-leaflet](https://react-leaflet.js.org/) |

---

## Project layout (overview)

```
exif-strip/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── layout.tsx          # Root layout, LocaleProvider
│   │   ├── page.tsx            # Home
│   │   ├── globals.css         # Global styles & CSS variables
│   │   ├── privacy/            # Privacy page
│   │   ├── terms/              # Terms page
│   │   ├── about/              # About page
│   │   └── faq/                # FAQ page
│   ├── components/
│   │   ├── home/               # Home sections
│   │   │   ├── IntroCarousel.tsx
│   │   │   ├── IntroCards.tsx
│   │   │   ├── UploadSection.tsx
│   │   │   ├── UploadAndMap.tsx
│   │   │   ├── MetadataStrip.tsx
│   │   │   ├── MetadataGraphSection.tsx
│   │   │   ├── WhyStripExifSection.tsx
│   │   │   ├── PrivacySection.tsx
│   │   │   ├── ExifTableSection.tsx
│   │   │   ├── FAQSection.tsx
│   │   │   ├── Nav.tsx, Footer.tsx
│   │   │   └── ...
│   │   └── layout/
│   │       └── PageLayout.tsx  # Subpage shell (Nav + content + Footer)
│   ├── contexts/
│   │   ├── LocaleContext.tsx   # i18n (en / zh-CN / ja)
│   │   └── UploadContext.tsx   # Upload list, selection, parse results
│   ├── lib/                    # Core logic
│   │   ├── parseExif.ts        # EXIF parsing (ExifReader)
│   │   ├── stripExif.ts        # Preset-based strip (piexifjs)
│   │   ├── stripExifPresets.ts
│   │   ├── exportExif.ts
│   │   └── ...
│   ├── constants/
│   ├── data/
│   └── locales/                # zh-CN, en, ja JSON
├── docs/
├── public/
└── package.json
```

---

## Getting started

### Requirements

- [Node.js](https://nodejs.org/) 18+
- npm / yarn / pnpm

### Install & run

```bash
cd exif-strip
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Dev server (Turbopack) |
| `npm run build` | Production build |
| `npm run start` | Run production build |
| `npm run lint` | ESLint |

---

## Internationalization

- Locales: **en**, **zh-CN**, **ja** in `src/locales/`, wired through `LocaleContext` / `useTranslations()`.
- User choice is persisted in `localStorage`.

---

## Docs (repo)

- [首页区块与命名规范](docs/首页区块与命名规范.md) — home section IDs, component names, terminology (Chinese doc for collaborators).

---

## License & disclaimer

The repo is flagged `"private": true` in `package.json`. Please read the in-app Privacy and Terms. Use EXIF editing and removal in a lawful way—protecting your own privacy is the point, not digging into other people’s data.
