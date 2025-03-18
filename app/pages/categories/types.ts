import type { Database } from '~/types/database.types';

export interface CreateCategory {
  name: string;
  order: number;
  is_prod_hidden?: boolean;
}

export interface UpdateCategory {
  name?: string;
  order?: number;
  is_prod_hidden?: boolean;
}

type Category = Database['public']['Tables']['categories']['Row'];

export interface ExCategory extends Category {
  sub_categories: Database['public']['Tables']['sub_categories']['Row'][];
}
