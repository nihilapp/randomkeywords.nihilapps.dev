import {
  bigint,
  boolean,
  pgTable, text,
  timestamp
} from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const categoriesTable = pgTable('categories', {
  id: text()
    .primaryKey()
    .$defaultFn(() => createId()),
  name: text()
    .notNull(),
  order: bigint({ mode: 'number', })
    .notNull()
    .default(0),
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
