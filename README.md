# Handmade Birthday — Personalizable Surprise Website

Quick start:

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

Where to customize:

- Edit `src/config/birthday.ts` to change `name`, `passcode`, `letter`, `memories`, and `finalMessage`.
- Place your images in `public/images/` and reference them from the config (e.g. `/images/memory1.jpg`).
- Add a music file at `public/sounds/bday.mp3` to enable background music (plays only after user interaction).

Notes:

- The design is mobile-first and uses Tailwind CSS and Framer Motion for animations.
- This project is intentionally styled like a handmade scrapbook; replace images and text in `src/config/birthday.ts` to personalize.
