import { Category } from '@prisma/client';
import { Api } from '@/src/utils';
import { CreateCategoryDto, ExtendedCategory } from '@/src/entities';

export class CategoriesQuery {
  static async getCategories() {
    const data = await Api
      .getQuery<ExtendedCategory[]>('/categories');

    return data;
  }

  static async getCategory(id: string) {
    const data = await Api
      .getQuery<ExtendedCategory>(`/categories/${id}`);

    return data;
  }

  static async createCategory(createCategoryDto: CreateCategoryDto) {
    const data = await Api.postQuery<Category, CreateCategoryDto>('/categories', createCategoryDto);

    return data;
  }

  static async deleteCategory(id: string) {
    const data = await Api.deleteQuery<null>(`/categories/${id}`);

    return data;
  }
}
