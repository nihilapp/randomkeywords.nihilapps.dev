import { Prisma } from '@prisma/client';

export interface CreateSubCategoryDto {
  categoryId: string;
  name: string;
}

export type ExtendedSubCategory = Prisma.SubCategoryGetPayload<{
  include: {
    Keyword: true;
  };
}>;
