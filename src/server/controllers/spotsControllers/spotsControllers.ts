import { type NextFunction, type Request, type Response } from "express";
import Spot from "../../../database/models/Spot";

export const getSpotsController = async (
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const requestLimit = 10;

  const spots = await Spot.find().limit(requestLimit).exec();

  res.status(200).json({ spots });
};
