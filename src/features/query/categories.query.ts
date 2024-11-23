import { Category } from '@prisma/client';
import { Api } from '@/src/utils';
import { CreateCategoryDto } from '@/src/entities';

export class CategoriesQuery {
  static async getCategories() {
    const data = await Api.getQuery<Category[]>('/categories');

    return data;
  }

  static async createCategory(createCategoryDto: CreateCategoryDto) {
    const data = await Api.postQuery<Category, CreateCategoryDto>('/categories', createCategoryDto);

    return data;
  }
}
