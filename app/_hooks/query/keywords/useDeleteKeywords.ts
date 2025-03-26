import { useMutation } from '@tanstack/react-query';
import { KeywordsQuery } from '@/_features';
import type { DeleteKeywords } from '@/_types';

export function useDeleteKeywords() {
  const query = useMutation({
    mutationFn: (deleteKeywordsDto: DeleteKeywords) => (
      KeywordsQuery.deleteMany(deleteKeywordsDto)
    ),
  });

  return query;
}
