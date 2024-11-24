import { SubCategory } from '@prisma/client';
import { CreateSubCategoryDto } from '@/src/entities';
import { Api } from '@/src/utils';
import { ExtendedSubCategory } from '@/src/entities/sub_categories/sub-categories.types';

export class SubCategoriesQuery {
  static async getSubCategories() {
    const data = await Api
      .getQuery<ExtendedSubCategory[]>('/sub-categories');

    return data;
  }

  static async createSubCategory(createSubCategoryDto: CreateSubCategoryDto) {
    const data = await Api.postQuery<SubCategory, CreateSubCategoryDto>('/sub-categories', createSubCategoryDto);

    return data;
  }
}
