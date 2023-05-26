# Youtube clone information !!

    setup :
        nodeJS
        express
        babel
        nodemon
        morgan
    업데이트 필요

파일 path안내중에 src가 빠진 부분도 있지만 package.json 및 설정파일을 제외한 모든 작업파일은 src안에 있다.

## 2 Set Up

### 2.0 Your First Nodejs project

git init.
github repository 추가 후 remote 진행.

```sh
$ git remote add origin [깃허브 주소]
```

#### [1_nodeJS]

nodeJS 패키지를 설치한다.

```sh
$ npm init
```

console에서 질문이 나오며 package.json 파일 셋팅을 등록한다. 이전에 등록한 github페이지가 홈페이지로 자동 들어가진다.

index.js파일을 생성하여 hello world를 등록한다.

```sh
console.log("Hello world !!!")
```

기본 프로젝트 구성이 완성되었다. package.json과 index.js 두 파일로 기본 구성이 된다.

### 2.1 Installing Express

콘솔에서 nodeJS를 사용하여 javascript를 실행할 수 있다.

    $ node index.js

    >>>: hello world!!

기본적으로 node를 이용해서 파일을 실행하지 않는다. package.json의 script에 실행할 명령어를 등록한다.

```json
"scripts": {
    "gimochi": "node index.js"
}
```

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

```json
"dependencies": {
    "express": "^4.18.2"
}
```

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

```js
const express = require("express"); // require 메서드를 통해 외부 모듈을 가져올 수 있디.

const app = express();
```

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

### 2.4 Nodemon

babel을 사용하여 변환을 시키는 코드가 있다. 하지만 우리는 babel을 직접 사용하여 js파일을 변환하지 않는다.

    // 사용하지 않는다!
    require("@babel/core").transform("code", {
        presets: ["@babel/preset-env"],
    });

대신 package.json에 babel로 컴파일하는 script를 추가해준다. 그전에 babel/node을 설치해야한다. ! babel/modemon참고
<https://babeljs.io/>

    $ npm install @babel/node --save-dev

바벨을 통해 node를 실행하도록 script를 변경해준다.
@package.json

    "start": "node index.js" -> "dev": "babel-node index.js"

    $ npm run dev
    // 로 실행

babel을 사용함으로 최신 문법을 사용할 수 있게 되었다. index.js를 변경 적용하도록 한다.

    import express from "express"; // require을 쓰는것을 import로 변경하여 사용가능

    const app = express();

nodemon을 사용하면 서버에 관련된 파일이 변경이 되면 다시 실행을 해준다. nodemon을 설치해준다.

    $ npm i nodemon --save-dev

설치와 함께 package.json 리스트에 추가가 된다. 실행 script에 nodemon 명령어를 추가해준다.

    "dev": "nodemon --exec babel-node index.js"

이로써 nodemon으로 서버를 구축할 수 있게 되었으며 babel-node를 사용하여 js최신문법을 사용하는데에도 문제가 발생하지 않는다.

    $ npm run dev

console 명령어가 종료되지 않으며 파일이 변경되면 재실행된다.

# 3 Introduction to Express

### 3.0 Your First Server

서버를 구현한다. src폴더를 생성하여 index.js를 안으로 옮겨준다. package.json에 index 실행 path를 변경해준다.

    "scripts": {
        "dev": "nodemon --exec babel-node src/index.js"
    },

서버가 request를 받아 응답을 할 수 있는 코드를 작성하겠다. request응답은 listen()을 사용하여 받을 수 있다.

@src/index.js

    const AppListening = () => {
        console.log("4000 port listening success!");
    };

    app.listen(4000, AppListening());  // 4000: 임의의 서버 port

console에 응답 문구가 나온다. 브라우져에서도 서버 통신이 가능하다.

    http://localhost:4000/

    >>>: Cannot GET /

홈페이지를 갖고 오지는 못하지만(구현을 안했으니..) 해당 응답은 response해준다.

### 3.2 GET Requests part Two

GET 요청에 받아서 실행될 함수를 구현한다.
@src/index.js

    const homeListening = () => console.log("sombody insert to the home ❗️");

    app.get("/", homeListening);  // 실행될 기능은 무조건 함수 형식으로 들어가야한다.

root주소로 접근을 하면 console이 찍힌다. 하지만 브라우져는 응답을 받지 않았기때문에 무한 대기 상태가 된다.

### 3.3 Responses

