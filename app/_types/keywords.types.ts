import type { keywordsTable } from '@/_entities/keywords/table';

export type Keyword = typeof keywordsTable.$inferSelect;

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
