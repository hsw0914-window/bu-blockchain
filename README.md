# bu-blockchain
미니 프로젝트 깃입니다.

meme-box-backend/
- server. js
— data/
L store. js
|
routes/
- inventory. js
- box. js
- combine. js
shop. js
— utils/
- gradeHelper. js
- nftMetadata.js
- services/


- boxService.js

- combineService.js

mintService. js

revealservice.js
# 진입점, 라우터 연결
# 인메모리 DB (유저, NFT, 박스 등)
# API 엔드포인트 정의
# GET /api/inventory/:userId
# POST /api/box/open
# POST /api/combine
# POST /api/shop/key
# 핵심 비즈니스 로직 # 박스 개봉 확률 계산 # 파편 조합 로직 #
NFT 민팅 로직
#
리빌 애니메이션용 결과 반환
# 등급 확률 계산 함수 # NFT 메타데이터 생성 헬퍼
