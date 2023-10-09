import { type NextFunction, type Response } from "express";
import CustomError from "../../../CustomError/CustomError.js";
import User from "../../../database/models/User.js";
import { type RegisterRequest } from "../../types.js";
import bcryptjs from "bcryptjs";
import debugCreator from "debug";

const debug = debugCreator("spots:server:controller:user");

export const registerUserController = async (
  req: RegisterRequest,
  res: Response,
  next: NextFunction,
) => {
  const { name, email, password, uid } = req.body;
  const salt = await bcryptjs.genSalt();

  const hashedPassword = await bcryptjs.hash(password!, salt);

  try {
    let newUser = await User.findOne({ email });
    if (newUser) {
      const error = new CustomError(
        "Email already registered",
        400,
        "Email already registered",
      );
      next(error);
      debug(`Email already registered`);
      return;
    }

    newUser = new User({
      name,
      password: hashedPassword,
      email,
      uid,
    });

    await newUser.save();

    res.json({ newUser });
  } catch (error: unknown) {
    const customError = new CustomError(
      "User can't be created",
      409,
      (error as Error).message,
    );
    next(customError);
  }
};
