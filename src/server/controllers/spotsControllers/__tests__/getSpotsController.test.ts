import { type NextFunction, type Request, type Response } from "express";
import { getSpotsController } from "../spotsControllers";
import Spot from "../../../../database/models/Spot";
import { spotsMock } from "../../../../mocks/spotsMock";
import CustomError from "../../../../CustomError/CustomError";

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a getSpotsController controller", () => {
  describe("When it receives a request", () => {
    Spot.find = jest.fn().mockReturnValue({
      limit: jest.fn().mockReturnThis(),
      exec: jest.fn().mockResolvedValue(spotsMock),
    });

    test("Then it should respond with status code 200", async () => {
      const expectedStatusCode = 200;

      await getSpotsController(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call it's json method with the spots 'La modelo' and 'Sagrada Familia'", async () => {
      await getSpotsController(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toBeCalledWith({ spots: spotsMock });
    });
  });

  describe("And there is an error", () => {
    test("Then it should call the received next function with a 500 status code and an 'Internal server error', error", async () => {
      const error = new CustomError(
        "Internal server error",
        500,
        "Internal server error",
      );

      Spot.find = jest.fn().mockReturnValue({
        limit: jest.fn().mockReturnThis(),
        exec: jest.fn().mockRejectedValue(error),
      });

      await getSpotsController(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
