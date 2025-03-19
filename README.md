# 랜덤키워드 프로젝트

## 소개

이 프로젝트는 카테고리, 서브 카테고리, 키워드를 관리하고 랜덤으로 키워드를 제공하는 웹 애플리케이션입니다. 사용자 인터페이스와 관리자(CMS) 인터페이스를 모두 제공합니다.

## 기술 스택

### 프론트엔드

- **React 19**: 최신 리액트 버전을 사용하여 UI 구성
- **React Router 7**: 새로운 데이터 로딩 패턴과 향상된 라우팅 기능 활용
- **TailwindCSS 4**: 유틸리티 우선 CSS 프레임워크로 스타일링
- **TypeScript**: 타입 안정성을 위한 정적 타입 시스템
- **Zustand**: 상태 관리 라이브러리
- **Class Variance Authority (CVA)**: 컴포넌트 변형 관리

### 백엔드

- **Supabase**: 데이터베이스 및 인증 서비스
- **React Router 7 서버 컴포넌트**: 서버 사이드 렌더링 지원

### 개발 도구

- **Vite**: 빠른 개발 서버와 빌드 도구
- **ESLint**: 코드 품질 관리
- **PostCSS**: CSS 전처리기

## 주요 기능

- 카테고리, 서브 카테고리, 키워드 관리
- 관리자 대시보드 (CMS)
- 사용자 인터페이스
- 다크 모드 지원
- 반응형 디자인

## 프로젝트 구조

```
app/
├── components/         # 공통 컴포넌트
├── config/             # 사이트 설정
├── hooks/              # 커스텀 훅
├── layouts/            # 레이아웃 컴포넌트
├── migrations/         # 데이터베이스 마이그레이션
├── pages/              # 페이지 컴포넌트
│   ├── categories/     # 카테고리 관련 기능
│   ├── common/         # 공통 페이지 (홈, CMS 홈)
│   ├── keywords/       # 키워드 관련 기능
│   └── sub-categories/ # 서브 카테고리 관련 기능
├── store/              # 상태 관리 (Zustand)
├── styles/             # 스타일 파일
│   ├── animation/      # 애니메이션 관련 스타일
│   ├── size/           # 크기 관련 스타일
│   └── variant/        # 변형 관련 스타일
├── types/              # 타입 정의
└── utils/              # 유틸리티 함수
```

## 데이터 구조

프로젝트는 다음과 같은 데이터 구조를 가집니다:

1. **카테고리**: 최상위 분류 단위

   - id, name, order, is_prod_hidden 등의 필드

2. **서브 카테고리**: 카테고리의 하위 분류

   - id, name, category_id, is_prod_hidden 등의 필드

3. **키워드**: 서브 카테고리에 속한 키워드
   - id, keyword, sub_category_id 등의 필드

## 개발 환경 설정

```bash
# 의존성 설치
yarn install

# 개발 서버 실행
yarn serve

# 타입 체크
yarn typecheck

# 빌드
yarn build

# 데이터베이스 관련 명령어
yarn db:generate  # 스키마 생성
yarn db:migrate   # 마이그레이션 실행
yarn db:studio    # 데이터베이스 스튜디오 실행
yarn db:typegen   # 데이터베이스 타입 생성
```

## 배포

이 프로젝트는 React Router 7의 서버 컴포넌트를 활용하여 서버 사이드 렌더링을 지원합니다. 빌드된 애플리케이션은 다음 명령어로 실행할 수 있습니다:

```bash
npm run start
```

## 주요 파일 설명

### 설정 파일

- `vite.config.ts`: Vite 설정 파일
- `react-router.config.ts`: React Router 설정 파일
- `drizzle.config.ts`: Drizzle ORM 설정 파일
- `app/config/site.config.ts`: 사이트 기본 설정 정보

### 라우팅

- `app/routes.ts`: 애플리케이션 라우트 정의
- `app/root.tsx`: 루트 레이아웃 및 에러 처리

### 레이아웃

- `app/layouts/CommonLayout.tsx`: 사용자 인터페이스 레이아웃
- `app/layouts/CmsLayout.tsx`: 관리자 인터페이스 레이아웃

### 페이지

- `app/pages/common/routes/Home.tsx`: 메인 홈페이지
- `app/pages/common/routes/CmsHome.tsx`: 관리자 홈페이지
- `app/pages/categories/routes/CmsCategories.tsx`: 카테고리 관리 페이지
- `app/pages/sub-categories/routes/CmsSubCategories.tsx`: 서브 카테고리 관리 페이지
- `app/pages/keywords/routes/CmsKeywords.tsx`: 키워드 관리 페이지
