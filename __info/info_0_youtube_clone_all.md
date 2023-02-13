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

### 2.2 Understanding Dependencies

npm install을 실행하면 package.json의 dependencies를 찾아 알아서 필요한 package를 설치해준다.

    $ npm i

똑같이 express가 설치된다. 깃허브에 node_module을 올리지 않으며 다른 사용자에게 프로젝트를 보낼때 module은 용량이 크므로 보내지 않는다.
이럴때 package.json을 받아서 모듈을 설치할 때 사용되며 매우 유용하다.

npm install 명령어는 package.json파일을 수정하기때문에 package.json이 수정된 부분이 있다면 저장을 하고 install을 진행한다.
저장이 안된상태에서 install을 진행하면 충돌이 일어난다.

### 2.3 The Tower of Babel

express를 구현하도록 하겠다.

    const express = require("express");  // require 메서드를 통해 외부 모듈을 가져올 수 있디.

    const app = express();

더 나은 코드로 구현이 가능하나 babel사용을 위해 짜여진 코드이다. babel은 자바스크립트 컴파일러이다.
nodeJS가 이해하지 못하는 Javascript가 있다.
nodeJS가 이해하는 자바스크립트만 사용을 할건지 nodeJS가 이해하지 못하는 코드를 사용하면서 nodeJS가 이해할 수 있게 컴파일을 해줄지 해야한다.

babel 홈페이지에 가면 최신 자바스크립트 문법이 어떻게 변환되는지 볼 수 있다.

<https://babeljs.io/>

물론 후자를 위해 컴파일러인 babel을 사용한다. babel을 설치한다.

    $ npm install --save-dev @babel/core

babel 패키지가 설치되며 package.json에 내용이 추가된다.

    "devDependencies": {
        "@babel/core": "^7.20.12"
    }

--save-dev명령어를 사용하면 package.json에 "devDependencies" 항목으로 추가된다.
devDependencies는 개발자를 위한 Dependencies이며 개발에만 사용된다.

babel.config.json파일을 생성한다.

    $ touch babel.config.json

@babel.config.json

    {
        "presets": ["@babel/preset-env"]
    }

babel/preset-env도 설치해준다.

    $ npm install @babel/preset-env --save-dev

preset은 babel을 위한 매우 거대한 플러그인이다. 최신 자바스크립트 문법이 사용가능하다.
