# Kum Kum's Birthday Surprise

A scrapbook-style birthday experience built with React, TypeScript, Vite, and Framer Motion. It includes a playful investigation, a birthday countdown, a photo and video scrapbook, a personal letter, background music, and a final collage.

## Run locally

```bash
npm install
npm run dev
```

The four-digit birthday passcode is `1810`.

## Personalize

Update `src/config/birthday.ts` to edit Kum Kum's nickname, birthday, passcode, letter, captions, media paths, and final message. Images, videos, and music are served from `public/`; keep their filenames and extensions exact when changing those paths.

## Production

```bash
npm run build
npm run preview
```

Vercel is configured for this Vite project in `vercel.json`: build with `npm run build` and publish `dist/`.
