import { Prisma } from '@prisma/client';

export interface CreateCategoryDto {
  name: string;
  order: number;
}

export type ExtendedCategory = Prisma.CategoryGetPayload<{
  include: {
    SubCategory: true;
  };
}>;
