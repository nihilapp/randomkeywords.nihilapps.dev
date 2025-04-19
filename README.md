# 랜덤 키워드 생성기 (randomkeywords.nihilapps.dev)

다양한 카테고리(캐릭터, 배경스토리, 기타)의 키워드를 조합하여 무작위 키워드를 생성하고 제공하는 웹 애플리케이션입니다. 창작 활동이나 아이디어 구상에 영감을 줄 수 있는 키워드를 제공하는 것을 목표로 합니다.

## 주요 기능

- **카테고리 기반 키워드 생성**: 캐릭터, 배경스토리(출신지, 목적), 기타 등 다양한 카테고리의 키워드를 활용합니다.
- **맥락별 키워드 조합**: 현실(Real) 또는 가상(Fantasy) 세계관에 맞는 키워드 조합을 생성하여 제공합니다.
- **API 제공**: 생성된 키워드 데이터를 가져올 수 있는 API 엔드포인트를 제공합니다. (예: `/api/json/background`)
- **일일 데이터 관리 (개발 환경)**: 개발 환경에서는 매일 새로운 키워드 JSON 데이터를 생성/관리하는 기능이 포함될 수 있습니다. (`/api/route.ts`)

## 스택

- **프레임워크**: Next.js 15
- **상태 관리**: `zustand`
- **폼 컨트롤**: `react-hook-form`, `yup` (사용 시)
- **서버 통신**: `axios`, `tanstack react-query` (사용 시)
- **스타일링**: `tailwindcss`, `class-variance-authority`
- **데이터베이스 ORM**: `Prisma` (카테고리/키워드 원본 데이터 관리용)
- **언어**: TypeScript

## 설치 및 실행

1.  **레포지토리 클론**:

    ```bash
    # 필요시 실제 레포지토리 주소로 변경
    git clone https://github.com/your-username/randomkeywords.nihilapps.dev.git
    cd randomkeywords.nihilapps.dev
    ```

2.  **패키지 설치**:

    ```bash
    yarn install
    # 또는 npm install 또는 pnpm install
    ```

3.  **환경 변수 설정**:
    `.env.example` 파일을 복사하여 `.env` 파일을 만들고, 필요한 환경 변수(예: 데이터베이스 연결 정보)를 설정합니다.

4.  **데이터베이스 마이그레이션 (Prisma 사용 시)**:

    ```bash
    yarn db:push # 또는 해당 마이그레이션 스크립트 실행
    ```

5.  **개발 서버 실행**:

    ```bash
    yarn dev
    # 또는 npm run dev 또는 pnpm dev
    ```

    브라우저에서 `http://localhost:3000` (또는 지정된 포트)을 열어 결과를 확인하세요.
