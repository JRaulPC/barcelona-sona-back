import express from "express";
import { getSpotsController } from "../controllers/spotsControllers/spotsControllers.js";
import paths from "../../paths/paths.js";

export const spotsRoutes = express.Router();

spotsRoutes.get(paths.slash, getSpotsController);

export default spotsRoutes;
