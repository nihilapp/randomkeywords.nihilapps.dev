import type { Prisma } from '@prisma/client';

export type ExSubCategory = Prisma.SubCategoryGetPayload<{
  include: {
    _count: {
      select: { keyword: true, },
    },
    category: {
      select: { name: true, },
    },
  };
}>;

export interface CreateSubCategory {
  name: string
  category_id: string
  is_prod_hidden?: boolean
}

export interface UpdateSubCategory {
  name?: string;
  is_prod_hidden?: boolean;
}

export interface DeleteSubCategories {
  ids: string[];
}
