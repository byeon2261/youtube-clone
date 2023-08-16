import express from "express";
import gimochi from "morgan";
import session from "express-session";
import rootRouter from "./routes/rootRouter";
import userRouter from "./routes/userRouter";
import videoRouter from "./routes/videoRouter";
import { localsMiddleware } from "./middleware";

// console.log(process.cwd());

const app = express();
const logger = gimochi("dev");
app.use(logger);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "hello!!!",
    resave: true,
    saveUninitialized: true,
  })
);

app.use((req, res, next) => {
  console.log(req.headers);
  next();
});

app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

export default app;
