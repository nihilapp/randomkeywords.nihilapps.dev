export interface CreateSubCategory {
  name: string;
  category_id: string;
  is_prod_hidden?: boolean;
}

export interface UpdateSubCategory {
  name?: string;
  category_id?: string;
  is_prod_hidden?: boolean;
}
