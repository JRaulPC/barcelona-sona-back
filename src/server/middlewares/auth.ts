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
      const error = new CustomError("Unauthorized", 401, "Token not provided");
      next(error);
      return;
    }

    const userData = await admin.auth(firebaseApp).verifyIdToken(token);
    const { uid } = userData;

    const user = await User.findOne<UserStructure>({ uid }).exec();

    if (!user) {
      const userNotFoundError = new CustomError(
        "User not found",
        404,
        "User  with the provided id not found",
      );
      next(userNotFoundError);
      return;
    }

    req.authId = user._id;

    next();
  } catch (error: unknown) {
    const customError = new CustomError(
      "Invalid token",
      401,
      (error as Error).message,
    );

    next(customError);
  }
};

export default auth;
