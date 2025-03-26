import { sql } from 'drizzle-orm';
import {
  pgTable, text, timestamp, uuid
} from 'drizzle-orm/pg-core';
import { subCategoriesTable } from '@/_entities/sub_categories/table';

export const keywordsTable = pgTable('keywords', {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  sub_category_id: uuid()
    .references(() => subCategoriesTable.id),
  keyword: text()
    .notNull(),
  created_at: timestamp()
    .default(sql`now()`),
  updated_at: timestamp()
    .default(sql`now()`)
    .$onUpdate(() => sql`now()`),
});
