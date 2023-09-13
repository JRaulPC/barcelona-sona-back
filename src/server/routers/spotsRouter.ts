import express from "express";
import {
  deleteSpotByIdController,
  getSpotsController,
} from "../controllers/spotsControllers/spotsControllers.js";
import paths from "../../paths/paths.js";

export const spotsRouter = express.Router();

spotsRouter.get(paths.root, getSpotsController);
spotsRouter.delete(`${paths.root}:spotId`, deleteSpotByIdController);

export default spotsRouter;
