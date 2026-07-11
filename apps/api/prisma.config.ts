import path from 'node:path';
import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: path.join('src', 'prisma', 'schema.prisma'),
  migrations: {
    seed: 'ts-node src/prisma/seed.ts',
  },
});
