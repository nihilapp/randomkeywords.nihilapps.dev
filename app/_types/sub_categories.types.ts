import type { Prisma } from '@prisma/client';

export type ExSubCategory = Prisma.SubCategoryGetPayload<{
  include: {
    _count: {
      select: {
        Keyword: true,
      },
    },
    Category: {
      select: {
        name: true,
      },
    },
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
