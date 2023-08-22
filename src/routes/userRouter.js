import express from "express";
import {
  edit,
  logout,
  remove,
  see,
  getUserProfile,
  postUserProfile,
} from "../controllers/userController";
import { uploadFiles } from "../middleware";

const userRouter = express.Router();

userRouter.get("/edit", edit);
userRouter.get("/logout", logout);
userRouter.get("/remove", remove);
userRouter
  .route("/edit-profile")
  .get(getUserProfile)
  .post(uploadFiles.single("avatar"), postUserProfile);
userRouter.get("/:id", see);

export default userRouter;
