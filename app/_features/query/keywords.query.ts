import type { Keyword } from '@prisma/client';
import { Api } from '@/_libs';
import type {
  CreateKeyword, DeleteKeywords, UpdateKeyword
} from '@/_types';

export class KeywordsQuery {
  static getAll() {
    return Api.getQuery<Keyword[]>('/keywords');
  }

  static getById(id: string) {
    return Api.getQuery<Keyword>(`/keywords/${id}`);
  }

  static getBySubCategoryId(subCategoryId: string) {
    return Api.getQuery<Keyword[]>(`/keywords/sub_category/${subCategoryId}`);
  }

  static create(createKeywordDto: CreateKeyword) {
    return Api.postQuery<Keyword, CreateKeyword>(
      '/keywords',
      createKeywordDto
    );
  }

  static update(id: string, updateKeywordDto: UpdateKeyword) {
    return Api.patchQuery<Keyword, UpdateKeyword>(
      `/keywords/${id}`,
      updateKeywordDto
    );
  }

  static delete(id: string) {
    return Api.deleteQuery<Keyword>(`/keywords/${id}`);
  }

  static deleteMany(deleteKeywordsDto: DeleteKeywords) {
    return Api.deletesQuery<Keyword, DeleteKeywords>(
      `/keywords`,
      deleteKeywordsDto
    );
  }
}
