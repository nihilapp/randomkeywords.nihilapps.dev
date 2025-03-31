import type { Prisma } from '@prisma/client';

export type ExSubCategory = Prisma.SubCategoryGetPayload<{
  include: {
    Keyword: true;
  };
}>;

export interface CreateSubCategory {
  name: string
  categoryId: string
  isProdHidden?: boolean
}

export interface UpdateSubCategory {
  name?: string;
  isProdHidden?: boolean;
}

export interface DeleteSubCategories {
  ids: string[];
}
