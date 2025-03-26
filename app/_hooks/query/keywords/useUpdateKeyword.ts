import { useMutation } from '@tanstack/react-query';
import { KeywordsQuery } from '@/_features';
import type { UpdateKeyword } from '@/_types';

export function useUpdateKeyword(id: string) {
  const query = useMutation({
    mutationFn: (updateKeywordDto: UpdateKeyword) => (
      KeywordsQuery.update(id, updateKeywordDto)
    ),
  });

  return query;
}
