import type { NextRequest } from 'next/server';
import { DB } from '@/api/_libs';

// 모든 키워드 조회 (페이지네이션 없음)
export async function GET(request: NextRequest) {
  // Prisma를 사용하여 모든 키워드 조회 + SubCategory 정보 포함
  const keywords = await DB.keywords().findMany({
    orderBy: { // 일관된 순서 유지를 위해 정렬 기준 설정 (선택적)
      id: 'asc',
    },
    // 연관된 SubCategory의 name을 함께 조회
    include: {
      sub_category: {
        select: {
          name: true,
        },
      },
    },
  });

  // 응답 데이터 구성 (키워드 목록만 반환)
  return Response.json(keywords, {
    status: 200,
  });
}
