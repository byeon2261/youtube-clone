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

### 6.8 Connecting to Mongo

mongoDB설치확인을 위해 터미널에 'mongod'를 작성한다.

```sh
$ mongod

>>>: {"t":{"$date":"2023-05-25T18:04:30.256+09:00"},"s":"I",  "c":"NETWORK",  "id":4915701, "ctx":"-","msg":"Initialized wire specification","attr":{"spec":{"incomingExternalClient":{"minWireVersion":0,"maxWireVersion":17},"incomingInternalClient":{"minWireVersion":0,"maxWireVersion":17},"outgoing":{"minWireVersion":6,"maxWireVersion":17},"isInternalClient":true}}}
...
```

해당 텍스트가 여러개 나오면 설치가 성공한 것이다.

'mongosh'명령어를 사용하여 shell에서 mongoDB shell안으로 들어갈 수 있다. ! mac에서의 명령어이다.

```sh
$ mongosh
```

mongoDB명령어가 사용가능하다. help명령어로 참조.
node.js도 shell에서 접속을 하여 console.log명령어가 잘 실행되는지 확인한다.

mongDB, node.js를 다 확인했다면 Node.js와 mongoDB를 이어주는 mongoose를 설치한다.
js를 작성하면 mongoose가 mongoDB가 이해하는 언어로 변경하여 전달한다.

<https://mongoosejs.com/docs/guide.html>

설치를 진행한다.

```sh
$ npm i mongoose
```

@src 폴더안에 'db.js'를 생성해주며 @server.js에서 파일을 import를 해준다.
import를 해주는 것만으로도 db.js를 실행시켜준다.

@src/server.js

```js
import "./db";
```

@src/db.js

```js
import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1:27017/youtube");
```

강의에서는 경고 문구가 뜬다. 설정을 추가해달라는 경고 문들이다. 하지만 내가 실행에서는 경고 문구가 뜨지 않는다.
니꼬는 경고문구에 나오는 설정값을 connect문에 array형식으로 추가해주었다.

```js
mongoose.connect("mongodb://127.0.0.1:27017/youtube", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
``;
```

db상태 메세지를 추가한다.

```js
const db = mongoose.connection;

db.on("error", (error) => console.log("DB error >>>: ", error));
db.once("open", (open) => console.log("✅ Connected to DB"));
```

on은 항시 받으며 once는 한번만 작동한다.

### 6.9 CRUD Introduction

src폴더에 models/Video.js파일을 생성해서 schema 구성을 작성한다.

### 6.10 Video Model

schema를 작성한다.

```js
const videoSchema = new mongoose.Schema({
  title: String,
  description: String,
  createAt: Date,
  hashtags: [{ type: String }],
  meta: {
    views: Number,
    rating: Number,
  },
});
```

모델을 작성해준다.

```js
const video = mongoose.model("video", videoSchema);
export default video;
```

해당 모델을 export해준다. 이제 해당 파일을 @server.js에서 import 한다.

@src/server.js

```js
import "./models/Video.js";
```

### 6.11 Our First Query

앞으로 schema와 model은 많이 늘어날 것이며 그만큼 @server.js의 import리스트도 늘어난다.
import만을 따로 관리할 파일을 생성하여 작성하도록 하겠다.

@src/init.js

```js
import "./db";
import "./models/Video.js";
```

기존 server.js에 있던 파일import 부분을 옮긴다.
그리고 실행에 관련된 로직을 init.js로 이동한다.

@src/init.js

```js
const PORT = 4000;

const AppListening = () => {
  console.log(`✅ listening server on http://localhost:${PORT} 🚀`);
};

app.listen(PORT, AppListening());
```

pacjage.json 실행 script 실행파일을 server.js에서 init.js로 변경해준다.

@package.json

```js
"scripts": {
    "dev": "nodemon --exec babel-node src/init.js"
},
```

app선언은 server.js에 있기때문에 server.js에서 app을 export해주며 init에서 import해준다.

video데이터베이스를 사용하기때문에 가짜 videos 데이터베이스는 삭제하며 데이터를 사용하던 로직도 삭제한다.

### 6.12 Our First Query part Two

@videoCOntroller.js에서 import한 Video(model)의 find를 사용하여 데이터베이스를 불러온다.
find함수는 **콜백함수**로 함수내 로직이 다 실행된 후에 실행되도록 한다.

    콜백함수: 함수를 등록하기만 하고 어떤 이벤트가 발생했거나 특정 시점에 도달했을 때 시스템에서 호출하는 함수

render부분을 find함수 안에 위치하면 database검색이 끝나야 rendering이 시작된다.

```js
Video.find({}, (error, videos) => {
  return res.render("home", { pageTitle: "Home", vidoes });
});
```

# ! Model.find() no longer accepts a callback 에러 발생

!! mongoose의 버젼이 높아서 발생한 오류였다.
지금버젼: ^7.~
버젼 다운그래이드

```sh
$ npm i mongoose@5.12.3
```

```sh
>>>: npm WARN deprecated @types/bson@4.2.0: This is a stub types definition. bson provides its own type definitions, so you do not need this installed.

added 20 packages, removed 11 packages, changed 10 packages, and audited 387 packages in 3s

58 packages are looking for funding
  run `npm fund` for details

2 vulnerabilities (1 moderate, 1 high)

To address all issues, run:
  npm audit fix --force
