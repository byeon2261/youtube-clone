import "./db";
import "./models/Video.js";
import express from "express";
import gimochi from "morgan";
import path from "path";
import globalRouter from "./routes/globalRouter";
import userRouter from "./routes/userRouter";
import videoRouter from "./routes/videoRouter";

const PORT = 4000;

// console.log(process.cwd());

const app = express();
const logger = gimochi("dev");
app.use(logger);

app.set("view engine", "pug");
app.set("views", process.cwd() + "/src/views");
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const AppListening = () => {
  console.log(`✅ listening server on http://localhost:${PORT} 🚀`);
};

app.listen(PORT, AppListening());
