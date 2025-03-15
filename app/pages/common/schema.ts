import { pgEnum, pgTable, text } from 'drizzle-orm/pg-core';
import { createId } from '@paralleldrive/cuid2';

export const todoStatus = pgEnum(
  'todo_status',
  [
    'waiting',
    'started',
    'pending',
    'completed',
  ]
);

export const todosTable = pgTable('todos', {
  id: text('id')
    .primaryKey()
    .$defaultFn(() => createId()),
  content: text('content')
    .notNull(),
  status: todoStatus('status')
    .notNull()
    .default('waiting'),
});
