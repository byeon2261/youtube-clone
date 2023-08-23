import express from "express";
import {
  getEdit,
  postEdit,
  watch,
  getUpload,
  postUpload,
  deleteVideo,
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

export default videoRouter;
