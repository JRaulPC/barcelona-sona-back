import { type NextFunction, type Response } from "express";
import admin from "firebase-admin";
import { type AuthRequest } from "./types";
import CustomError from "../../CustomError/CustomError.js";
import firebaseApp from "../../firebase.js";
import User from "../../database/models/User.js";
import { type UserStructure } from "../../types";

const auth = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      const error = new CustomError("Token not provided", 401, "Unauthorized");
      next(error);
      return;
    }

    const userData = await admin.auth(firebaseApp).verifyIdToken(token);
    const { uid } = userData;

    const user = await User.findOne<UserStructure>({ uid }).exec();

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