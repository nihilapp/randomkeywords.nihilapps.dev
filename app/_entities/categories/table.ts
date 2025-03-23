import { sql } from 'drizzle-orm';
import {
  bigint, boolean, pgTable, text, timestamp, uuid
} from 'drizzle-orm/pg-core';

export const categoriesTable = pgTable('categories', {
  id: uuid('id')
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  name: text()
    .notNull(),
  order: bigint({ mode: 'number', })
    .default(0),
  is_prod_hidden: boolean().default(false),
  created_at: timestamp()
    .default(sql`now()`),
  updated_at: timestamp()
    .default(sql`now()`)
    .$onUpdate(() => sql`now()`),
});
