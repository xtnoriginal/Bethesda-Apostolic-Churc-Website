# Bethesda Apostolic Church Website

A Next.js (App Router) site for Bethesda Apostolic Church — services, sermons,
events, ministries, the Neniwo building project, and the BACCET education trust.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Script               | What it does                              |
| -------------------- | ----------------------------------------- |
| `npm run dev`        | Development server                        |
| `npm run build`      | Production build                          |
| `npm start`          | Serve the production build                |
| `npm run lint`       | ESLint (flat config, `eslint.config.mjs`) |
| `npm run db:migrate` | Apply Prisma migrations                   |
| `npm run db:studio`  | Prisma Studio                             |
| `npm run db:seed`    | Seed the database                         |

## Environment

Copy `.env.example` to `.env` and fill in:

- `DATABASE_URL` — Prisma datasource (SQLite by default)
- `NEXTAUTH_SECRET` — NextAuth signing secret
- `NEXTAUTH_URL` — site origin, e.g. `http://localhost:3000`

Prisma is configured in `prisma.config.ts`; the deprecated `prisma` key in
`package.json` has been removed.

## Brand colours

Defined once in `tailwind.config.js` and as CSS variables in `app/globals.css`.
The Tailwind `blue` and `red` scales are overridden with the church palette, so
`blue-600` and `red-600` are the brand colours everywhere.

| Colour | Hex       | Token                                    |
| ------ | --------- | ---------------------------------------- |
| Blue   | `#0033A0` | `blue-600`, `primary`, `--bethesda-blue` |
| Red    | `#EE2737` | `red-600`, `secondary`, `--bethesda-red` |
| White  | `#FFFFFF` | `--bethesda-white`                       |
| Gold   | `#C8AE73` | `gold-500`, `accent`, `--bethesda-gold`  |
| Khaki  | `#B2A480` | `khaki-500`, `--bethesda-khaki`          |

## Icons

[lucide-react](https://lucide.dev) only — no emoji, no `react-icons`. A rule in
`app/globals.css` sizes `.lucide` at `1em` so icons follow font-size utilities;
explicit `w-*` and `h-*` classes still override it.

## Tech

Next.js 15 · React 18 · Tailwind CSS 3 · Prisma · NextAuth · Motion
