import express from "express";
import { getSpotsController } from "../controllers/spotsControllers/spotsControllers.js";
import paths from "../../paths/paths.js";
import auth from "../middlewares/auth.js";

export const spotsRouter = express.Router();

spotsRouter.get(paths.slash, auth, getSpotsController);

export default spotsRouter;
