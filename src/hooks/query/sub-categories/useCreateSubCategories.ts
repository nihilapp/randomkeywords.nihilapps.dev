import { useMutation } from '@tanstack/react-query';
import { CreateSubCategoryDto } from '@/src/entities';
import { SubCategoriesQuery } from '@/src/features/query';

export function useCreateSubCategories() {
  const query = useMutation({
    mutationFn: (createSubCategoryDto: CreateSubCategoryDto) => (
      SubCategoriesQuery.createSubCategory(createSubCategoryDto)
    ),
  });

  return query;
}
