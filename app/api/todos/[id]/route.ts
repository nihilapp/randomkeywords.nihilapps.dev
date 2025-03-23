import { eq } from 'drizzle-orm';
import type { NextRequest } from 'next/server';
import { todosTable } from '@/_entities/todos/todos.schema';
import { db } from '@/api/_libs';
import type { UpdateTodo } from '@/_types';

export async function GET(request: NextRequest, { params, }: Params) {
  const [ todo, ] = await db
    .select()
    .from(todosTable)
    .where(eq(todosTable.id, params.id))
    .limit(1);

  return Response.json(todo, {
    status: 200,
  });
}

type Params = {
  params: {
    id: string;
  }
};

export async function PATCH(request: NextRequest, { params, }: Params) {
  const updateTodoDto: UpdateTodo = await request.json();

  const [ todo, ] = await db
    .update(todosTable)
    .set(updateTodoDto)
    .where(eq(todosTable.id, params.id))
    .returning();

  return Response.json(todo, {
    status: 200,
  });
}

export async function DELETE(request: NextRequest, { params, }: Params) {
  await db
    .delete(todosTable)
    .where(eq(todosTable.id, params.id));

  return Response.json(null, {
    status: 204,
  });
}
