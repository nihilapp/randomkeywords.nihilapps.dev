import { HttpStatusCode } from 'axios';
import { ApiResponse, CreateResponse } from '@/src/entities';

export function createResponse<T>(data: CreateResponse<T>) {
  return Response.json({
    resData: data.resData,
    message: data.message,
  } satisfies ApiResponse<T>, {
    status: HttpStatusCode[data.status],
  });
}