app.get() 메게변수에는 순서대로 request, response가 있다.

    const handlehome = (req, res) => console.log(req);

    app.get("/", handlehome);

    >>>: 매우 많은 데이터가 나온다... 한번 해보도록
        (쿠키, 메서드, 접근자 정보, 접근 위치 등등)

res의 end함수를 사용하면 response데이터를 보내지 않고 request요청을 종료할 수 있다.

    return res.end()

send를 사용하면 데이터를 보내준다.

    return res.send("hhhhhhh");

브라우져에 텍스트가 출력된다.

### 3.4 Recap

<https://expressjs.com/ko/4x/api.html#express>

express의 함수와 속성들을 확인 할 수 있다.

### 3.5 Middlewares part One

handler를 여러개 사용하여 middleware를 사용할 수 있다.
get() 메게변수중에 next()를 사용하면 다음 middleware 또는 finalware로 이동이 가능하다.

    const gossipMiddleware = (req, res, next) => {
        console.log("I'm in middleware.");
        next();
    };
    const handleHome = (req, res) => {
        return res.send("<h1>hhhhhhh<h1>");
    };

    app.get("/", gossipMiddleware, handleHome);

gossipMiddleware > handleHome 순으로 실행이 된다.
next는 미들웨어든 컨테이너든 사용이 가능하다.(미들웨어, 컨테이너... 위치에 따라 명칭만 바뀔뿐이다.)

### 3.6 Middlewares part Two

app의 use()를 구현해본다. use()는 global middleware를 구현하는데 사용된다.

@index.js

    const logger = (req, res, next) => {  // 이전 미들웨어를 이름만 변경
        console.log(`${req.method}: ${req.url}`);
        next();
    };
    app.use(logger);  // 여러 함수를 중복되어 사용이 가능하다.
    app.get("/", handleHome);

logger()는 어느 url에 이동을 하든 실행이 된다.

미들웨어 로직중에 return을 하게되면 뒤의 로직은 실행되지 않는다.(당연히)

    const privateModdleware = (req, res, next) => {
        const url = req.url;
        if (url === "/private") {
            console.log("user coming to private url.");
            return res.send("Not Allowed.");
        }
        console.log("insert success.");
        next();
    };
    const privatePage = (req,res) => {
        return res.send("I'm private page")
    }

    app.use(privateModdleware);
    app.get("/private", privatePage);


    >>>: Not Allowed. (브라우져)

### 3.6 ~ 3.10 ... Recap

### 3.11 External Middlewares

미들웨어 morgan을 설치한다. morgan은 node.js용 request logger middleware이다.

    $ npm i morgan

<https://github.com/expressjs/morgan>

logger기능 구현을 한다.

    import morgan from "morgan";
    ...
    const logger = morgan("dev");
    ...
    app.use(logger);

    >>>: GET / 304 1.837 ms - -

# ! 몰랐지만 import부분은 이름을 마음대로 지정이 가능하다.

    import gimochi from "morgan";

    gimochi("dev")

### 4.1 Making Our Routers

url에 단계를 나누어 각 단계마다 app에 연결하는 것을 라우터라고 한다.

    /users/login
    /users/edit
    이때 '/login', '/edit'이 라우터이다.

express의 router()로 라우터를 생성할 수 있다.

    const userRouter = express.Router();

해당 라우터에 핸들러를 등록 및 url 설정을 한다.

    const handleEditUser = (req, res) => res.send("Edit User");
    userRouter.get("/edit", handleEditUser);

그리고 라우터를 express().use에 등록하면 완성이다.

    app.use("/users", userRouter);

URL에 '/users/edit'으로 접근이 가능하다.

### 4.2 Cleaning the Code

clean code에 있는 내용을 비롯해서 설명을 하자면 코드는 생각나는데로 작성을 하고 나중에 코드 정리를 진행한다.
그리고 코드 정리는 코드작성한 시간이상으로 진행해야한다.

이전에 작성한 코드를 분리 진행한다.
@routes/... 라우터들 각 파일들 생성해서 코드 이동

중복되는 부분이 있으니 코드는 더 개선을 진행한다.

### 4.3 Exports

이젠 라우터를 폴더와 파일로 나눴으니 라우터 안에 있는 컨트롤러(핸들러)를 따로 분류하는 작업을 진행하겠다.

@controllers/... 각 파일들 생성헤서 코드 이동

globalRouter는 공통적으로 실행되는 로직만 남겨둔다.
globalRouter에 있는 기능이 있는 로직은 각 파일로 이동을 해준다.

