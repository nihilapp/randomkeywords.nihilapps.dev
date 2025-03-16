import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './app/migrations',
  schema: './app/pages/**/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.VITE_DATABASE_URL!,
  },
});
