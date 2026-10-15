# Wedge Website

Official site for [Wedge](https://github.com/Regncreative/Wedge), a file shelf on the edge of your screen (formerly Stash). Live at [wedge.regncreative.com](https://wedge.regncreative.com).

## Stack

- Next.js 16 (App Router), TypeScript
- Tailwind CSS 4, Framer Motion, Lucide icons
- Vercel Analytics and Speed Insights

## Develop

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command          | Description                |
| ---------------- | -------------------------- |
| `npm run dev`    | Local development          |
| `npm run build`  | Production build           |
| `npm run start`  | Serve the production build |
| `npm run lint`   | ESLint                     |
| `npm run format` | Prettier                   |

## Notes

- English and Turkish copy lives in `src/lib/i18n.tsx`.
- The hero is a small working copy of the app (`src/components/sections/EdgeDemo.tsx`): tabs on the edge, drag a file onto one, open the drawer, drag it back.
- The latest version and download link come from the GitHub Releases API (refreshed hourly).
- Brand assets (logo, favicon, screenshots) are copied from the app repo (`assets/brand`, `docs/`); the social preview is `public/brand/og.png`.
