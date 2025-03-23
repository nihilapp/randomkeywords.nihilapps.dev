import {
  pgEnum, pgTable, text, uuid
} from 'drizzle-orm/pg-core';

export const todoStatus = pgEnum('todo_status', [ 'waiting', 'started', 'pending', 'completed', ]);

export const todosTable = pgTable('todos', {
  id: uuid().primaryKey().defaultRandom(),
  content: text().notNull(),
  status: todoStatus().notNull().default('waiting'),
});
