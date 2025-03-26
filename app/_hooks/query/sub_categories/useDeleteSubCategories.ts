import { useMutation } from '@tanstack/react-query';
import { SubCategoriesQuery } from '@/_features';
import type { DeleteSubCategories } from '@/_types';

export function useDeleteSubCategories() {
  const query = useMutation({
    mutationFn: (deleteSubCategoriesDto: DeleteSubCategories) => (
      SubCategoriesQuery.deleteMany(deleteSubCategoriesDto)
    ),
  });

  return query;
}
