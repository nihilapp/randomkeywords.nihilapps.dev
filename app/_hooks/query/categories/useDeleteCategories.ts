import { useMutation } from '@tanstack/react-query';
import { CategoriesQuery } from '@/_features';
import type { DeleteCategories } from '@/_types';

export function useDeleteCategories() {
  const query = useMutation({
    mutationFn: (deleteCategoriesDto: DeleteCategories) => (
      CategoriesQuery.deleteMany(deleteCategoriesDto)
    ),
  });

  return query;
}
