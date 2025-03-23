import { Api } from '@/_libs';
import type {
  Category, CreateCategory, DeleteCategories, UpdateCategory
} from '@/_types';

export class CategoriesQuery {
  static getAll() {
    return Api.getQuery<Category[]>('/categories');
  }

  static getById(id: string) {
    return Api.getQuery<Category>(`/categories/${id}`);
  }

  static create(createCategoryDto: CreateCategory) {
    return Api.postQuery<Category, CreateCategory>(
      '/categories',
      createCategoryDto
    );
  }

  static update(id: string, updateCategoryDto: UpdateCategory) {
    return Api.patchQuery<Category, UpdateCategory>(
      `/categories/${id}`,
      updateCategoryDto
    );
  }

  static delete(id: string) {
    return Api.deleteQuery<Category>(`/categories/${id}`);
  }

  static deleteMany(deleteCategoriesDto: DeleteCategories) {
    return Api.deletesQuery<Category, DeleteCategories>(
      `/categories`,
      deleteCategoriesDto
    );
  }
}
