import type { Prisma } from '@/_prisma/client';

// 서브 카테고리를 포함한 확장 카테고리 인터페이스
export type ExCategory = Prisma.CategoryGetPayload<{
  include: {
    sub_category: {
      include: {
        _count: {
          select: { keyword: true, },
        },
      },
    };
  };
}>;

export interface CreateCategory {
  name: string;
  order?: number;
  is_prod_hidden?: boolean;
}

export interface UpdateCategory {
  name?: string;
  order?: number;
  is_prod_hidden?: boolean;
}

export interface DeleteCategories {
  ids: string[];
}