```

npm audit fix --force 진행.

```sh
$ npm audit fix --force
```

오류가 발생하지 않는다.

---

### 6.13 Async Await

콜백함수를 사용하게되면 함수안에 함수가 있는 형식이된다. 콜백함수형식 대신에 promise로 변경해보겠다.

@src/videoController.js

```js
export const home = async (req, res) => {
  const video = await Video.find({});
  return res.render("home", { pageTitle: "Home" });
};
```

<https://ko.javascript.info/async-await>

콜백함수와 다르게 순차적으로 실행되며 에러는 try-catch문을 사용하여 제어한다.

### 6.14 Returns and Renders

controller에서 render함수를 실행할때 return값을 전달할 필요는 없다.
하지만 return을 사용하지않고 render함수이후에 redirect를 사용함으로써 에러가 발생시키는 경우가 있다.
에러 방지차원에서 render할 때 return을 사용하도록 한다.

### 6.15 Creating a Video part One

데이터를 폼에서 받아서 document를 생성하여 database에 저장하는 로직을 구성한다.

우선 input 폼을 구성하여 controller에 데이터를 보내주는 로직을 구성한다.

@src/views/upload.pug

```pug
block content
    form(method="POST")
        input(name, placeholder, required, type)
```

@src/controllers/videoController.js

```js
export const postUpload = (req, res) => {
  const { title, description, hashtags } = req.body;
  ...
}
```

Video model에 필요한 description, hashtags를 추가해주었다.해당 데이터로 document를 생성한다.

```js
const video = new Video({
  title,
  description,
  createdAt: Date.now(),
  hashtags: hashtags.split(",").map((word) => `#${word}`),
  meta: {
    views: 0,
    rating: 0,
  },
});
console.log("created video >>>:", video);
```

```sh
# shell
created video >>>: {
  hashtags: [ '#oh', '#my', '#god' ],
  _id: 6479b02f5e65391d6ede099a,
  title: 'title1',
  description: 'des1',
  createdAt: 2023-06-02T09:02:39.009Z,
  meta: { views: 0, rating: 0 }
}
```

\_id는 mongoDB에서 생성해준 컬럼이다.

### 6.16 Creating a Video part Two

해당 데이터를 저장해준다.

```js
const dbVideo = await video.save();
console.log("dbVideo >>>:", dbVideo);
```

```sh
# shell
dbVideo >>>: {
  hashtags: [ '#oh', '#my', '#god' ],
  _id: 647d7b4862446e2a3a80dee1,
  title: 'title1',
  description: 'des1',
  createdAt: 2023-06-05T06:06:00.551Z,
  meta: { views: 0, rating: 0 },
  __v: 0
}
```

create를 사용하여 데이터를 바로 저장이 가능하다.

```js
await Video.create({
    title,
    description,
    ...,
})
```

결과는 같게 저장이 된다.

<https://mongoosejs.com/docs/models.html#constructing-documents>

### 6.17 Exceptions and Validation

create문을 사용할때 에러가 발생하며 try-catch문을 사용하여 에러 해결을 한다.
그냥 에러가 발생하면 화면 변경없이 계속 로딩상태에 빠진다.

잘못된 데이터 타입을 전송하면 에러가 발생하지만 일부 데이터를 빼먹고 전송하면 에러는 발생하지 않는다.
해당 오류를 체크하고 싶다면 컬럼 설정값에 required를 추가해준다.

@src/models/Video.js

```js
const videoSchema = new mongoose.Schema({
    ...
    createAt: { type: Date, required: true }
    ...
})
```

```sh
# shell
# 'createAt' does not insert data
>>>: ValidationError: Video validation failed: createdAt: Path `createdAt` is required.
    at ValidationError.inspect (...)
    at formatValue (node:internal/util/inspect:780:19)
    at ...
    ...`
  errors: {
    createdAt: ValidatorError: Path `createdAt` is required.
        at validate (...)
        at ...
        ...
        at processTicksAndRejections (node:internal/process/task_queues:78:11) {
      properties: [Object],
      kind: 'required',
      path: 'createdAt',
      value: undefined,
      reason: undefined,
      [Symbol(mongoose:validatorError)]: true
    }
  },
  _message: 'Video validation failed'
}
```

try-catch문을 사용하여 에러조치를 진행한다.

```js
try {
    await Video.create({
        ...
    })
}catch(error){
    ...
    return res.render("upload", { pageTitle: `Upload Video` }
}
```

error.\_message를 가져와서 에러메세지를 표시하도록 하겠다.

@videoController.js

```js
return res.render("upload", {
  pageTitle: `Upload Video`,
  errorMessage: error._message,
});
```

@src/views/upload.pug

```pug
block content
    if errorMessage
        span=errorMessage
    ...
```

컬럼의 defualt값을 부여할 수 있다.
Date.now를 넣어주면 now()함수가 바로 실행되는 것이 아니라 값을 넣어줘야 할 때만 now()가 실행된다.

@src/models/Vidoe.js

```js
export const videoSchema = new mongoose.schema({
  ...,
  createdAt: { type: Date, required: true, default: Date.now },
  ...,
});
```

### 6.26 Search part One

search 탬플릿, router, controller

controller에서 query값 가져오기

### 6.27 Search part Two

기본 속성은 검색하는 keyword가 제목과 일치해야 검색이 된다.

```js
videos = await Video.find({
  title: keyword,
});
```

당연히 제목 전체검색 기능은 불편하니 일부분 일치하는 제목이 나오도록 기능을 추가한다.

param 검색 속성

<https://www.mongodb.com/docs/v6.0/reference/operator/query/regex/>
<https://www.regexpal.com/>

```js
videos = await Video.find({
  title: {
    // "i": 대소문자 구분을 하지 않는다.
    $regex: new RegExp(keyword, "i"),
    // $gt: 해당 수치보단 큰 결과값. 조회수같은데 사용 가능
    $gt: 10000,
  },
});
```

# 7 User Authentication

### 7.0 Create Account part One

유저 입력 및 데이터 확인 로직 생성

## ! 놓혔던 부분.

- init,server.js에 파일 추가하지 않음
- form (method="POST") 추가하지 않음
- res.render 사용하기
- mongoose model 설정하기

경고발생

