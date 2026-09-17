import path from 'node:path';
import { defineConfig } from 'prisma/config';

try {
  process.loadEnvFile();
} catch {
  // Environment variables supplied by deployment host in CI/Production
}

export default defineConfig({
  schema: path.join('prisma', 'schema.prisma'),
  migrations: {
    seed: 'node prisma/seed.js',
  },
});