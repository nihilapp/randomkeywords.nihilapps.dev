export interface CreateKeyword {
  keyword: string;
  subCategoryId: string;
}

export interface UpdateKeyword {
  keyword?: string;
}

export interface DeleteKeywords {
  ids: string[];
}