# ! export를 여러개 보내줄 경우 받는 파일은 dictionary형식으로 받아야한다.

    export const handleWatch = ...
    export const handleEdit = ...
    // 일경우 import할때

    import { handleWatch } from "..."
    // 형식으로 받아야한다.  //이제야 react할때 {...} 형식으로 쓰는 이유를 알았다.

export default는 함수형식만 사용이 가능하다.

    export default const edit = () => ...  (X)
    export default function edit(){...}    (O)

### 4.6 Planning Routes

README.md에 작업할 내용 추가
컨트롤러에 해당 내용 추가 및 라우터에도 추가 진행

### 4.7 URL Parameters part One

URL에 파라미터를 받는 url은 같은 레벨에 있는 url중 가장 밑에 위치한다.

### 4.8 URL Parameters part Two

정규식을 사용하는 방법으로 URL의 타입을 정할 수 있다.

\w+: 모든 문자, 숫자 선택.
\d+: 모든 숫자 선택.

```js
videoRouter.get("/:id(\\d+)", see);
```

숫자형식으로만 접근이 가능하다.
이런 방식으로 타입을 지정할 수 있다.

### 4.0 Returning HTML

send를 html형식으로 전송이 가능하다. controller에 적용해준다.

```javascript
res.send(
  "<!DOCTYPE html><html lang='ko'><head><title>Youtube</title></head><body><h1>Home</h1><footer>&copy; 2023 youtube -  All rights reserved</footer></body></html>"
);
```

url을 보내주는 코드가 길어진다. 해당 문제를 해결하기 편리한 프로그램이 PUG가 있다.

<https://github.com/pugjs/pug>

### 5.1 Configuring Pug

pug는 템플릿 엔진이다. pug를 설치해준다.

    $ npm i pug

expressjs에는 view engine을 설정할 수가 있다.

```javascript
app.set("view engine", "pug");
```

views폴더와 home.pug를 생성해준다.
이전 html태그형식을 pug형식으로 변경해서 작성해준다. python과 같이 띄어쓰기로 인식을 한다.

```pug
doctype html
html
    head
        title Youtube
    body
        h1 Home gg
        footer &copy; 2023 youtube -  All rights reserved
```

기존컨트롤러에 view파일을 렌더링한다.

```javascript
... = res.render("home")
```

로직을 적용하면 에러가 발생한다. view파일을 youtube-clone폴더에서 찾는다.
express를 실행시키는 package.json파일 위치 기준으로 view파일을 찾는다.

```javascript
console.log(process.cwd());
```

현재 프로젝트 폴더 위치를 확인할 수 있다.

path를 사용하여 파일을 찾는 위치를 변경이 가능하다.

```javascript
import path from "path";

...
app.set("views", path.join(__dirname, "views"));
```

### 5.2 Partials

express 셋팅방법에 대해 찾을 수있다.

api.html 셋팅
<https://expressjs.com/en/4x/api.html#app>

```javascript
app.set("views", process.cwd() + "/src/views");
```

정상작동한다.

<https://pugjs.org/api/getting-started.html>

watch페이지를 구현하여 videoController에 render로 적용한다.

```pug
...
h1 watch page!
footer &copy; #{new Date().getFullYear()} -  All rights reserved
```

#{}사용하여 js함수를 사용할 수 있다.

footer와 head같이 공통으로 사용되는 로직을 분할하여 적용할 수 있다.

@src/views/partials/footer.pug 생성 후
footer부분을 옮겨준다.

@src/views/home.pug 하고 watch.pug

```pug
...
h1 ....
include partials/footer.pug
```

footer부분에 넣어준다.

### 5.3 Extending Templates

일정 중복된는 부분을 사용하는데에는 include를 사용하였다.
주요 내용을 제외한 페이지 구성을 생성하여 불러오는 기능을 사용할 수 있다.

@src/views/base.pug 생성

```pug
doctype html
html
    head
        title Youtube
    body
        block content
        include partials/footer.pug
```

기존 페이지 내용 전부 삭제 후 다음 내용을 입력한다.
@src/views/home

```pug
extends base.pug

block content
    h1 Home
```

extend한 로직에서 block 이름에 맞는 로직을 가져와 해당 부분에 적용한다.

### 5.4 Variables to Templates

패아지 head에 중복되는 부분이 있다.

@edit.pug,home.pug,watch.pug

    block title
        [페이지명] | Youtube

해당 부분을 페이지 변수를 사용하여 중복제거를 진행하겠다.
우선 템플릿부분에 title block을 삭제해준다. 그리고 base.pug head에 타이틀을 추가해준다
@views/base.pug

    head
        title #{pageTitle} | Youtube

