import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';
import path from 'node:path';

export default defineConfig({
  schema: path.join('src', 'prisma', 'schema.prisma'),
  datasource: {
    url: env('DATABASE_URL'),
  },
  migrations: {
    path: path.join('prisma', 'migrations'),
    seed: 'ts-node src/prisma/seed.ts',
  },
});
