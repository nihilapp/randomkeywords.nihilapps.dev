import type { InfiniteData } from '@tanstack/react-query';
import type { Prisma } from '@prisma/client';

export interface KeywordsPage {
  items: ExKeyword[];
  nextCursor?: string;
  count: number;
}

export type ExKeyword = Prisma.KeywordGetPayload<{
  include: {
    sub_category: {
      select: { name: true, },
    };
  };
}>;

export interface CreateKeyword {
  keyword: string;
  sub_category_id: string;
}

export interface UpdateKeyword {
  keyword?: string;
}

export interface DeleteKeywords {
  ids: string[];
}

export type KeywordInfiniteQueryData = InfiniteData<KeywordsPage, string | undefined>;

export interface BackgroundKeyword {
  real: {
    purpose: string[];
    origin: string[];
    class: string[];
    count: number;
  };
  fantasy: {
    purpose: string[];
    origin: string[];
    class: string[];
    count: number;
  };
}
