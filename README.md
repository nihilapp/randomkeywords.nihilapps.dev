# Next.js 14 간편 템플릿

Next.js를 간편하게 사용하기 위한 템플릿입니다. 이 템플릿은 기본적인 세팅이 완료된 상태로, 다양한 프로젝트의 기틀로 활용할 수 있습니다. 필요에 따라 추가적인 패키지를 설치하여 확장할 수 있습니다.

## 주요 기능
- **빠른 시작**: 기본적인 설정이 완료되어 있어, 바로 개발을 시작할 수 있습니다.
- **유연한 확장성**: 필요에 따라 다양한 패키지를 추가하여 기능을 확장할 수 있습니다.
- **최신 기술 스택**: 최신 버전의 Next.js와 함께 다양한 최신 라이브러리를 사용합니다.

## 스택
- **폼 컨트롤**: `react-hook-form`, `yup`을 사용하여 폼 유효성 검사를 간편하게 처리합니다.
- **서버 통신**: `axios`, `tanstack react-query`를 사용하여 서버와의 통신을 효율적으로 관리합니다.
- **스타일링**: `styled-components`, `tailwindcss`, `react-responsive`를 사용하여 반응형 디자인을 구현합니다.

## 설치 및 실행
1. **레포지토리 클론**:
   ```bash
   git clone https://github.com/nihil-template/nihil-next-template.git
   cd nihil-next-template
   ```

2. **패키지 설치**:
   ```bash
   yarn install
   ```

3. **개발 서버 실행**:
   ```bash
   yarn run dev
   ```

   브라우저에서 `http://localhost:3000`을 열어 결과를 확인하세요.

## 디렉토리 구조
@src
  /components   # 재사용 가능한 UI 컴포넌트
  /data         # 데이터 및 설정 파일
  /entities     # 데이터 타입 및 엔티티 정의
  /features     # 주요 기능 모듈
  /hooks        # 커스텀 훅
  /images       # 이미지 파일
  /lib          # 외부 라이브러리 및 API 설정
  /styles       # 전역 및 모듈 스타일 파일
  /utils        # 유틸리티 함수 및 헬퍼

@prisma
  schema.prisma # Prisma 스키마 파일

@app
  /(admin-content) # 관리자 콘텐츠 관련 페이지 및 컴포넌트
  /(admin-auth)    # 관리자 인증 관련 페이지 및 컴포넌트
  /(common)        # 공통 페이지 및 컴포넌트
  /(auth)          # 사용자 인증 관련 페이지 및 컴포넌트
