import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../CustomError/CustomError.js";

export const endpointNotFound = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const endpointNotFound = new CustomError(
    "Endpoint not found",
    404,
    "Endpoint not found",
  );

  next(endpointNotFound);
};

export const generalErrorHandler = (
  error: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const errorMessage = error.publicMessage ?? "Internal server error";
  const errorStatusCode = error.statusCode ?? 500;

  res.status(errorStatusCode).json({ error: errorMessage });
};
