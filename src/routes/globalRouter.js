import express from "express";
import { join, login } from "../controllers/userController";
import { tranding } from "../controllers/videoController";

const globalRouter = express.Router();

globalRouter.get("/", tranding);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
