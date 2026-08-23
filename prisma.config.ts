import path from 'node:path';
import { defineConfig } from 'prisma/config';

// Replaces the `prisma` key in package.json, which Prisma 6 deprecates and
// Prisma 7 removes.
//
// A config file also switches off Prisma's automatic .env loading, so do it
// here. process.loadEnvFile is built into Node >= 20.12, which keeps dotenv
// out of the dependency list.
try {
  process.loadEnvFile();
} catch {
  // No .env on this machine (CI, production) — the host supplies the vars.
}

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  migrations: {
    seed: 'node prisma/seed.js',
  },
});
