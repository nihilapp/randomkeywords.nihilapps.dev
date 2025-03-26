import type { subCategoriesTable } from '@/_entities/sub_categories/table';

export type SubCategory = typeof subCategoriesTable.$inferSelect;

export interface CreateSubCategory {
  name: string;
  category_id: string;
  is_prod_hidden?: boolean;
}

export interface UpdateSubCategory {
  name?: string;
  is_prod_hidden?: boolean;
}

export interface DeleteSubCategories {
  ids: string[];
}
