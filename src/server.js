import express from "express";
import gimochi from "morgan";
import session from "express-session";
import flash from "express-flash";
import rootRouter from "./routes/rootRouter";
import userRouter from "./routes/userRouter";
import videoRouter from "./routes/videoRouter";
import apiRouter from "./routes/apiRouter";
import MongoStorage from "connect-mongo";
import { localsMiddleware } from "./middleware";

// console.log(process.cwd());

const app = express();
const logger = gimochi("dev");
app.use(logger);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStorage.create({
      mongoUrl: process.env.DB_URL,
    }),
  })
);

app.use((req, res, next) => {
  // console.log(req.headers);
  // console.log("user >>>:", req.session.user);
  next();
});

app.use(flash());
app.use(localsMiddleware);
app.use("/", rootRouter);
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("assets"));
app.use("/users", userRouter);
app.use("/videos", videoRouter);
app.use("/api", apiRouter);

export default app;
