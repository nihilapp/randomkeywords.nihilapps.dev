import { useMutation } from '@tanstack/react-query';
import { CategoriesQuery } from '@/_features';
import type { UpdateCategory } from '@/_types';

export function useUpdateCategory(id: string) {
  const query = useMutation({
    mutationFn: (updateCategoryDto: UpdateCategory) => (
      CategoriesQuery.update(id, updateCategoryDto)
    ),
  });

  return query;
}
