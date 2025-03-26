import { useMutation } from '@tanstack/react-query';
import { KeywordsQuery } from '@/_features';
import type { CreateKeyword } from '@/_types';

export function useCreateKeyword() {
  const query = useMutation({
    mutationFn: (createKeywordDto: CreateKeyword) => (
      KeywordsQuery.create(createKeywordDto)
    ),
  });

  return query;
}
