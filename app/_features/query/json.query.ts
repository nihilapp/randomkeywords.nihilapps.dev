import { Api } from '@/_libs';
import type { BackgroundKeyword } from '@/_types';

// 공통 JSON 데이터 구조 타입 정의
interface KeywordsByCategory {
  [subCategoryName: string]: string[];
}

export class JsonQuery {
  static async getCharacterJson() {
    return Api.getQuery<KeywordsByCategory>('/json/character');
  }

  static async getBackgroundJson() {
    return Api.getQuery<BackgroundKeyword>('/json/background');
  }

  static async getOtherJson() {
    return Api.getQuery<KeywordsByCategory>('/json/other');
  }
}
