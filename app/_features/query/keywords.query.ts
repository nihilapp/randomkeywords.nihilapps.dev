import type { Keyword } from '@prisma/client';
import { Api } from '@/_libs';
import type {
  CreateKeyword, DeleteKeywords, UpdateKeyword
} from '@/_types';
import type { BackgroundKeyword, ExKeyword } from '@/_types/keywords.types';

export class KeywordsQuery {
  // 페이지네이션 없이 모든 키워드를 가져오는 함수
  static getAll() {
    return Api.getQuery<ExKeyword[]>('/keywords/all');
  }

  // 페이지네이션된 데이터를 요청하는 함수 (기존 getAll에서 이름 변경)
  static getInfiniteAll(params?: { cursor?: string, limit?: number }) {
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

    // 반환 타입 명시 (KeywordsPage 사용)
    return Api.getQuery<import('@/_types').KeywordsPage>(url);
  }

  // 키워드 검색 함수 수정
  // 파라미터에 sub_category_id 추가
  static search(params: { word: string, sub_category_id?: string, cursor?: string, limit?: number }) {
    // sub_category_id가 존재하고 'all'이 아니면 쿼리 파라미터에 추가
    // URLSearchParams를 사용하여 쿼리 문자열 생성
    const queryParams = new URLSearchParams();

    // 필수 파라미터인 word 추가
    queryParams.set('word', params.word);

    // 선택적 파라미터들은 존재할 때만 추가
    if (params.sub_category_id && params.sub_category_id !== 'all') {
      queryParams.set('sub_category_id', params.sub_category_id);
    }

    if (params.cursor) {
      queryParams.set('cursor', params.cursor);
    }

    if (params.limit) {
      queryParams.set('limit', String(params.limit));
    }

    const url = `/keywords/search?${queryParams.toString()}`;

    return Api.getQuery<import('@/_types').KeywordsPage>(url);
  }

  static getById(id: string) {
    return Api.getQuery<Keyword>(`/keywords/${id}`);
  }

  static getBySubCategoryId(sub_category_id: string) {
    return Api.getQuery<Keyword[]>(`/keywords/sub_category_id/${sub_category_id}`);
  }

  static getBackground() {
    return Api.getQuery<BackgroundKeyword>('/keywords/background');
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