템플릿에 필요한 변수를 보내줘야한다. 해당 변수는 템플릿에서는 생성할 수 없다. 컨트롤러에서 생성하여 보내줄 수 있다.

@controllers/videoController.js

    export const tranding = (req, res) => res.render("home", { pageTitle: "Home" });

### 5.6 MVP Styles

기본 셋팅을 하는데 좀 더 예쁘게 보고 싶다면 mvp css 설치하여 사용하면 된다. 이전 js강의에서도 사용을 했었다.
(나중에도 사용될지는 모르겠지만, 안사용하겠지..)

@views/base.pug

```pug
head
    ...
    link(rel="stylesheet" href="https://unpkg.com/mvp.css")
```

태그의 props를 사용할때는 괄호를 사용한다.

```pug
input(placeholder="Whats your name")
```

내용을 왼쪽으로 쏠려있는것을 해결할려면 main 태그를 사용할 수 있다.

```pug
body
    main
        block content
```

### 5.7 Conditionals

변수값을 넣을때 ${}를 사용하지않고 직접 대입할 수 있다.

@.../base.pug

```pug
header
    h1=pageTitle
```

header로 pageTitle값이 출력된다.

이번 강의는 Conditional에 따라 화면이 변경되는 것을 연습한다.
유저가 로그인된 상황을 연출하기 위해서 임의의 유저 정보를 생성한다.

@controllers/videoController.js

```javascript
// export를 하지 않아도 된다.
const fakeUser = {
  username: "gh",
  loggedIn: true,
};

export const tranding = (req, res) =>
  res.render("home", { pageTitle: "Home", fakeUser });
```

유저가 로그인의 상황에 따라 표기값이 변경되도록 적용한다.

@views/base.pug

```pug
if fakeUser.loggedIn
    small Hello, #{fakeUser.username}
nav
    ul
        if fakeUser.loggedIn
            li
                a(href="/users/logout") Log out
        else
            li
                a(href="/login") Log in
```

로그인을 하면 유저 이름과 logout링크를 표시한다. 테스트에서 로그인 상태를 변경하면서 진행하면된다.

# ! 위 로직에서 굳이 li태그를 두번을 사용한 이유가 무엇일까?

li태그를 밖으로 빼고 중복을 제거하여 테스트를 진행하여도 기능상 문제는 없어 보인다.

!내용 추가 필요...

### 5.8 Iteration

이전 강의에서 사용된 list는 삭제를 진행한다. pug에서 사용이 가능한 iteration기능으로 video리스트를 구현해본다.

<https://pugjs.org/language/iteration.html>

임의의 리스트를 생성하여 home페이지에 보내준다.

@.../videoController.js

```js
export const tranding = (req, res) => {
  const videos = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return res.render("home", { pageTitle: "Home", videos });
};
```

home.pug에서 받은데이터를 리스트로 표현하는 기능을 구현한다. 해당 기능은 js가 아닌 pug의 기능이다.

@views/home.pug

```pug
ul
    each video in videos
        li=video
```

컨트롤러에서 받은 데이터를 리스트로 표현한다. 받은 리스트값이 없을 경우 표현값은 else로 구현이 가능하다.

```pug
else
    li Sorry, nothing found.
```

### 5.9 Mixins

mixin기능을 사용하여 component를 생성할 수 있다.
기존 video리스트를 mixin파일로 옮긴다.

@views/mixins/video.pug

```pug
mixin video(videoData)
    div
        h4=videoData.title
        ul
            li #{videoData.rating}/5
            li #{videoData.comment} comments.
            li Posted #{videoData.createdAt}.
            li #{videoData.views} views.
```

기존 페이지에서 include하여 사용한다.

```pug
include mixins/video

block ...
    ...
    each video in videos
        +video(video)
...
```

이전과 같이 작동한다. 이렇게 component를 생성할 수 있다.

# 6 MongoDB and Mongoose

### 6.0 Array Database part One

데이터베이스를 구성하기전에 데이터를 서버에 보내는 방식을 배우는 강의이다.

@src/routes/videoController.js

```js
export const see = (req, res) => {
  // const id = req.params.id; 이것과 같이 작동한다.
  const { id } = req.params;
  // 컴퓨터 숫자는 0부터 시작하니 1을 차감한다.
  const video = videos[id - 1];
  return res.render("watch", { pageTitle: `Watching ${video.title}`, video });
};
```

Controller에서 보낸 데이터를 화면에 표시한다.

```pug
h4
    a(href=`videos/${video.id}`)=video.title
```

