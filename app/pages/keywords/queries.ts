import { createId } from '@paralleldrive/cuid2';
import { supabase } from '~/supabase-client';
import type { CreateKeyword, UpdateKeyword } from './types';

export const getKeywords = (
  async () => {
    const res = await supabase
      .from('keywords')
      .select('*');

    return res;
  }
);

export const getKeyword = (
  async (id: string) => {
    const res = await supabase
      .from('keywords')
      .select('*')
      .eq('id', id);

    return res;
  }
);

export const createKeyword = (
  async (createKeywordDto: CreateKeyword) => {
    const res = await supabase
      .from('keywords')
      .insert({
        id: createId(),
        keyword: createKeywordDto.keyword,
        sub_category_id: createKeywordDto.sub_category_id,
      })
      .select('*');

    return res;
  }
);

export const updateKeyword = (
  async (id: string, updateKeywordDto: UpdateKeyword) => {
    const res = await supabase
      .from('keywords')
      .update(updateKeywordDto)
      .eq('id', id)
      .select('*');

    return res;
  }
);

export const deleteKeyword = (
  async (id: string) => {
    const res = await supabase
      .from('keywords')
      .delete()
      .eq('id', id);

    return res;
  }
);

export const deleteKeywords = (
  async (ids: string[]) => {
    const res = await supabase
      .from('keywords')
      .delete()
      .in('id', ids);

    return res;
  }
);
