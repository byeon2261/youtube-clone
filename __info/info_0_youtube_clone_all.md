# Youtube clone information !!

    setup :
    업데이트 필요

## 2 Set Up

### 2.0 Your First Nodejs project

git init.
github repository 추가 후 remote 진행.

    $ git remote add origin [깃허브 주소]

#### [1_nodeJS]

nodeJS 패키지를 설치한다.

    $ npm init

console에서 질문이 나오며 package.json 파일 셋팅을 등록한다. 이전에 등록한 github페이지가 홈페이지로 자동 들어가진다.

index.js파일을 생성하여 hello world를 등록한다.

    console.log("Hello world !!!")

기본 프로젝트 구성이 완성되었다. package.json과 index.js 두 파일로 기본 구성이 된다.

### 2.1 Installing Express

콘솔에서 nodeJS를 사용하여 javascript를 실행할 수 있다.

    $ node index.js

    >>>: hello world!!

기본적으로 node를 이용해서 파일을 실행하지 않는다. package.json의 script에 실행할 명령어를 등록한다.

    "scripts": {
        "gimochi": "node index.js"
    }

해당 스크립트를 실행한다.

    $ npm run gimochi

    >>>: > youtube-clone@1.0.0 gimochi
         > node index.js

         hello world!!

node index.js를 실행한 결과와 같은 결과가 나온다.

npm을 통해 Express package를 설치하도록 한다.

    $ npm i express

<https://www.npmjs.com/package/express>

node_modules와 package-lock파일이 생성된다. 각 모듈에는 package.json파일과 js파일 library가 있다.

express패키지에 package.json파일에 dependencies항목에 있는 패키지는 express를 실행하기위한 패키지들이다.
devDependencies항목도 필요하지만 나의 application에는 설치되지 않는다. 결국에는 module에 있는 많은 패키지는 express를 위한 패키지이다.

@package.json

    "dependencies": {
        "express": "^4.18.2"
    }

node_modules폴더와 package-lock.json파일은 삭제를 진행한다.