다음 강의에 이어서 작업진행.

### 6.1 Array Database part Two

값에 따라 string을 변경하는 문법이다.

```pug
span #{video.views} #{video.views === 1 ? "view" : "views"}
```

views값이 1이라면 "1 view"로 표기한다.

비디오를 수정페이지로 이동하는 ancher를 생성한다.

```pug
a(href="edit") Edit Video &rarr;
```

링크를 클릭하면 'videos/edit'으로 이동한다. href="/edit"으로 해야 /edit으로 이동한다.
'/'를 사용하지 않은 url은 relative url이므로 해당 페이지에 최하단 url만 변경하여 이동한다.
('videos/3' >>> 'videos/edit')
'/edit' url은 어디에 있든 root페이지에서 이동한다.

### 6.2 Edit Video part One

타이틀명을 변경하는 form을 생성해본다.

@src/views/edit.pug

```pug
form(action="/save-changes", method="POST")
    // name: 변경시킬대상 required: 필수값
    input(name="title",placeholder="Video Title", value=video.title, required)
    input(value="Save", type="submit")
```

### 6.3 Edit Video part Two

get, post등 url을 route를 이용하여 여러개를 등록할 수 있다.

@src/routes/videoRouter.js

```js
videoRouter.route("/:id(\\d+)/edit").get(getEdit).post(postEdit);
```

데이터를 전송하기위해서 express설정을 추가해줘야한다.

<https://expressjs.com/en/4x/api.html#express.urlencoded>

urlencode 기능은 미들웨어가 사용되기 전에 기능구현을 진행한다.

@src/index.js

```js
app.use(express.urlencoded({ extended: true }));

app.use("/", globalRouter);
...
```

이제 form에서 post하는 값을 인식할 수 있다.

@src/controllers/videoController.js

```js
export const postEdit = (req, res) => {
  ...
  console.log(req.body); //req.body: 받는값
```

<https://expressjs.com/en/4x/api.html#req.body>

```sh
>>> { title: 'video #2 ㅇㅇ' }
```

해당 데이터를 적용하는 로직을 구성한다.

```js
export const postEdit = (req, res) => {
  ...
  const { title } = req.body;
  videos[id - 1].title = title; // ! 해당 방법은 array DB이기 때문에 사용된 빙법이다.
```

데이터가 변경된다.

물론 지금 데이터를 js에 있는 임의 데이터이기 때문에 로직에 있는 데이터가 변경되지는 않는다.

# ! 그러면 변경되는 데이터는 어디에 적용되는건가?

메모리에 저장이 된다. array DB는 사용되지 않기 때문에 깊게 파고들 필요가 없다.

---

어디서 데이터를 가져오는지는 모르겠지만 어느 페이지에서 보든 데이터가 변경된 값으로 잘 나온다.

### 6.5 More Practice part One

base.pug에 nav리스트를 생성

upload페이지를 구현한다.

- videoRouter
- videoController
- upload 템플릿 생성

get페이지만 구현한다.

### 6.6 More Practice part Two

임의의 데이터를 생성한다.

```js
const { title } = req.body;
const newVideo = {
  title,
  rating: 4,
  comment: 4,
  createdAt: "just now",
  views: 0,
  id: videos.length + 1,
};
```

해당 데이터를 array db에 넣어준다.

```js
videos.push(newVideo);
```

### 6.7 Introduction to MongoDB

MongoDB를 설치를 진행한다.
<https://www.mongodb.com/docs/manual/administration/install-community/>

위의 url에서 사용하는 os를 선택하여 설치를 진행하면 된다.

1. macOS 터미널에서 mongoDB를 실행하기위해서는 Xcode command-line tools이 필요하다.

```sh
$ xcode-select --install
```

homebrew가 설치되어 있어야한다.<https://brew.sh/#install>

2. mongoDB를 설치해준다.

```sh
$ brew tap mongodb/brew
$ brew update
$ brew install mongodb-community@6.0
```

이제 mongoDB가 실행이된다.

```sh
$ brew services start mongodb-community@6.0
```

# ! 윈도우 및 linux, 우분투 설치에 대한 설명들이 해당 강의 댓글에 있다. 참고하자

<https://nomadcoders.co/wetube/lectures/2696>

윈도우에서 mongoDB설치가 복잡하다. 설치를 간단하게 해주는 사이트가 있다. chocolatey

<https://community.chocolatey.org/packages>

chocolatey가 설치되어 있다면 위 url에서 검색을 하여 설치 진행을 해도 된다.

---
