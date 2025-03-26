import { useMutation } from '@tanstack/react-query';
import { SubCategoriesQuery } from '@/_features';

export function useDeleteSubCategory(id: string) {
  const query = useMutation({
    mutationFn: () => SubCategoriesQuery.delete(id),
  });

  return query;
}
