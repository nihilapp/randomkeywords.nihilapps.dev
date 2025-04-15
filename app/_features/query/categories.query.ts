import type { Category } from '@prisma/client';
import { Api } from '@/_libs';
import type {
  ExCategory,
  CreateCategory,
  DeleteCategories,
  UpdateCategory
} from '@/_types';

export class CategoriesQuery {
  static getAll() {
    return Api.getQuery<ExCategory[]>('/categories');
  }

  static getById(id: string) {
    return Api.getQuery<ExCategory>(`/categories/${id}`);
  }

  static getByName(name: string) {
    return Api.getQuery<ExCategory>(
      `/categories/name/${name}`
    );
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
