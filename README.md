# Next.js 15 간편 템플릿

Next.js를 간편하게 사용하기 위한 템플릿입니다. 이 템플릿은 기본적인 세팅이 완료된 상태로, 다양한 프로젝트의 기틀로 활용할 수 있습니다. 필요에 따라 추가적인 패키지를 설치하여 확장할 수 있습니다.

## 주요 기능

- **빠른 시작**: 기본적인 설정이 완료되어 있어, 바로 개발을 시작할 수 있습니다.
- **유연한 확장성**: 필요에 따라 다양한 패키지를 추가하여 기능을 확장할 수 있습니다.
- **최신 기술 스택**: 최신 버전의 Next.js와 함께 다양한 최신 라이브러리를 사용합니다.

## 스택

- **상태 관리**: `zustand`를 사용하여 전역 상태를 간편하게 관리합니다.
- **폼 컨트롤**: `react-hook-form`, `yup`을 사용하여 폼 유효성 검사를 간편하게 처리합니다.
- **서버 통신**: `axios`, `tanstack react-query`를 사용하여 서버와의 통신을 효율적으로 관리합니다.
- **스타일링**: `tailwindcss`, `class-variance-authority`를 사용하여 반응형 디자인을 구현합니다.
- **데이터베이스**: `Drizzle`를 사용하여 데이터베이스 연동이 준비되어 있습니다.

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
   yarn run serve
   ```

   브라우저에서 `http://localhost:3000`을 열어 결과를 확인하세요.
