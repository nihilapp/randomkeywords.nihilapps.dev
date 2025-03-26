import { useMutation } from '@tanstack/react-query';
import { KeywordsQuery } from '@/_features';

export function useDeleteKeyword(id: string) {
  const query = useMutation({
    mutationFn: () => KeywordsQuery.delete(id),
  });

  return query;
}
