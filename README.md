# 🎨 CASETiFY - Show Your Colors

> **당신의 개성을 담은 휴대폰 케이스 커스터마이징 플랫폼**
>
> 고급 3D 디자인, 실시간 미리보기, 그리고 간편한 커스터마이징으로 나만의 완벽한 케이스를 만들어보세요.

🌐 **[라이브 데모](https://casetify-ejone.vercel.app)**

---

## 📋 목차

- [프로젝트 개요](#-프로젝트-개요)
- [주요 기능](#-주요-기능)
- [기술 스택](#-기술-스택)
- [사이트 구성](#-사이트-구성)
- [설치 및 실행](#-설치-및-실행)
- [프로젝트 구조](#-프로젝트-구조)
- [개발 가이드](#-개발-가이드)
- [팀 정보](#-팀-정보)

---

## 📱 프로젝트 개요

**CASETiFY**는 고객이 스마트폰 케이스를 실시간 3D 미리보기와 함께 쉽게 커스터마이징할 수 있는 웹 플랫폼입니다.

### 핵심 가치
- ✨ **3D 실시간 미리보기** - Three.js를 활용한 고품질 3D 렌더링
- 🎨 **무제한 커스터마이징** - 색상, 디자인, 텍스트 자유로운 조합
- 🚀 **빠른 성능** - Vite 기반 최적화된 개발 환경
- 📦 **쉬운 결제** - 간편한 주문 프로세스
- 👥 **소셜 로그인** - 카카오, 네이버 통합 인증

---

## 🎯 주요 기능

| 기능 | 설명 | 상태 |
|------|------|------|
| **3D 케이스 디자인** | 실시간 3D 미리보기로 케이스 디자인 | ✅ |
| **색상 커스터마이징** | 다양한 색상 선택 및 조합 | ✅ |
| **이미지 업로드** | 개인 이미지/로고 추가 | ✅ |
| **텍스트 입력** | 원하는 텍스트 또는 글귀 추가 | ✅ |
| **디자인 저장** | 마이페이지에서 디자인 저장 및 관리 | ✅ |
| **주소 검색** | 다음 우편번호 서비스 통합 | ✅ |
| **소셜 로그인** | 카카오, 네이버 로그인 | ✅ |
| **결제 시스템** | 안전한 결제 처리 | ✅ |
| **주문 관리** | 주문 현황 및 배송 추적 | ✅ |

---

## 🛠️ 기술 스택

### Frontend Framework & Build
```
┌─────────────────────────────────────────┐
│          Frontend Stack                  │
├─────────────────────────────────────────┤
│ • React 19.2.5 - UI Framework           │
│ • Vite 8.0.1 - Build Tool               │
│ • React Router 7.14.0 - Routing         │
│ • Zustand 5.0.12 - State Management     │
└─────────────────────────────────────────┘
```

### 3D & Animation
```
┌─────────────────────────────────────────┐
│      3D & Animation Libraries            │
├─────────────────────────────────────────┤
│ • Three.js 0.184.0 - 3D Graphics        │
│ • React Three Fiber 9.6.1 - 3D React    │
│ • React Three Drei 10.7.7 - 3D Helpers  │
│ • Framer Motion 12.38.0 - Animations    │
│ • Motion 12.38.0 - Animation Engine     │
└─────────────────────────────────────────┘
```

### UI & Styling
```
┌─────────────────────────────────────────┐
│       Styling & UI Components            │
├─────────────────────────────────────────┤
│ • SCSS 27% - Styling                    │
│ • Swiper 12.1.3 - Carousel              │
│ • HTML2Canvas 1.4.1 - Screenshot        │
└─────────────────────────────────────────┘
```

### External Services
```
┌─────────────────────────────────────────┐
│       External Integrations              │
├─────────────────────────────────────────┤
│ • Firebase 12.12.0 - Backend & Auth     │
│ • React Daum Postcode 4.0.0 - 주소검색  │
│ • Kakao SDK - 카카오 로그인              │
│ • Naver SDK - 네이버 로그인              │
│ • Color Namer 1.4.0 - Color 관리        │
│ • React DatePicker 9.1.0 - Date Input   │
└─────────────────────────────────────────┘
```

### 언어별 비율
```
JavaScript  72.8%  ████████████████████████████░░░░
SCSS        27.0%  ███████░░░░░░░░░░░░░░░░░░░░░░░░░
Other        0.2%  ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
```

---

## 🏗️ 사이트 구성

### 주요 페이지 플로우
```
┌─────────────────────────────────────────────────────────┐
│                    홈 (Home)                             │
│          - 소개, 프로모션, 추천 상품                      │
└────────────┬────────────────────────────┬────────────────┘
             │                            │
             ▼                            ▼
    ┌──────────────────┐      ┌──────────────────┐
    │ 커스터마이징       │      │ 상품 갤러리        │
    │ (Customizer)     │      │ (Gallery)        │
    │                  │      │                  │
    │ - 3D 모델링      │      │ - 상품 목록      │
    │ - 색상 선택      │      │ - 필터링        │
    │ - 이미지 업로드  │      │ - 상세보기      │
    │ - 텍스트 추가    │      │                  │
    │ - 저장/공유      │      │                  │
    └────────┬─────────┘      └────────┬─────────┘
             │                        │
             └────────────┬───────────┘
                         ▼
                  ┌──────────────┐
                  │  장바구니/결제  │
                  │ (Cart/Order) │
                  │              │
                  │ - 상품 확인   │
                  │ - 배송지 입력 │
                  │ - 결제        │
                  └────────┬─────┘
                           ▼
                  ┌──────────────┐
                  │  마이페이지    │
                  │ (MyPage)     │
                  │              │
                  │ - 주문 관리   │
                  │ - 디자인 저장 │
                  │ - 사용자 정보 │
                  └──────────────┘
```

### 데이터 흐름
```
┌─────────────┐
│   User UI   │
└────────┬────┘
         │
         ▼
┌──────────────────────┐
│   React Components   │
│  (with Zustand)      │
└────────┬─────────────┘
         │
    ┌────┴────┐
    │          │
    ▼          ▼
┌────────┐  ┌──────────────┐
│ 3D      │  │ Firebase API │
│ Three.js│  │ (Auth, Data) │
└────────┘  └──────────────┘
```

### 사용자 여정 (User Journey)
```
1️⃣ 방문          2️⃣ 로그인           3️⃣ 디자인
   (Guest)    (Kakao/Naver)      (3D Editor)
                    │                  │
                    ▼                  ▼
            회원 정보 저장      디자인 커스터마이징
                    │                  │
                    └────────┬─────────┘
                             ▼
                    4️⃣ 미리보기 & 저장
                      (Preview, Save)
                             │
                             ▼
                    5️⃣ 장바구니 추가
                      (Add to Cart)
                             │
                             ▼
                    6️⃣ 주문 & 결제
                      (Checkout)
                             │
                             ▼
                    7️⃣ 배송 추적
                      (Order Tracking)
```

---

## 🚀 설치 및 실행

### 필수 요구사항
- Node.js 16.x 이상
- npm 또는 yarn

### 설치 단계

1. **저장소 클론**
```bash
git clone https://github.com/ej-lee77/casetify-dev.git
cd casetify-dev
```

2. **의존성 설치**
```bash
npm install
```

3. **환경 변수 설정**
```bash
# .env 파일 생성
VITE_FIREBASE_API_KEY=your_api_key
VITE_KAKAO_APP_KEY=your_kakao_key
VITE_NAVER_CLIENT_ID=your_naver_client_id
```

4. **개발 서버 실행**
```bash
npm run dev
```
브라우저에서 `http://localhost:5173` 접속

5. **빌드**
```bash
npm run build
```

6. **빌드 미리보기**
```bash
npm run preview
```

### NPM Scripts
| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 시작 (HMR 활성화) |
| `npm run build` | 프로덕션 빌드 |
| `npm run preview` | 빌드된 앱 미리보기 |
| `npm run lint` | ESLint 실행 |

---

## 📁 프로젝트 구조

```
casetify-dev/
├── src/
│   ├── main.jsx              # 앱 진입점
│   ├── App.jsx               # 메인 컴포넌트
│   ├── components/           # 재사용 컴포넌트
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   ├── Customizer/       # 3D 커스터마이징
│   │   ├── Gallery/          # 상품 갤러리
│   │   ├── Cart/             # 장바구니
│   │   └── MyPage/           # 사용자 정보
│   ├── pages/                # 페이지 컴포넌트
│   │   ├── HomePage.jsx
│   │   ├── CustomizerPage.jsx
│   │   ├── GalleryPage.jsx
│   │   ├── CartPage.jsx
│   │   └── MyPagePage.jsx
│   ├── store/                # Zustand 상태 관리
│   │   ├── userStore.js
│   │   ├── cartStore.js
│   │   ├── designStore.js
│   │   └── customizerStore.js
│   ├── services/             # API 및 외부 서비스
│   │   ├── firebase.js
│   │   ├── api.js
│   │   └── auth.js
│   ├── utils/                # 유틸리티 함수
│   │   ├── helpers.js
│   │   ├── validators.js
│   │   └── constants.js
│   ├── styles/               # 글로벌 스타일
│   │   ├── main.scss
│   │   ├── variables.scss
│   │   └── mixins.scss
│   └── assets/               # 이미지, 폰트 등
│       ├── images/
│       ├── icons/
│       └── fonts/
├── public/                   # 정적 파일
│   ├── favicon.png
│   └── models/              # 3D 모델
├── index.html               # HTML 진입점
├── vite.config.js           # Vite 설정
├── package.json             # 프로젝트 메타데이터
├── eslint.config.js         # ESLint 설정
├── vercel.json              # Vercel 배포 설정
└── README.md                # 프로젝트 문서
```

---

## 💻 개발 가이드

### 코드 스타일
```
✅ ESLint 규칙 준수
✅ SCSS 모듈화
✅ React Hooks 사용
✅ 함수형 컴포넌트 작성
✅ Zustand로 상태 관리
```

### 컴포넌트 작성 예시
```jsx
import { useStore } from '@/store'
import './Component.scss'

export default function Component() {
  const { data, updateData } = useStore()

  return (
    <div className="component">
      {/* JSX 코드 */}
    </div>
  )
}
```

### 상태 관리 (Zustand)
```javascript
import { create } from 'zustand'

export const useCustomizerStore = create((set) => ({
  color: '#000000',
  setColor: (color) => set({ color }),
  texture: null,
  setTexture: (texture) => set({ texture }),
}))
```

### 커밋 컨벤션
```
feat: 새 기능 추가
fix: 버그 수정
docs: 문서 수정
style: 코드 포맷팅
refactor: 리팩토링
perf: 성능 개선
test: 테스트 추가
chore: 빌드, 패키지 등
```

---

## 🔗 배포

### Vercel 배포
프로젝트는 **Vercel**에 자동 배포됩니다.

- **라이브 URL**: https://casetify-newolive.vercel.app/
- **자동 배포**: main 브랜치 push 시 자동 배포
- **환경 변수**: Vercel 대시보드에서 설정

### 배포 체크리스트
- [ ] 환경 변수 설정 완료
- [ ] 빌드 성공 (`npm run build`)
- [ ] 라이빙 서버 접속 확인
- [ ] 모든 기능 테스트 완료

---

## 📊 프로젝트 통계

| 항목 | 값 |
|------|-----|
| **언어** | JavaScript (72.8%), SCSS (27.0%) |
| **저장소 크기** | ~1 MB |
| **생성 날짜** | 2026년 3월 26일 |
| **마지막 수정** | 2026년 6월 18일 |
| **라이선스** | MIT |

---

## 📞 팀 정보

### 개발팀
- **팀 이름**: 1조 (CASETiFY)
- **깃허브**: [@ej-lee77](https://github.com/ej-lee77)
- **배포**: [casetify-newolive.vercel.app](https://casetify-newolive.vercel.app/)

### 문의 사항
- 📧 이메일: [eunji0.0777@gmail.com](mailto:eunji0.0777@gmail.com)
- 🐛 버그 리포트: [GitHub Issues](https://github.com/ej-lee77/casetify-dev/issues)

---

## 📚 참고 자료

### 공식 문서
- [React 공식 문서](https://react.dev)
- [Vite 가이드](https://vitejs.dev)
- [Three.js 문서](https://threejs.org/docs)
- [Firebase 가이드](https://firebase.google.com/docs)
- [Zustand](https://github.com/pmndrs/zustand)

### 외부 서비스
- [Kakao Developers](https://developers.kakao.com)
- [Naver Developers](https://developers.naver.com)
- [Daum 우편번호](https://postcode.map.daum.net)

---

## 📄 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다.

---

<div align="center">

**🎨 당신의 개성을 담은 케이스, CASETiFY에서 만드세요!**

[라이브 데모 방문하기](https://casetify-ejone.vercel.app) • [GitHub 저장소](https://github.com/ej-lee77/casetify-dev)

</div>
