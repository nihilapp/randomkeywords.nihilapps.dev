import { createId } from '@paralleldrive/cuid2';
import { supabase } from '~/supabase-client';
import type { CreateSubCategory, UpdateSubCategory } from './types';

export const getSubCategories = (
  async () => {
    const res = await supabase
      .from('sub_categories')
      .select(`
        *,
        keywords(*)
      `);

    return res;
  }
);

export const getSubCategory = (
  async (id: string) => {
    const res = await supabase
      .from('sub_categories')
      .select(`
        *,
        keywords(*)
      `)
      .eq('id', id);

    return res;
  }
);

export const createSubCategory = (
  async (createSubCategoryDto: CreateSubCategory) => {
    const res = await supabase
      .from('sub_categories')
      .insert({
        id: createId(),
        name: createSubCategoryDto.name,
        category_id: createSubCategoryDto.category_id,
        is_prod_hidden: createSubCategoryDto.is_prod_hidden,
      })
      .select('*');

    return res;
  }
);

export const updateSubCategory = (
  async (id: string, updateSubCategoryDto: UpdateSubCategory) => {
    const res = await supabase
      .from('sub_categories')
      .update(updateSubCategoryDto)
      .eq('id', id)
      .select('*');

    return res;
  }
);

export const deleteSubCategory = (
  async (id: string) => {
    const res = await supabase
      .from('sub_categories')
      .delete()
      .eq('id', id);

    return res;
  }
);

export const deleteSubCategories = (
  async (ids: string[]) => {
    const res = await supabase
      .from('sub_categories')
      .delete()
      .in('id', ids);

    return res;
  }
);
