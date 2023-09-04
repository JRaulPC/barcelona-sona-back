import { type NextFunction, type Response } from "express";
import admin from "firebase-admin";
import { type AuthRequest } from "./types";
import CustomError from "../../CustomError/CustomError.js";
import firebaseApp from "../../firebase.js";

const auth = async (req: AuthRequest, _res: Response, next: NextFunction) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      const error = new CustomError("Unauthorized", 401, "Token not provided");
      next(error);
      return;
    }

    const userData = await admin.auth(firebaseApp).verifyIdToken(token);

    req.authId = userData.uid;

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
