import { useMutation } from '@tanstack/react-query';
import { CreateCategoryDto } from '@/src/entities';
import { CategoriesQuery } from '@/src/features/query';

export function useCreateCategory() {
  const query = useMutation({
    mutationFn: (createCategoryDto: CreateCategoryDto) => (
      CategoriesQuery.createCategory(createCategoryDto)
    ),
  });

  return query;
}
