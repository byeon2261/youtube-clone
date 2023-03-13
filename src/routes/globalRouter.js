import express from "express";
import { join } from "../controllers/userController";
import { tranding } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", tranding);
globalRouter.get("/join", join);

export default globalRouter;
