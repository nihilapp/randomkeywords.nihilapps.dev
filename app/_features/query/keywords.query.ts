import type { Keyword, Prisma } from '@prisma/client';
import { Api } from '@/_libs';
import type {
  CreateKeyword, DeleteKeywords, UpdateKeyword
} from '@/_types';

// API 응답 페이지 타입을 정의
interface KeywordsPage {
  items: Prisma.KeywordGetPayload<{
    include: { SubCategory: { select: { name: true } } }
  }>[]; // SubCategory 정보 포함
  nextCursor: string | undefined; // 다음 페이지를 위한 cursor
  count: number; // 전체 키워드 개수
}

export class KeywordsQuery {
  // getAll 함수 수정: params (cursor, limit)를 받아 페이지네이션된 데이터 요청
  static getAll(params?: { cursor?: string, limit?: number }) {
    // URLSearchParams를 사용하여 쿼리 문자열 생성
    const queryParams = new URLSearchParams();
    if (params?.limit) {
      queryParams.set('limit', String(params.limit));
    }
    if (params?.cursor) {
      queryParams.set('cursor', params.cursor);
    }
    const queryString = queryParams.toString();
    // 쿼리 문자열이 있으면 URL에 추가
    const url = queryString ? `/keywords?${queryString}` : '/keywords';

    // API 요청 및 반환 타입 지정 (KeywordsPage)
    return Api.getQuery<KeywordsPage>(url);
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
