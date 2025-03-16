import {
  boolean,
  pgTable, text, timestamp
} from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { categoriesTable } from '../categories/schema';

export const subCategoriesTable = pgTable('sub_categories', {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text()
    .notNull(),
  category_id: text()
    .notNull()
    .references(() => categoriesTable.id),
  created_at: timestamp()
    .notNull()
    .defaultNow(),
  updated_at: timestamp()
    .notNull()
    .defaultNow(),
  is_prod_hidden: boolean()
    .notNull()
    .default(false),
});
