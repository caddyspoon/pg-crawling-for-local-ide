# Express를 통해 구축된 백엔드 서버

## 1. 최초 환경 설정

   1. 터미널 명령어 `npm i`로 express 서버 패키지 설치

   2. `crawling` 폴더 내 크롤링 워커를 작동시키기 위한 Python 환경 구축

      - venv 구축

        - 터미널 명령어: `python -m venv <가상환경 이름>`

        - 아래와 같이 `crawling` 폴더 내 venv가 구푹되어야 한다.

        - nodejs
          |- crawling
          	|- venv

      - venv 활성화

        - MacOS 터미널 명령어: `source venv/bin/activate`
        - Windows 터미널 명령어: `source venv/Scripts/activate`
        - 비활성화 터미널 명령어: `deactivate`

       - 패키지 설치
         	- venv 활성화 후 `crawling` 폴더 내 `requirements.txt`를 통한 패지지 설치
          - 터미널 명령어: `pip install -r requirements.txt`
            - 참고) 이후 패키지 추가 시 freeze 터미널 명령어: `pip freeze > requirements.txt`

## 2. 서버 빌드

1. 터미널 명령어 `node app.js`
