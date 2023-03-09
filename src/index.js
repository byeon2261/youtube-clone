import express from "express";
import gimochi from "morgan";

const PORT = 4000;

const app = express();
const logger = gimochi("dev");
app.use(logger);

const globalRouter = express.Router();

const handleHome = (req, res) => res.send("Home.");

globalRouter.get("/", handleHome);

const userRouter = express.Router();

const handleEditUser = (req, res) => res.send("Edit User");

userRouter.get("/edit", handleEditUser);

const videoRouter = express.Router();

const handleWatchVideo = (req, res) => res.send("Watch Video");

videoRouter.get("/watch", handleWatchVideo);

app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/videos", videoRouter);

const AppListening = () => {
  console.log(`✅ listening server on http://localhost:${PORT} 🚀`);
};

app.listen(PORT, AppListening());
