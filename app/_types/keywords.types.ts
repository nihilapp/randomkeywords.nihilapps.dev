import type { InfiniteData } from '@tanstack/react-query';
import type { Prisma } from '@prisma/client';

export interface KeywordsPage {
  items: Prisma.KeywordGetPayload<{
    include: { SubCategory: { select: { name: true } } }
  }>[];
  nextCursor: string | undefined;
  count: number;
}

export interface CreateKeyword {
  keyword: string;
  subCategoryId: string;
}

export interface UpdateKeyword {
  keyword?: string;
}

export interface DeleteKeywords {
  ids: string[];
}

export type KeywordInfiniteQueryData = InfiniteData<KeywordsPage>;
