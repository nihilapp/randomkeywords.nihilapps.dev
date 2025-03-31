import { Api } from '@/_libs';
import type {
  SubCategory, CreateSubCategory, DeleteSubCategories, UpdateSubCategory,
  ExSubCategory
} from '@/_types';

export class SubCategoriesQuery {
  static getAll() {
    return Api.getQuery<ExSubCategory[]>('/sub_categories');
  }

  static getById(id: string) {
    return Api.getQuery<ExSubCategory>(`/sub_categories/${id}`);
  }

  static getByCategoryId(categoryId: string) {
    return Api.getQuery<ExSubCategory[]>(`/sub_categories/category/${categoryId}`);
  }

  static create(createSubCategoryDto: CreateSubCategory) {
    return Api.postQuery<SubCategory, CreateSubCategory>(
      '/sub_categories',
      createSubCategoryDto
    );
  }

  static update(id: string, updateSubCategoryDto: UpdateSubCategory) {
    return Api.patchQuery<SubCategory, UpdateSubCategory>(
      `/sub_categories/${id}`,
      updateSubCategoryDto
    );
  }

  static delete(id: string) {
    return Api.deleteQuery<SubCategory>(`/sub_categories/${id}`);
  }

  static deleteMany(deleteSubCategoriesDto: DeleteSubCategories) {
    return Api.deletesQuery<SubCategory, DeleteSubCategories>(
      `/sub_categories`,
      deleteSubCategoriesDto
    );
  }
}
