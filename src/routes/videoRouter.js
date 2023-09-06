import express from "express";
import {
  getEdit,
  postEdit,
  watch,
  getUpload,
  postUpload,
  deleteVideo,
  postComment,
} from "../controllers/videoController";
import { uploadVideo } from "../middleware";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter.route("/:id([0-9a-f]{24})/edit").get(getEdit).post(postEdit);
videoRouter.route("/:id([0-9a-f]{24})/delete", deleteVideo);
videoRouter
  .route("/upload")
  .get(getUpload)
  .post(uploadVideo.single("video"), postUpload);
videoRouter.post("/:id([0-9a-f]{24})/comment", postComment);

export default videoRouter;
