export const categoriesKeys = {
  all: [ 'categories', ] as const,
  list: () => [ ...categoriesKeys.all, 'list', ] as const,
  details: () => [ ...categoriesKeys.all, 'detail', ] as const,
  detailId: (id: string) => [ ...categoriesKeys.details(), id, ] as const,
};

export const subCategoriesKeys = {
  all: [ 'sub_categories', ] as const,
  list: () => [ ...subCategoriesKeys.all, 'list', ] as const,
  details: () => [ ...subCategoriesKeys.all, 'detail', ] as const,
  detailId: (id: string) => [ ...subCategoriesKeys.details(), id, ] as const,
  detailCategoryId: (categoryId: string) => [ ...subCategoriesKeys.details(), categoryId, ] as const,
};

export const keywordsKeys = {
  all: [ 'keywords', ] as const,
  list: () => [ ...keywordsKeys.all, 'list', ] as const,
  details: () => [ ...keywordsKeys.all, 'detail', ] as const,
  detailId: (id: string) => [ ...keywordsKeys.details(), id, ] as const,
  detailSubCategoryId: (subCategoryId: string) => [ ...keywordsKeys.details(), subCategoryId, ] as const,
};
