# File Structure

```
do-it-example/
├── index.html                          # 앱 진입 HTML
├── package.json                        # 의존성 정의
├── package-lock.json                   # 의존성 잠금
├── vite.config.js                      # Vite 빌드 설정
├── tailwind.config.js                  # Tailwind CSS 설정
├── postcss.config.js                   # PostCSS 설정
├── .gitignore                          # Git 제외 목록
├── public/
│   └── whitebeard.png                  # 정적 이미지 에셋
└── src/
    ├── main.jsx                        # React 앱 마운트 진입점
    ├── App.jsx                         # 루트 컴포넌트
    ├── index.css                       # 전역 스타일
    ├── index.js                        # 모듈 내보내기
    ├── routes.jsx                      # 라우팅 정의
    ├── lib/
    │   └── utils.js                    # 공통 유틸 함수
    ├── constants/
    │   └── index.js                    # 전역 상수
    ├── hooks/
    │   └── useAttendance.js            # 출석 관련 커스텀 훅
    ├── components/
    │   ├── common/
    │   │   ├── RarityBadge.jsx         # 희귀도 뱃지
    │   │   ├── ResultModal.jsx         # 결과 모달
    │   │   └── SectionHeader.jsx       # 섹션 헤더
    │   ├── figma/
    │   │   └── ImageWithFallback.jsx   # 이미지 폴백 처리
    │   ├── layout/
    │   │   ├── BackgroundEffects.jsx   # 배경 시각 효과
    │   │   ├── Footer.jsx              # 하단 푸터
    │   │   ├── Header.jsx              # 상단 헤더
    │   │   ├── Layout.jsx              # 페이지 레이아웃 래퍼
    │   │   └── Navigation.jsx          # 하단 네비게이션 바
    │   └── ui/
    │       ├── button.jsx              # 버튼 기본 컴포넌트
    │       ├── card.jsx                # 카드 기본 컴포넌트
    │       └── tabs.jsx                # 탭 기본 컴포넌트
    └── pages/
        ├── Attendance/                 # 출석 체크 페이지
        │   ├── index.jsx
        │   └── components/
        │       ├── AttendanceCalendar.jsx  # 출석 달력
        │       └── StreakRewards.jsx       # 연속 출석 보상
        ├── Collection/                 # 컬렉션 보관함 페이지
        │   ├── index.jsx
        │   └── components/
        │       ├── MemeGrid.jsx        # 밈 그리드 목록
        │       └── TitlesGrid.jsx      # 칭호 그리드 목록
        ├── Combine/                    # 아이템 합성 페이지
        │   ├── index.jsx
        │   └── components/
        │       ├── CombineMode.jsx     # 합성 모드 UI
        │       ├── InventoryPanel.jsx  # 인벤토리 패널
        │       └── OpenBoxMode.jsx     # 박스 오픈 모드 UI
        ├── Detail/                     # 아이템 상세 페이지
        │   └── index.jsx
        ├── Home/                       # 홈 메인 페이지
        │   ├── index.jsx
        │   └── components/
        │       ├── BannerSection.jsx       # 메인 배너
        │       ├── EventsSection.jsx       # 이벤트 섹션
        │       ├── PopularNFTsSection.jsx  # 인기 NFT 섹션
        │       ├── RecentItemsSection.jsx  # 최근 아이템 섹션
        │       ├── RecommendedBoxesSection.jsx  # 추천 박스 섹션
        │       └── UserStatsSection.jsx    # 유저 통계 섹션
        ├── MemeInfo/                   # 밈코인 정보 페이지
        │   ├── index.jsx
        │   └── components/
        │       ├── MemeCoinCard.jsx    # 밈코인 카드
        │       └── MemeCoinModal.jsx   # 밈코인 상세 모달
        ├── NotFound/                   # 404 페이지
        │   └── index.jsx
        ├── Notice/                     # 공지사항 페이지
        │   ├── index.jsx
        │   └── components/
        │       ├── NoticeCard.jsx      # 공지 카드
        │       └── NoticeModal.jsx     # 공지 상세 모달
        ├── Onboarding/                 # 온보딩 페이지
        │   └── index.jsx
        └── Shop/                       # 상점 페이지
            ├── index.jsx
            └── components/
                ├── BoxCard.jsx             # 박스 상품 카드
                ├── BundleCard.jsx          # 번들 상품 카드
                ├── KeyCard.jsx             # 열쇠 상품 카드
                └── PurchaseResultModal.jsx # 구매 결과 모달
```
