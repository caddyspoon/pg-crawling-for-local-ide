# 로컬 IDE에서의 문제풀이를 위한 파이썬 크롤링 프로젝트

## 개발 관련 정보

### Python/Django 명령어

1. VENV 활성화

   > python -m venv <가상환경 이름>으로 생성된 가상환경의 실행

   - MacOS: `source venv/bin/activate`
   - Windows: `source venv/Scripts/activate`
   - 비활성화의 경우 `deactivate`

2. 파이썬 패키지 프리징 (Windows)

   - `pip freeze -l > requirements.txt`
   - `-l`은 `--local`과 동일하다. 글로벌이 아닌 로컬 접근 설정.

3. 앱(패키지) 추가

- `python manage.py startapp <app name>`
