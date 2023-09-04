import { type NextFunction, type Request, type Response } from "express";
import { getSpotsController } from "../spotsControllers";
import Spot from "../../../../database/models/Spot";
import { spotsMock } from "../../../../mocks/spotsMock";

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
});
