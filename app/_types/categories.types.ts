import type { categoriesTable } from '@/_entities/categories/table';

export type Category = typeof categoriesTable.$inferSelect;

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
