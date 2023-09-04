import { type NextFunction, type Request, type Response } from "express";
import Spot from "../../../database/models/Spot";
import CustomError from "../../../CustomError/CustomError";

export const getSpotsController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const requestLimit = 10;

  try {
    const spots = await Spot.find().limit(requestLimit).exec();

    res.status(200).json({ spots });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Internal server error",
      500,
      (error as Error).message,
    );

    next(customError);
  }
};
