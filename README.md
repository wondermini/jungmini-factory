# Illustration Portfolio Starter

정적 HTML/CSS/JS로 만든 포트폴리오 페이지입니다. 로컬에서 바로 실행할 수 있고, 나중에 GitHub Pages로도 쉽게 배포할 수 있습니다.

## 파일 구성

- `index.html`: 페이지 구조
- `styles.css`: 전체 스타일과 반응형 레이아웃
- `script.js`: 스크롤 등장 애니메이션

## 로컬에서 보기

아래 명령으로 간단한 로컬 서버를 실행할 수 있습니다.

```bash
python3 -m http.server 8000
```

브라우저에서 `http://localhost:8000` 으로 열면 됩니다.

## GitHub Pages 배포

1. GitHub에 새 저장소를 만듭니다.
2. 현재 파일들을 커밋해서 `main` 브랜치에 푸시합니다.
3. GitHub 저장소의 `Settings > Pages`로 이동합니다.
4. `Build and deployment`에서 `Source`를 `Deploy from a branch`로 선택합니다.
5. 브랜치를 `main`, 폴더를 `/ (root)`로 선택하고 저장합니다.
6. 잠시 후 발급되는 GitHub Pages 주소로 접속합니다.

## 커스터마이징 포인트

- `index.html`의 텍스트를 본인 소개와 프로젝트 정보로 교체
- `mailto:` 주소와 SNS 링크를 실제 계정으로 변경
- 작품 이미지를 넣고 싶다면 각 `.work-image` 영역을 `img` 태그로 바꾸거나 배경 이미지로 변경
- 섹션을 더 늘리고 싶다면 `Works` 아래에 프로젝트 상세 블록을 추가
