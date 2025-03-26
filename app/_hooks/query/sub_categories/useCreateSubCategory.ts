import { useMutation } from '@tanstack/react-query';
import { SubCategoriesQuery } from '@/_features';
import type { CreateSubCategory } from '@/_types';

export function useCreateSubCategory() {
  const query = useMutation({
    mutationFn: (createSubCategoryDto: CreateSubCategory) => (
      SubCategoriesQuery.create(createSubCategoryDto)
    ),
  });

  return query;
}
