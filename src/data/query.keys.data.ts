export const queryKeys = {
  categories: {
    getAll: [ 'categories', 'list', ],
    getById: (id: string) => [ 'categories', 'detail', id, ],
  },
  subCategories: {
    getAll: [ 'sub-categories', 'list', ],
    getByCategoryId: (categoryId: string) => [ 'sub-categories', 'list', categoryId, ],
    getById: (id: string) => [ 'sub-categories', 'detail', id, ],
  },
  keywords: {
    getAll: [ 'keywords', 'list', ],
    getBySubCategoryId: (subCategoryId: string) => [ 'keywords', 'list', subCategoryId, ],
    getById: (id: string) => [ 'keywords', 'detail', id, ],
  },
};
