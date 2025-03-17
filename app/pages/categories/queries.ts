import { createId } from '@paralleldrive/cuid2';
import { supabase } from '~/supabase-client';
import type { CreateCategory, UpdateCategory } from './types';

export async function getCategories() {
  const categories = await supabase
    .from('categories')
    .select(`
        *,
        sub_categories(*)
      `);

  return categories;
}

export async function getCategory(id: string) {
  const category = await supabase
    .from('categories')
    .select(`
        *,
        sub_categories(*)
      `)
    .eq('id', id);

  return category;
}

export const createCategory = (
  async (createCategoryDto: CreateCategory) => {
    const res = await supabase
      .from('categories')
      .insert({
        id: createId(),
        name: createCategoryDto.name,
        order: createCategoryDto.order,
        is_prod_hidden: createCategoryDto.is_prod_hidden,
      })
      .select('*');

    return res;
  }
);

export const updateCategory = (
  async (id: string, updateCategoryDto: UpdateCategory) => {
    const res = await supabase
      .from('categories')
      .update(updateCategoryDto)
      .eq('id', id)
      .select('*');

    return res;
  }
);

export const deleteCategory = (
  async (id: string) => {
    const res = await supabase
      .from('categories')
      .delete()
      .eq('id', id);

    return res;
  }
);

export const deleteCategories = (
  async (ids: string[]) => {
    const res = await supabase
      .from('categories')
      .delete()
      .in('id', ids);

    return res;
  }
);
