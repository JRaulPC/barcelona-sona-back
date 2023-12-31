import debugCreator from "debug";
import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import Spot from "../../../database/models/Spot.js";
import { type SpotStructure } from "../../../types.js";
import {
  type AuthRequest,
  type AuthRequestWithSpot,
  type AuthRequestWithSpotToggle,
} from "../../types.js";

const debug = debugCreator("spots:server:controller:spots");

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

export const deleteSpotByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { spotId } = req.params;

  try {
    await Spot.findByIdAndDelete({ _id: spotId }).exec();

    res
      .status(200)
      .json({ message: `Spot with the id ${spotId} has been deleted` });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Spot could not be deleted",
      409,
      (error as Error).message,
    );

    next(customError);
  }
};

export const createSpotController = async (
  req: AuthRequestWithSpot,
  res: Response,
  next: NextFunction,
) => {
  try {
    const spot = req.body;

    const userId = req.authId;

    const newSpot = await Spot.create({ ...spot, user: userId });

    res.status(201).json({ spot: newSpot });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Spot can't be created",
      500,
      (error as Error).message,
    );
    next(customError);
  }
};

export const getSpotByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { spotId } = req.params;

  try {
    const spot = await Spot.findById({ _id: spotId }).exec();

    if (!spot) {
      const newError = new CustomError(
        "Error, can't find spot!",
        404,
        "Error, can't find spot!",
      );
      next(newError);
      debug(`Error, can't get Spot with id ${spotId}`);
      return;
    }

    res.status(200).json({ spot });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Error, can't get Spot",
      500,
      (error as Error).message,
    );
    next(customError);
  }
};

export const toogleIsVisitedByIdController = async (
  req: AuthRequestWithSpotToggle,
  res: Response,
  next: NextFunction,
) => {
  const isVisited = req.body === "true";
  const { spotId } = req.params;

  try {
    const updatedSpot = await Spot.findByIdAndUpdate(
      spotId,
      {
        isVisited: !isVisited,
      },
      {
        returnDocument: "after",
      },
    ).exec();

    if (!updatedSpot) {
      const newError = new CustomError(
        "Error, can't find spot!",
        404,
        "Error, can't find spot!",
      );
      next(newError);
      debug(`Error, can't update spot with id`);
      return;
    }

    res.status(200).json({ spot: updatedSpot });
  } catch (error: unknown) {
    const customError = new CustomError(
      "Spot, can't be updated",
      409,
      (error as Error).message,
    );
    next(customError);
  }
};
