import { useMutation } from '@tanstack/react-query';
import { CategoriesQuery } from '@/src/features/query';

export function useDeleteCategory() {
  const query = useMutation({
    mutationFn: (id: string) => CategoriesQuery.deleteCategory(id),
  });

  return query;
}
