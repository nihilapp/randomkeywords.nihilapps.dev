import {
  pgTable, text, timestamp
} from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';
import { subCategoriesTable } from '../sub-categories/schema';

export const keywordsTable = pgTable('keywords', {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  keyword: text()
    .notNull()
    .unique(),
  sub_category_id: text()
    .notNull()
    .references(() => subCategoriesTable.id),
  created_at: timestamp()
    .notNull()
    .defaultNow(),
  updated_at: timestamp()
    .notNull()
    .defaultNow(),
});
