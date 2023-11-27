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
  getChangePassword,
  postChangePassword,
} from "../controllers/userController";
import {
  protectorMiddleware,
  publicOnlyMiddleware,
  uploadAvatar,
} from "../middleware";

const userRouter = express.Router();

userRouter.get("/edit", protectorMiddleware, edit);
userRouter.get("/logout", protectorMiddleware, logout);
userRouter.get("/remove", protectorMiddleware, remove);
userRouter
  .route("/edit-profile")
  .all(protectorMiddleware)
  .get(getUserProfile)
  .post(uploadAvatar.single("avatar"), postUserProfile);
userRouter
  .route("/change-password")
  .all(protectorMiddleware)
  .get(getChangePassword)
  .post(postChangePassword);
userRouter.get("/:id", see);
userRouter.get("/github/start", publicOnlyMiddleware, StartGithubLogin);
userRouter.get("/github/finish", publicOnlyMiddleware, FinishGithubLogin);

export default userRouter;
