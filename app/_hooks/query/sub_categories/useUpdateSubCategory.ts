import { useMutation } from '@tanstack/react-query';
import { SubCategoriesQuery } from '@/_features';
import type { UpdateSubCategory } from '@/_types';

export function useUpdateSubCategory(id: string) {
  const query = useMutation({
    mutationFn: (updateSubCategoryDto: UpdateSubCategory) => (
      SubCategoriesQuery.update(id, updateSubCategoryDto)
    ),
  });

  return query;
}
