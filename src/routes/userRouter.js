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
import { uploadAvatar } from "../middleware";

const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/logout", logout);
userRouter.get("/remove", remove);
userRouter
  .route("/edit-profile")
  .get(getUserProfile)
  .post(uploadAvatar.single("avatar"), postUserProfile);
userRouter.get("/:id", see);
userRouter.get("/github/start", StartGithubLogin);
userRouter.get("/github/finish", FinishGithubLogin);

export default userRouter;
