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
import { protectorMiddleware, uploadVideo } from "../middleware";

const videoRouter = express.Router();

videoRouter.get("/:id([0-9a-f]{24})", watch);
videoRouter
  .route("/:id([0-9a-f]{24})/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(postEdit);
videoRouter
  .get("/:id([0-9a-f]{24})/delete", deleteVideo)
  .all(protectorMiddleware);
videoRouter
  .route("/upload")
  .all(protectorMiddleware)
  .get(getUpload)
  .post(uploadVideo.single("video"), postUpload);
videoRouter.post("/:id([0-9a-f]{24})/comment", postComment);

export default videoRouter;
