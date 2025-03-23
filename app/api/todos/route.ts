import type { NextRequest } from 'next/server';
import { inArray } from 'drizzle-orm';
import { todosTable } from '@/_entities/todos/todos.schema';
import { db } from '@/api/_libs';
import type { CreateTodo, DeleteTodo } from '@/_types';

export async function GET() {
  const todos = await db.select().from(todosTable);

  return Response.json(todos, {
    status: 200,
  });
}

export async function POST(request: NextRequest) {
  const createTodoDto: CreateTodo = await request.json();

  const [ todo, ] = await db
    .insert(todosTable)
    .values(createTodoDto)
    .returning();

  return Response.json(todo, {
    status: 201,
  });
}

export async function DELETE(request: NextRequest) {
  const deleteTodoDto: DeleteTodo = await request.json();

  await db
    .delete(todosTable)
    .where(inArray(todosTable.id, deleteTodoDto.ids));

  return Response.json(null, {
    status: 204,
  });
}
