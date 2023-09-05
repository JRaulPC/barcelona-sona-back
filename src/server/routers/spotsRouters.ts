import express from "express";
import { getSpotsController } from "../controllers/spotsControllers/spotsControllers.js";

export const spotsRoutes = express.Router();

spotsRoutes.get("/", getSpotsController);

export default spotsRoutes;
