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
