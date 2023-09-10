import { type NextFunction, type Response } from "express";
import Spot from "../../../database/models/Spot.js";
import CustomError from "../../../CustomError/CustomError.js";
import { type AuthRequest } from "../../middlewares/types.js";
import { type SpotStructure } from "../../../types.js";

export const getSpotsController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const requestLimit = 10;
    const _id = req.authId;

    const spots = await Spot.find<SpotStructure[]>({ user: _id })
      .limit(requestLimit)
      .exec();

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
