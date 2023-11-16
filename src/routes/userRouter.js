import express from "express";
import {
  edit,
  logout,
  remove,
  see,
  getUserProfile,
  postUserProfile,
  StartGithubLogin,
  FinishGithubLogin,
} from "../controllers/userController";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  uploadAvatar,
} from "../middleware";

const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/remove", remove);
userRouter
  .route("/edit-profile")
  .all(protectorMiddleware)
  .get(getUserProfile)
  .post(uploadAvatar.single("avatar"), postUserProfile);
userRouter.get("/:id", see);
userRouter.get("/github/start", publicOnlyMiddleware, StartGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, FinishGithubLogin);

export default userRouter;