```sh
(node:28737) DeprecationWarning: collection.ensureIndex is deprecated. Use createIndexes instead.
(Use `node --trace-deprecation ...` to show where the warning was created)
```

### 7.1 Create Account part Two

데이터 저장

! shell에서 mongosh데이터 확인하기

```sh
>>>: mongosh # mongo를 입력하면 이해를 하지 못한다.(강의 및 다른 게시물에서는 mongo명령어로 실행이된다.)
>>>: show dbs
>>>: use `db name`
>>>: show collections
>>>: db.`col_ name`.find()
```

collection생성은 data create하면 자동 생성된다.

### 7.2 Creating Account part Three

패스워드를 hashing을 통해 변경하여 저장한다.

<https://emn178.github.io/online-tools/sha256.html>

@src/models/User.js

```js
userSchema.pre("save", async function () {
  console.log("password >>>:", this.password);
  this.password = await bcrypt.hash(this.password, 5); // hashing을 5번 진행한다.
  console.log("hash password >>>:", this.password);
});
```

### 7.3 Form Validation

joinPost에 exist()를 사용하여 중복체크를 진행한다.

@src/controllers/userController.js

```js
const usernameExists = await User.exists({ username });
if (usernameExists) {
  return res.render("join", {
    pageTitle: "Join",
    errorMessage: "This username is already taken.",
  });
}
const emailExists = await User.exists({ email });
if (emailExists) {
  return res.render("join", {
    pageTitle: "Join",
    errorMessage: "This email is already taken.",
  });
}
```

@srx/views/join.pug

```pug
block content
    if errorMessage
        span=errorMessage
    form ...
```

중복되는 부분을 errorMessage로 전달하여 알려준다.

만약 에러메세지를 분할 시킬필요가 없다면 exists() 전달 인자에 $or operator를 사용하여 여러인자를 보내도록 구현하는 것이 좋다.
<https://www.mongodb.com/docs/manual/reference/operator/query/or/>

```js
const exists = await User.exists({ $or: [{ username }, { email }] });
if (exists) {
  return res.render("join", {
    pageTitle: "Join",
    errormassage: "already taken.",
  });
}
```

둘중에 하나라도 중복된다면 true를 반환한다.

### 7.4 Status Codes

http 상태 코드를 보내도록 하겠다.

```js
return res.status(400).render( ... )
```

response할때 상태를 같이 보내면 된다.

### 7.7 Sessions and Cookies part One

유저가 로그인 후 유저 데이터를 계속 갖고 있도록 기능을 구현한다.
해당 기능은 섹션과 쿠키를 사용한다.

express-session 레지스트리에 해당 기능이 있다.

<https://www.npmjs.com/package/express-session>

    $ npm i express-session

session을 @src/server.js에 사용 설정을 한다.
해당기능은 router앞에서 초기화한다.

```js
app.use(session({}));
```

저장하면 서버가 실행되며 express-session 설정 알림이 console에 출력된다.

```sh
express-session deprecated undefined resave option; provide resave option src/server.js:24:40
express-session deprecated undefined saveUninitialized option; provide saveUninitialized option src/server.js:24:40
express-session deprecated req.secret; provide secret option src/server.js:24:40
```

설정을 추가해주자.

```js
app.use(
  session({
    secret: "hello!!!",
    resave: true,
    saveUninitialized: true,
  })
);
```

설정 후 브라우져로 실행을 하면 개발자창/application/cookie에서 connect.sid가 생성된다.

