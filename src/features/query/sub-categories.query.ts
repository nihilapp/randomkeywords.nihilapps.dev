import { SubCategory } from '@prisma/client';
import { CreateSubCategoryDto } from '@/src/entities';
import { Api } from '@/src/utils';

export class SubCategoriesQuery {
  static async getSubCategories() {
    const data = await Api.getQuery<SubCategory[]>('/sub-categories');

    return data;
  }

  static async createSubCategory(createSubCategoryDto: CreateSubCategoryDto) {
    const data = await Api.postQuery<SubCategory, CreateSubCategoryDto>('/sub-categories', createSubCategoryDto);

    return data;
  }
}
