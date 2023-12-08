# 로컬 IDE에서의 문제풀이를 위한 파이썬 크롤링 프로젝트

## 0. 서비스 개요

프로그래머스에서 알고리즘 공부를 좀 하고 있었는데 말이죠, 좀 불편하더라고요. 저는 로컬 IDE에서 코드를 짜는데 말이죠, 테스트 케이스랑 초기 함수를 복사해서 가져오는 과정이 별 건 아니어도 매번 해주는 게 너무 불편했어요. 그래서 그걸 편하게 해보자 싶어 만든 서비스랍니다.

## 1. 서비스 로컬 설치

### 1. 백엔드 서버 빌드

> 백엔드 서버는 `Express.js`로 만들어지긴 했는데, 문제 가져오는 건 `Python`으로 크롤링하는 거라 Python의 가상 환경을 먼저 활성화 해주고 서버를 빌드해줘야 해요.

- 운영체제에 `Python3`와 `Node.js`가 설치되어 있어야 해요.

#### 1. Python 가상환경 활성화

> nodejs 서버의 루트 환경으로 이동 후 해당 스크립트를 입력합니다.

```bash
cd workspaces/nodejs
```

**A. MacOS**

```bash
# nodejs 폴더에서
source crawling/venv/bin/activate
```

**B. Windows**

```bash
# nodejs 폴더에서
source crawling/venv/Scripts/activate
```

#### 1-1. (서버 첫 실행 시에만) Python 패키지 설치

```bash
# nodejs 폴더에서
pip install -r crawling/requirements.txt
```

#### 2. Express.js 서버 빌드

```bash
# nodejs 폴더에서
node app.js
```

---

### 2. 프론트엔드 서버 빌드

> `React` 프로젝트 경로로 이동해서 실행해줍니다.

```bash
cd workspaces/frontend/gold-mine
```

#### 0. (첫 실행시에만) 의존성 설치

```bash
# workspaces/frontend/gold-mine 폴더에서
npm i
```

#### 1. React 서버 빌드

```bash
# workspaces/frontend/gold-mine 폴더에서
npm start
```
