# Bethesda Apostolic Church Website

A Next.js (App Router) site for Bethesda Apostolic Church — services, sermons,
events, ministries, the Neniwo building project, and the BACCET education trust.

## Getting Started

Requires **Node.js 22.x** (see `engines` in `package.json`).

```bash
npm install                # also runs `prisma generate`
cp .env.example .env       # then fill in the values — see Environment
npm run db:migrate         # create the local database
npm run db:seed            # add sample courses and archive items
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Creating an admin

The seed does not create any users. To get an admin account:

1. Register at [http://localhost:3000/signup](http://localhost:3000/signup).
2. Run `npm run db:studio`, open the `User` table, and set `isAdmin` to `true`
   for your account.
3. Sign out and back in to reach `/admin`.

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
- `SITE_URL` — production origin, e.g. `https://example.org`. Canonical URLs,
  Open Graph tags, `sitemap.xml` and `robots.txt` are built from it, so it must
  be set at **build** time.

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

Next.js 16 · React 19 · Tailwind CSS 3 · Prisma · NextAuth · Motion
