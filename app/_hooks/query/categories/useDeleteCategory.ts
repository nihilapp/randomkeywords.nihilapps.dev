import { useMutation } from '@tanstack/react-query';
import { CategoriesQuery } from '@/_features';

export function useDeleteCategory(id: string) {
  const query = useMutation({
    mutationFn: () => CategoriesQuery.delete(id),
  });

  return query;
}
