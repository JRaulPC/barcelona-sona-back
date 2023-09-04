import { type NextFunction, type Request, type Response } from "express";
import type CustomError from "../../CustomError/CustomError.js";

export const generalErrorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const errorMessage = error.message || "Internal server error";
  const errorStatusCode = error.statusCode ?? 500;

  res.status(errorStatusCode).json({ error: errorMessage });
};
