import type { Prisma } from '@prisma/client';

// 서브 카테고리를 포함한 확장 카테고리 인터페이스
export type ExCategory = Prisma.CategoryGetPayload<{
  include: {
    SubCategory: {
      include: {
        _count: {
          select: { Keyword: true, },
        },
      },
    };
  };
}>;

export interface CreateCategory {
  name: string;
  order?: number;
  isProdHidden?: boolean;
}

export interface UpdateCategory {
  name?: string;
  order?: number;
  isProdHidden?: boolean;
}

export interface DeleteCategories {
  ids: string[];
}
