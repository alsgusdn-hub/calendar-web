# calendar-web
브라우저에서 보는 간단한 달력

외부 라이브러리 없이 순수 HTML, CSS, JavaScript로 만든 월간 달력입니다.

## 사용 방법
1. 저장소를 내려받습니다.
2. `index.html` 파일을 브라우저로 엽니다(더블클릭).
3. 이번 달 달력이 표시되고, 오늘 날짜는 색으로 강조됩니다.
4. 제목 양옆의 `‹`(이전 달), `›`(다음 달) 버튼으로 월을 이동합니다. 12월↔1월처럼 연도가 바뀌는 경우도 자동으로 처리됩니다.

## 파일 구성
- `index.html` — 페이지 구조
- `style.css` — 가운데 정렬, 모바일 대응 스타일
- `script.js` — 달력 계산과 렌더링
- `tests/calendar.test.js` — 날짜 계산 단위 테스트

## 테스트
Node.js 18 이상에서:

```bash
node --test tests/calendar.test.js
```

## GitHub Pages 배포
저장소 Settings → Pages에서 `main` 브랜치의 루트(`/`)를 선택하면 바로 배포됩니다.
