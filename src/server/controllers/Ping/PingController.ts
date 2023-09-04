import { type NextFunction, type Request, type Response } from "express";

const pingController = (_req: Request, res: Response, _next: NextFunction) => {
  res.status(200).json({ message: "Pong 🏓" });
};

export default pingController;