![7.7 Sessions and Cookies part One_1](#https://raw.githubusercontent.com/byeon2261/youtube-clone/main/__img/7.7%20Sessions%20and%20Cookies%20part%20One_1.png)

해당 쿠키는 backend와 통신을 할때 브라우져가 알아서 같이 전달을 해준다.

쿠키 데이터를 콘솔에 출력을 해보도록 하겠다.

```js
app.use((req, res, next) => {
  req.sessionStore.all((err, sessions) => {
    console.log(sessions);
    next();
  });
});
```

@sh
console에 값이 [Object: null prototype] {} 식으로 나오지 않는다면 브라우져를 새로고침 또는 로그인을 확인 해보자

```sh
[Object: null prototype] {
  XG2xfwTgnWSusS51tvy4MQdxjIfH8Q6l: {
    cookie: { originalMaxAge: null, expires: null, httpOnly: true, path: '/' }
  }
}
```

또는

```js
app.use((req, res, next) => {
  console.log(req.headers);
  next();
});
```

```sh
{
  host: 'localhost:4000',
  ...,
  cookie: 'connect.sid=s%3AoyWwpnY3lJsDgb_7m46oc_DBk6cEZHd6.E3S7xJgQ5Cn%2Faj4Bay%2B5H1sIBDbofzOvtRWz%2Bh4et6U',
}
```

방식으로 출력값이 나온다.

### 7.10 Logged In User part Two

response의 locals에 템플릿에서 사용 가능한 전역변수를 생성할 수 있다.
@src/middleware

```js
res.locals.sexyguy = "It's you!";
```

@탬플릿

```pug
h3 sexyguy's,.. #{sexyguy}
```

locals.변수명 식으로 사용하지 않고 바로 변수명을 사용할 수 있다.

### 7.14 Expiration and Secrets

이전에 DB에 session값을 저장하도록 적용했다. 지금까지는 login되지 않은 user도 cookie를 생성해주었다.

@src/server.js

```js
app.use(
  session({
    ...,
    resave: true,
    saveUninitialized: true,
  })
)
```

두 설정값을 false로 설정한다.

쿠키 설정값을 넣어줄 수 있다.

```js
app.use(
  session({
    ...,
    cookie: {
      maxAge: 3000, // 3초 뒤에 cookie는 삭제된다.
    },
  })
)
```

### 7.15 Environment Variables

github 및 보호해야할 텍스트를 환경변수로 지정하여 관리할 수 있다. nodejs에서는 dotenv package를 설치하여 사용한다.

```sh
$ npm i dotenv
```

<https://www.npmjs.com/package/dotenv>

설치후 import 대신에 require를 사용한다.

```js
require("dotenv").config();
```

'process.env.환경변수'식으로 사용이 가능하다.

하지만 require을 사용하면 환경변수를 사용해야할 파일에 전부 require을 추가해줘야한다.
require대신에 import를 해주자.
@init.js

```js
import "dotenv/config";
```

<https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps>

### 7.17 Github Login part Two

github login 파라미터를 추가해주며 url을 정리할 수있는 라우터와 컨트롤러를 만들어준다.

URLSearchParams(): js의 오브젝트 형식의 데이터를 parameter형식으로 변환시켜준다.

```js
const config = {
  client_id: "94cf88c350148b7acec6",
  allow_signup: "false",
  scope: "read:user user:email",
};
const params = new URLSearchParams(config).toString();
```

```sh
params >>>: client_id=94cf88c350148b7acec6&allow_signup=false&scope=read%3Auser+user%3Aemail
```

<https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams>

github login페이지에서 콜백받을 url을 FinishGithubLogin의 path로 설정해준다.

### 7.18 Github Login part Three

fetch를 이용해 데이터를 가져와 json형식으로 변환하기로 하겠다

URL?Params 생성 >> fetch진행(json형식으로 받기) >> json변환

@src/controllers/userController.js

```js
const baseUrl = "https://github.com/login/oauth/access_token";
const config = {
  client_id: process.env.GH_CLIENT,
  client_secret: process.env.GH_SECRIT,
  code: req.query.code,
};
const params = new URLSearchParams(config).toString();
const finalUrl = `${baseUrl}?${params}`;
const tokenRequest = await (
  await fetch(finalUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
    },
  })
).json();

console.log(tokenRequest);
```

```sh
{
  access_token: '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',
  token_type: 'bearer',
  scope: 'read:user,user:email'
}
```

하지만 fetch는 정의되어 있지않다며 오류가 발생한다. fetch는 브라우져에서만 실행이 가능하며 nodeJS에서는 실행이 안된다.
다음강의에 해당 오류를 수정해본다.

### 7.19 Github Login part Four

nodeJS에서 실행이 가능한 node-fetch를 설치해준다.
node-fetch 3버젼 이상은 실행시 [ERR_REQUIRE_ESM]에러가 발생한다.
하위버젼을 설치한다.

<https://nomadcoders.co/wetube/lectures/2710>

```sh
$ npm install node-fetch@2.6.1
```

<https://www.npmjs.com/package/node-fetch>

설치 후 import해준다.

@src/controllers/userController.js

```js
import fetch from "node-fetch";
```

fetch를 진행하여 데이터를 가져올 수 있다.

이제 OAuth어플의 3단계를 진행한다. 토큰을 github로그인에 보내줘야한다.

<https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps#3-use-the-access-token-to-access-the-api>

```js
if ("access_token" in tokenRequest) {
  const { access_token } = tokenRequest;
  const userRequest = await (
    await fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
  ).json();
  console.log(userRequest);
  // 다음 강의에 더 추가
} else {
  return res.redirect("login");
}
```

```sh
{
  login: 'byeon2261',
  id: 114720002,
  node_id: 'U_kgDOBtZ9Ag',
  avatar_url: 'https://avatars.githubusercontent.com/u/114720002?v=4',
  gravatar_id: '',
  url: 'https://api.github.com/users/byeon2261',
  html_url: 'https://github.com/byeon2261',
  followers_url: 'https://api.github.com/users/byeon2261/followers',
  following_url: 'https://api.github.com/users/byeon2261/following{/other_user}',
  gists_url: 'https://api.github.com/users/byeon2261/gists{/gist_id}',
  starred_url: 'https://api.github.com/users/byeon2261/starred{/owner}{/repo}',
  subscriptions_url: 'https://api.github.com/users/byeon2261/subscriptions',
  organizations_url: 'https://api.github.com/users/byeon2261/orgs',
  repos_url: 'https://api.github.com/users/byeon2261/repos',
  events_url: 'https://api.github.com/users/byeon2261/events{/privacy}',
  received_events_url: 'https://api.github.com/users/byeon2261/received_events',
  type: 'User',
  site_admin: false,
  name: 'G.H. Byeon',
  company: null,
  blog: '',
  location: null,
  email: 'ghbyeon2261@gmail.com',
  hireable: null,
  bio: null,
  twitter_username: null,
  public_repos: 14,
  public_gists: 0,
  followers: 0,
  following: 0,
  created_at: '2022-09-30T04:57:01Z',
  updated_at: '2023-09-08T04:32:17Z',
  private_gists: 0,
  total_private_repos: 0,
  owned_private_repos: 0,
  disk_usage: 59102,
  collaborators: 0,
  two_factor_authentication: false,
  plan: {
    name: 'free',
    space: 976562499,
    collaborators: 0,
    private_repos: 10000
  }
}
```

데이터에 email은 github에 email설정을 private로 한다면 가져오지 못한다.
해당부분을 대채하도록 다음강의에 수정한다.

### 7.20 Github Login part Five

유저의 이메일 데이터도 가져오도록 적용하겠다.

@src/controllers/userController.js

기존 user데이터를 가져오는 로직을 email을 추가해주면된다.

```js
...
const emailRequest = await (
  await fetch(`${apiUrl}/user/emails`, {
  ...
  })
)
console.log(emailRequest);
```

```sh
>>>: [
  {
    email: 'ghbyeon2261@gmail.com',
    primary: true,
    verified: true,
    visibility: 'public'
  },
  {
    email: '114720002+byeon2261@users.noreply.github.com',
    primary: false,
    verified: true,
    visibility: null
  }
]
```

이제 primary && verified === true인 데이터만 뽑아보도록 하겠다. (해당 로직은 브라우져 콘솔에서 미리 실행해보는 것이 좋다.)

@브라우져 쉘

```sh
>>> const email = [
  {
    email: 'ghbyeon2261@gmail.com',
    primary: true,
    verified: true,
    visibility: 'public'
  },
  {
    email: '114720002+byeon2261@users.noreply.github.com',
    primary: false,
    verified: true,
    visibility: null
  }
]
 undefined
>>> email.find( email => email.primary === true && email.verified === true)
 {email: 'ghbyeon2261@gmail.com', primary: true, verified: true, visibility: 'public'}
```

로직에 추가해준다.

```js
const email = emailRequest.find(
  (email) => email.primary === true && email.verified === true
);
console.log(email);
if (!email) {
  return res.redirect("login");
}
```

이메일이 없다면 로그인화면으로 돌려준다. 에러문구는 추후에 추가해주도록 하겠다.
!(타 사이트도 대표이메일이 없다면 대표이메일을 생성 후 로그인해달라고 하는경우가 많다.)

### 7.21 Github Login part Six

github login finish

email 데이터로 User를 찾은 후 로그인하며 User 데이터가 없을 경우 User를 생성합니다.
로그인 로직은 postLogin()의 로직을 가져와서 사용했다.

### 7.22 Log Out

log out contoller 추가

```js
req.session.destroy();
return res.redirect("/");
```

login 데이터가 지워진다.

### 8.1 Protector and Public Middlewares

로그인한 사용자만 접근이 가능하게 하는 미들웨어를 생성한다.

@src/middleware.js

```js
export const protectorMiddleware = (req, res, next) => {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect("/login");
  }
};
```

@src/routes/router.js

```js
userRouter.get("/remove", protectorMiddleware, remove);
userRouter
  .route("/edit-profile")
  .all(protectorMiddleware) // get, post 상관없이 middleware 실행
  .get(getUserProfile)
  .post(uploadAvatar.single("avatar"), postUserProfile);
```

### 8.2 Edit Profile POST part One

user profile update part 1

### 8.3 Edit Profile POST part Two

db업데이트는 완료했지만 프론트엔드에서 업데이트데이터가 반영이 되지 않는다.
loggedinUser 데이터를 프론트에 넣어주고 있지만 loggedinUser데이터는 로그인 할때 user의 데이터이다.

즉, db와 연결되어 있지 않은 상태이다.

업데이트한 데이터를 frontend에 넣어준다.

findByIdAndUpdate()는 update하기전의 데이터를 return해주는 것이 기본 설정이다.

<https://mongoosejs.com/docs/7.x/docs/api/model.html#Model.findByIdAndUpdate()>

{new: true} 를 넣어준다.

! CODECHELLENGE ! # 다른 유저가 사용하는 이메일이나 username으로 변경을 할려면 오류로 알려준다.

-체크리스트-

- username과 email을 session값과 loggedinUser데이터를 비교하여 변경을 진행하는지 체크
  - 값이 다르다면 DB에 session과 같은 값이 있는지 체크 (값이 다른 데이터만 체크)
    - 없다면 다같이 업데이트 진행, 있다면 같은 값이 있다고 오류 알람
  - 값이 같다면 그외의 값만 update진행

여러 데이터를 비교하고 싶다면 params에 push 로직을 사용해보자.

```js
let searchParams = []; // 비교 데이터 집어 넣기
if (email != sessionEmail) {
  searchParams.push({ email });
}
if (username != sessionUsername) {
  searchParams.push({ username });
}
if (searchParams.length > 0) {
  const findUser = await User.findOne({ $or: searchParams });
  // mongoDB에는 != 데이터를 비교하는 쿼리가 없는가 ?
  if (findUser && findUser._id.toString !== _id) {
    ...
    return res.render(...)
  }
```

! Challenge 댓글 참고 및 확인 !

<https://nomadcoders.co/wetube/lectures/2736>

### 8.4 Change Password part One

change password form 생성.
해당 anker는 edit profile에서 소셜 로그인이 아닌 유저만 가능하도록 적용.
껍데기와 change-password get 로직만 완성.

### 8.5 Change Password part Two

패스워드를 변경하며 비밀번호 일치 확인 후 DB에 저장한다.

### 8.6 File Uploads part One

```sh
$ npm i multer
```

<https://www.npmjs.com/package/multer>

- multer설치
- 미들웨어
- 라우터
- 폼
- 컨트롤러

multer은 input의 name값을 가져온다.

### 8.7 File Uploads part Two

- file이 없을 경우 file: {path}에서 에러가 발생한다.
- avator을 업데이트 하지 않을경우 avatorURL을 다시 넣어준다
- avatar 이미지를 보여준다.
  - path를 넣어줄때 root에서부터 찾도록 적용한다.(절대 url)

### 8.8 Static Files and Recap

- upload폴더 site에서 지정해주기

### 8.9 Video Upload

- video업로드 기능 구현
  - 템플릿에 input추가 및 enctype설정
  - 컨트롤러 값 가져와서 저장기능 구현
  - Video 모델에 filePath 추가
  - multer 미들웨어 추가
    - avatar이름 변경, limit속성 추가
- 올려놓은 비디오를 볼 수 있도록 적용

### 8.10 User Profile

### 9.0 Introduction to Webpack

이제부터 front-end를 작업진행한다. 업계 표준인 webpack을 사용한다.
(webpack이 어렵다면 쉬운 대체제인 gulp를 사용할 수 있다. 노마드코더에 Gulp 무료 강의가 있다!)

<https://webpack.js.org/>

일반적인 개발자는 webpack을 사용하는 방법은 webpack이 포함되어 있는 솔루션, 프레임워크를 사용하는 것이다.
(react, vue등 많은 프레임워크에 이미 내설되어있다. 그리고 webpack파일이나 config파일을 노출시키지 않기때문에 일반적으로 설정 및 볼일도 없다.)

하지만 이번 강습에서는 연습용으로 webpack 모듈 번들을 사용해본다.

### 9.1 Webpack Configuration part One

webpack. webpack cli를 설치해준다.

```sh
# package.json의 devDependencies에 넣어주기위해서 '--save-dev'를 사용한다.
# --save-dev대신에 -D를 사용할 수 있다.
$ npm i webpack webpack-cli --save-dev # == -D
```

@webpack.config.js파일에서 webpack설정이 가능하다. webpack은 아주 오래된 js문법만 이해할 수 있다.
(import, export를 이해하지 못한다.)

<https://webpack.js.org/concepts/#entry>

webpack config전에 기본적인 front-end js파일을 생성한다. @src/client/js/main.js
그리고 webpack.config를 작성한다.

```js
module.exports = {
  entry: "./src/client/js/main.js",
  output: {
    path: "./assets/js/", // document와 달리 상대 주소를 사용하였다.
    filename: "main.js",
  },
};
```

package.json에 script를 저장해준다.

```json
"asset": "webpack --config webpack.config.js"
```

해당 스크립트를 실행해주면 절대주소를 사용하라며 에러가 발생한다. 해당 에러는 다음강의에 수정한다.

### 9.2 Webpack Configuration part Two

path를 사용하여 주소를 합쳐준다.

```js
const path = require("path")

  ...
  path: path.resorve(__dirname, "assets/js"),
```

path.resorve대신에 백틱(``)을 사용해서 string을 합쳐도 실행에 문제가 발생하진 않는다.

script를 실행시 @assets/js 폴더와 파일이 생성되며 코드가 합축된 js파일이 생성된다

```js
(async () => {
  alert("Hi! It's work"), await fetch("");
})();
```

rules설정이 필요하다. 각 파일의 타입에 따라 어떻게 변환을 할지 설정한다.

<https://webpack.js.org/guides/asset-management/#loading-css>

js를 babel loader로 변환 설정을 한다. 설정전에 babel loader를 설치해준다.

```js
$ npm i babel-loader
```

<https://www.npmjs.com/package/babel-loader>

설정값을 지정해준 다음 기존 assets폴더를 삭제 후 다시 script를 실행해준다.

속성에 mode를 넣어주라고 계속 경고를 넣어준다.

```sh
WARNING in configuration
Set 'mode' option to 'development' or 'production'
```

mode옵션에 development를 넣어주면 asset파일에 개발자가 보기쉽게 파일 변환을 시켜준다.
(production 일 경우에는 압축변환한다.)

### 9.3 Webpack Configuration part Three

이제 브라우져에서 asset파일에 접근할 수 있도록 설정을 한다. upload폴더와 같이 server에서 접근폴더를 알려줘야한다.

@src/server.js

```js
app.use("/assets", express.static("assets"));
```

브라우져에서 assets폴더안의 파일에 접근이 가능해진다.
한번더 말하자면 front-end는 assets폴더에 접근을 하며 개발자 작업은 @src/client에서 이뤄진다.

템플릿에서 해당 js파일을 실행시켜본다.

@src/views/base.pug

```pug
  # alert가 발생한다.
  script(src="/assets/js/main.js")
```

### 9.4 SCSS Loader

이제 css를 처리해본다. 이번에 사용할 확장자는 scss를 사용한다. scss를 사용하기 위해서는 아래 loader가 필요하다.

- style loader
- css loader
- scss loader

<https://webpack.js.org/loaders/style-loader/>
<https://webpack.js.org/loaders/css-loader/>
<https://www.npmjs.com/package/sass-loader>

loader 적용 순서는 아래와 같다.

1. loader install
2. 파일 생성
3. webpack config

scss loader를 설치할때 꼭 scss 같이 설치해준다.

```sh
$ npm install sass-loader sass webpack --save-dev

$ npm install --save-dev css-loader

$ npm install --save-dev style-loader
```

scss는 css값을 변수에 저장하여 사용이 가능하다.

@src/client/scss/\_variables.scss

```scss
$tomato: tomato;
```

@src/client/scss/styles.scss

```scss
@import "./variables";

body {
  background-color: $tomato;
  color: wheat;
}
```

@src/client/js/main.js

```js
import "../scss/styles.scss";
```

webpack.config에 loader를 추가해준다. (module.rules안에).
loader를 순서를 지켜서 적용해줘야한다.
sass-loader이다. scss가 아니다.

```js
  // webpack.config는 역순으로 코드를 읽어들인다.
  // 그러므로 가정먼저 실행될 scss-loader를 맨뒤에 적어준다. (순서를 지켜줘야한다!!)
  {
    test: /\.scss$/,
    use: ["style-loader", "css-loader", "sass-loader"],
  },
```

적용이 다 되었다면 script를 실행해보자. 에러없이 실행되어야한다.
asset파일도 변경되었으며 브라우져 화면도 변경된다.

### 9.5 MiniCssExtractPlugin

style-loader대신에 mini-css-extract-plugin 을 사용하여 css파일을 생성한다.
이 플러그인은 CSS를 별도의 파일로 추출합니다

<https://webpack.js.org/plugins/mini-css-extract-plugin/>

### 11.0 Player Setup

기본 video player 대신에 커스텀한 video player를 만들도록 하겠다.
플레이어 셋팅을 시작한다.

webpack.config.js 파일에 module.exports.entry에 기존에 있는 루트는 main이라 하고 videoPlayer를 추가한다.

```js
module.exports = {
  entry: {
    main: "./src/client/js/main.js",
    videoPlayer: "./src/client/js/videoPlayer.js",
  },
  output: {
    path: path.resolve(__dirname, "assets", "js"),
    filename: "[name].js", // [name]: entry의 key부분이 파일이름으로 들어간다.
  },
```

assets script를 실행해줘야한다.

main script와 videoPlayer script가 실행되는 위치를 나누기로 한다.
기존 script부분을 'block script'로 변경 후 각 페이지마다 불러올 script를 block에 넣어준다.

### 11.1 Play Pause

템플릿에 video play관련된 button및 input을 생성한다.

@src/views/watch.js

```pug
div
    button#play play  # '#play': play는 id이다.
    button#mute mute
    span#time 00:00/00:00
    input(type="range", step="0.1", min="0", max="1")#volumn
```

스크립트에 플레이 컨트롤을 추가해준다.
@src/client/js/videoPlayer.js

### 11.2 Mute and Unmute

음소거 기능을 넣어준다.

<https://developer.mozilla.org/ko/docs/Web/API/HTMLMediaElement>

- 버튼 클릭시
  - mute 기능 구현
  - mute버튼 text 변경
  - input range 변경 (0, 0.5) (비디오 플레이어에는 적용안됨)

### 11.3 Volume

volume 변경 기능을 넣어준다.

<https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range>

- input range를 변경하면 video의 volume이 변경
- mute상태에서 input range값을 변경하면 unmute상태로 변경
- mute후 unmute버튼을 클릭하면 mute전 볼륨으로 변경

### 11.4 Duration and Current Time

loadedmetadata
timeupdate

브라우져를 새로 고침시 loadedmatadate이벤트가 발생하지 않는 오류가 있다.

<https://stackoverflow.com/questions/33316493/why-does-loadedmetadata-not-consistently-fire>

@src/client/js/videoPlayer.js

```js
video.readyState
  ? handleMetadata()
  : video.addEventListener("loadedmetadata", handleMetadata);
```

### 11.5 Time Formatting

- Date Format

### 11.6 Timeline

- Time line (input range)
  - 최대값 설정
  - current time에 맞춰 value변경
  - input 값 변경에 따라 video current time 변경

### 11.7 Fullscreen

element.requestFullScreen

- 버튼 클릭시
  - fullscreen
  - 버튼 innerText = Exit Fullscreen
- full screen시
  - 버튼 클릭하면 exit fullscreen
  - 버튼 text 변경

풀스크린시 컨트롤러도 같이 풀스크린에 포함되길 원함. video와 컨트롤러를 div에 넣는다

document.fullscreenElement() >>>: null을 반환할 경우 fullsreen상황이 아님

<https://developer.mozilla.org/en-US/docs/Web/API/Document/fullscreenElement>

### 11.8 Controls Events part One

마우스가 비디오 화면으로 옮기면 컨트롤러가 보이도록 구현한다.

마우스가 비디오화면에 이동될때 클래스명을 넣어주고 클래스명이 있을때 컨트롤러가 보이도록 한다.
클래스명은 마우스가 비디오에서 멀어져도 3초 뒤에 사라지도록 적용한다.

timeout을 사용하여 기능구현을 한다.
3초안에 다시 비디오에 들어가도 timeout동안 인식이 되지않아 시간이 지나면 클래스명이 사라진다.
setTimeout()에서 임의의 id를 리턴한다. 해당 id를 받아 clearTimeout(id)를 사용하여 setTimeout 상태에서 빠져 나온다.

<https://developer.mozilla.org/ko/docs/Web/API/clearTimeout>

다음강의에 비디오에 마우스가 있어도 움직임이 없으면 컨트롤러를 숨기는 기능을 구현한다.

### 11.9 Controls Events part Two

마우스 움직임이 멈추는것을 인지하도록 한다.

```js
  if (timeoutId) {
    clearTimeout(timeoutId);
    timeoutId = null;
  }
  ...
  timeoutId = setTimeout(() => {
    videoControllers.classList.remove("showing");
  }, 3000);
```

움직임이 인식되는 동안 timeout을 clear한다.
움직임이 멈추면 마지막에 이뤄진 setTimeout()이 실행되면서 class명이 빠진다.

### 13.0 Recorder Setup

Html 요소를 이용하여 녹화, 녹음 기능을 구현할 수 있다. MediaDevices: getUserMedia() method

<https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia>

async, await를 사용할 때 regenerator-runtime를 인식할 수 없다며 오류가 발생한다.

<https://www.npmjs.com/package/regenerator-runtime>

regenerator-runtime를 설치하여 import해준다.

```sh
$ npm i regenerator-runtime
```

@src/cient/js/main.js 에 import 를 해주며 base.pug에 script를 넣어준다.

# ! Uncaught (in promise) DOMException: Permission denied 오류발생

테스트를 브레이브 브라우저를 사용하고 있었는데 브레이브 브라우저는 권한요청을 중간에서 차단하면서 권한을 가져오지 못했다.

테스트를 크롬에선 진행함

---

녹화, 녹음이 가능하다.

### 13.1 Video Preview

녹화되는 데이터를 미리보기 기능을 구현한다.

```pug
  video#preview
```

```js
preview.srcObject = media;
preview.play();
```

### 13.2 Recording Video

받아오는 stream 데이터를 녹화하는 기능을 구현한다.
media recording

<https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder>

removeEventListener()를 사용하여 기능을 삭제 할 수 있다.

```js
const handleStopClick = () => {
  startBtn.innerText = "Start Recording!";
  startBtn.removeEventListener("click", handleStopClick);
  startBtn.addEventListener("click", handleStartClick);
};

const handleStartClick = () => {
  startBtn.innerText = "Stop Recording!";
  startBtn.removeEventListener("click", handleStartClick);
  startBtn.addEventListener("click", handleStopClick);

  const mediaRecorder = new MediaRecorder(stream);
};
```

### 13.3 Recording Video part Two

Stop recording 버튼을 클릭했을때 녹화가 중지되도록 수정하겠다.

이제 stream data를 저장하도록 하겠다.

<https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static>

createObjectUrl은 파일이 브라우저 메모리에 생성되는 url을 준다. 해당 url이 파일을 가리키고 있다.

```js
recorder.ondataavailable = (event) => {
  const video = URL.createObjectURL(event.data);
  console.log(video);
};
```

```sh
>>>: blob:http://localhost:4000/35a36d7a-75fe-4733-8f4c-85a4dd43d0e0
```

blob url을 따라가면 서버상에는 없는 것을 볼 수 있다. (Cannot GET /35a36d7a-75fe-4733-8f4c-85a4dd43d0e0)

해당 파일을 video src property에 넣어준다.

```js
preview.srcObject = null;
preview.src = videoFile;
preview.loop = true;
preview.play();
```

저장된 데이터가 실행되는 것을 볼 수 있다.

### 13.4 Downloading the File

브라우저에 띄워져있는 동영상을 '우클릭 - 동영상 다른이름으로 저장' 으로 저장이 가능하다.
해당 기능을 버튼에 넣어서 다운로드 가능하도록 구현한다.

<https://developer.mozilla.org/ko/docs/Web/API/Document/createElement>

@src/client/js/recorder.js

```js
const handleDownloadClick = () => {
  const a = document.createElement("a");
  a.href = videoFile;
  a.download = "MyRecording.webm"; // mac에서는 webm확장자가 실행이 된다.
  document.body.appendChild(a);
  a.click();
};
```

## 14 WebAssembly Video Transcode

### 14.0 Introduction

브라우져에서 비디오 변환 기능을 구현한다. 일반적으로 유튜브사이트는 비싼비용의 서버를 둬서 영상변환을 진행한다.
대신에 우리는 본인 컴퓨터에서 영상변환 기능을 사용한다.
영상변환에는 FFmpeg 와 웹어셈블리를 사용한다. FFmpeg(영상변환) 프로그램을 웹어셈블리를 이용하여 브라우져에서 실행한다.

<https://ffmpeg.org/documentation.html>

```sh
$ npm i @ffmpeg/ffmpeg @ffmpeg/core
```

## 15 Flash Messages

### 15.0 Installation

에러나 상태 메세지를 사용자에게 전달하는 목적으로 Flash Message를 사용해보자.

<https://www.npmjs.com/package/express-flash>

```sh
$ npm i express-flash
```

@src/middleware.js

```js
import flash from "express-flash";
app.use(flash());
```

@.../...Controller.js

```js
req.flash("info", "Hello!");
return res.redirect("/");
```

messages에 담겨서 탬플릿에 전달된다.
@src/views/--.pug

```pug
if messages.info
  span=messages.info // >>>: Hello!
```

### 15.1 Sending Messages

mixins을 사용하여 메세지를 표기하며 scss를 사용하여 메세지가 발생, 소멸을 구현한다.

- mixins/message 생성
- base.pug에 해당 mixins include
- scss에 메세지 에니메이션 추가. @src/client/scss/styles.scss 참조

## 16 Comment Section

### 16.1 Comment Models

졸업 과제를 위한 마지막 프로젝트를 진행하도록 한다. 동영상에 댓글을 다는 기능을 구현한다. 백엔드

- 모델 생성
  - text
  - owner
  - video
  - createdAt
- video 모델에 comments 추가

### 16.2 Comment Box

프론트엔드쪽 작업을 진행하자.

- 템블릿에 댓글 추가하는 div생성 @.../watch.pug
- commentSection.js 파일 생성 (@src/client/js/)
- webpack에 추가

데이터를 가져오는 것까지 확인

### 16.3 API Route part One

로그인을 하지 않았을때 엘리먼트를 찾지 못하는 에러 수정과 데이터를 post하는 기능을 구현한다.

댓글다는 form을 로그인시 표시되도록 적용했었다.

@src/views/watch.pug

```pug
if loggedIn
  div.video__comments
    form.video__comment-form#commentForm
      textarea(cols="30", rows="10" plaseholder="Write a comment...")
      button Submit comment
```

로그인을 안했을때 문서상에 textarea엘리먼트가 존재하지 않기때문에 front-end에서 해당 엘리먼트를 불러올때 에러가 발생한다.
해당 부분을 로그인했을 때 가져오는 것으로 수정한다.

@src/client/js/commentSection.js

```js
const form = document.getElementById("commentForm");

const handleSubmit = (event) => {
  ...
  const textarea = form.querySelector("textarea");
  ...
};

if (form) {
  form.addEventListener("submit", handleSubmit);
}
```

<!-- ### 16.4 API Route part Two

컨트롤러에서 req.body를 받아 출력을 하여도 값이 제대로 나오지 않는다.

```js
const obj = {text:"blabla"}
obj.toString() // 값을 넣을 때 string값으로 들어간다.
>>>: '[object Object]'
```

front-end에서 Object형식으로 넣지 않고 value를 바로 넣어주면 인식이 된다.

```js
body: text; // <<< body: {text}
```

데이터가 아직 제대로 나오지 않는다. 강의를 뛰어넘은게 있는데 데이터를 태그 id에 넣어서 관리하는거 같다.
해당부분을 수정 후 진행한다. -->

<!-- ## 99 [Youtube_Challenge] Graduation Assignment!

유튜브 솔루션을 만들어 Heroku에 배포한 후 해당 링크를 제출하세요

- 사용자 인증(로그인 / 계정 만들기)
- 프로필 편집 / 암호 변경
- 동영상 업로드
- 동영상 검색
- 동영상 편집
- 동영상 보기
- Javascript 비디오 플레이어
- 댓글 섹션 + 코드 챌린지(Watch: #16)) -->
