import type { Prisma, SubCategory } from '@prisma/client';
import { Api } from '@/_libs';
import type {
  CreateSubCategory, DeleteSubCategories, ExSubCategory, UpdateSubCategory
} from '@/_types';

// API 응답 페이지 타입을 정의
interface SubCategoriesPage {
  items: Prisma.SubCategoryGetPayload<{
    include: { category: { select: { name: true } }, _count: { select: { keyword: true } } }
  }>[]; // Category 정보 포함
  next_cursor: string | undefined;
  count: number;
}

export class SubCategoriesQuery {
  // getAll 함수 수정: params 를 받고 URLSearchParams 사용, 반환 타입 변경
  static getAll(params?: { cursor?: string, limit?: number }) {
    const queryParams = new URLSearchParams();
    if (params?.limit) {
      queryParams.set('limit', String(params.limit));
    }
    if (params?.cursor) {
      queryParams.set('cursor', params.cursor);
    }
    const queryString = queryParams.toString();
    const url = queryString ? `/sub_categories?${queryString}` : '/sub_categories';
    // 반환 타입을 SubCategoriesPage 로 변경
    return Api.getQuery<SubCategoriesPage>(url);
  }

  static getById(id: string) {
    return Api.getQuery<ExSubCategory>(`/sub_categories/${id}`);
  }

  static getByCategoryId(category_id: string) {
    return Api.getQuery<ExSubCategory[]>(`/sub_categories/category_id/${category_id}`);
  }

  static create(createSubCategoryDto: CreateSubCategory) {
    return Api.postQuery<SubCategory, CreateSubCategory>(
      '/sub_categories',
      createSubCategoryDto
    );
  }

  static update(id: string, updateSubCategoryDto: UpdateSubCategory) {
    return Api.patchQuery<SubCategory, UpdateSubCategory>(
      `/sub_categories/${id}`,
      updateSubCategoryDto
    );
  }

  static delete(id: string) {
    return Api.deleteQuery<SubCategory>(`/sub_categories/${id}`);
  }

  static deleteMany(deleteSubCategoriesDto: DeleteSubCategories) {
    return Api.deletesQuery<SubCategory, DeleteSubCategories>(
      `/sub_categories`,
      deleteSubCategoriesDto
    );
  }
}
