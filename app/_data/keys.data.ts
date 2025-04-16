export const categoriesKeys = {
  all: [ 'categories', ] as const,
  list: () => [ ...categoriesKeys.all, 'list', ] as const,
  details: () => [ ...categoriesKeys.all, 'detail', ] as const,
  detailId: (id: string) => [ ...categoriesKeys.details(), id, ] as const,
  detailName: (name: string) => [ ...categoriesKeys.details(), name, ] as const,
};

export const subCategoriesKeys = {
  all: [ 'sub_categories', ] as const,
  list: () => [ ...subCategoriesKeys.all, 'list', ] as const,
  details: () => [ ...subCategoriesKeys.all, 'detail', ] as const,
  detailId: (id: string) => [ ...subCategoriesKeys.details(), id, ] as const,
  detailCategoryId: (categoryId: string) => [ ...subCategoriesKeys.details(), categoryId, ] as const,
  options: () => [ ...subCategoriesKeys.all, 'options', ] as const,
};

export const keywordsKeys = {
  all: [ 'keywords', ] as const,
  list: () => [ ...keywordsKeys.all, 'list', ] as const,
  details: () => [ ...keywordsKeys.all, 'detail', ] as const,
  detailId: (id: string) => [ ...keywordsKeys.details(), id, ] as const,
  detailSubCategoryId: (subCategoryId: string) => [ ...keywordsKeys.details(), subCategoryId, ] as const,
  search: (word: string, subCategoryId?: string) => [
    ...keywordsKeys.all,
    'search',
    word,
    subCategoryId,
  ] as const,
  background: () => [ ...keywordsKeys.all, 'background', ] as const,
};
