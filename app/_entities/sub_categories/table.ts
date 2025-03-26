import { sql } from 'drizzle-orm';
import {
  boolean, pgTable, text, timestamp, uuid
} from 'drizzle-orm/pg-core';
import { categoriesTable } from '@/_entities/categories/table';

export const subCategoriesTable = pgTable('sub_categories', {
  id: uuid()
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  category_id: uuid()
    .references(() => categoriesTable.id),
  name: text()
    .notNull(),
  is_prod_hidden: boolean().default(false),
  created_at: timestamp()
    .default(sql`now()`),
  updated_at: timestamp()
    .default(sql`now()`)
    .$onUpdate(() => sql`now()`),
});
