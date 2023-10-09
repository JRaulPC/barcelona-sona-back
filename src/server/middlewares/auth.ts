import { type NextFunction, type Response } from "express";
import admin from "firebase-admin";
import CustomError from "../../CustomError/CustomError.js";
import User from "../../database/models/User.js";
import firebaseApp from "../../firebase.js";
import { type AuthRequestWithSpot } from "../types.js";

const auth = async (
  req: AuthRequestWithSpot,
  _res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      const error = new CustomError("Token not provided", 401, "Unauthorized");
      next(error);
      return;
    }

    const { uid } = await admin.auth(firebaseApp).verifyIdToken(token);

    const user = await User.findOne({ uid }).exec();

    if (!user) {
      const userNotFoundError = new CustomError(
        "User with the provided id not found",
        404,
        "User not found",
      );
      next(userNotFoundError);
      return;
    }

    req.authId = user._id;

    next();
  } catch (error: unknown) {
    const customError = new CustomError(
      (error as Error).message,
      401,
      "Invalid token",
    );

    next(customError);
  }
};

export default auth;
