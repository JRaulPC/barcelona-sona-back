import express from "express";
import {
  createSpotController,
  deleteSpotByIdController,
  getSpotByIdController,
  getSpotsController,
  toogleIsVisitedByIdController,
} from "../controllers/spotsControllers/spotsControllers.js";
import paths from "../../paths/paths.js";

export const spotsRouter = express.Router();

spotsRouter.get(paths.root, getSpotsController);
spotsRouter.get(`${paths.root}:spotId`, getSpotByIdController);
spotsRouter.post(`${paths.root}`, createSpotController);
spotsRouter.delete(`${paths.root}:spotId`, deleteSpotByIdController);

spotsRouter.patch(`${paths.root}:spotId`, toogleIsVisitedByIdController);

export default spotsRouter;
