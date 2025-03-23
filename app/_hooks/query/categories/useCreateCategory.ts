import { useMutation } from '@tanstack/react-query';
import { CategoriesQuery } from '@/_features';
import type { CreateCategory } from '@/_types';

export function useCreateCategory() {
  const query = useMutation({
    mutationFn: (createCategoryDto: CreateCategory) => (
      CategoriesQuery.create(createCategoryDto)
    ),
  });

  return query;
}
