import { type NextFunction, type Request, type Response } from "express";
import Spot from "../../../../database/models/Spot";
import {
  spotMock,
  spotMockId,
  toogledIsVisitedSpotMock,
} from "../../../../mocks/spotsMock";
import { type AuthRequest } from "../../../types";
import { toogleIsVisitedByIdController } from "../spotsControllers";
import CustomError from "../../../../CustomError/CustomError";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<Request> = {
  params: { spotId: spotMockId },
  body: spotMock,
};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next: NextFunction = jest.fn();

describe("Given a toogleIsVisitedByIdController controller", () => {
  describe("When it receives a request with the spot 'La Modelo' an isVisited true", () => {
    Spot.findByIdAndUpdate = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue(toogledIsVisitedSpotMock),
    });

    test("Then it should call it's status method with a 200", async () => {
      const expectedStatusCode = 200;

      await toogleIsVisitedByIdController(
        req as AuthRequest,
        res as Response,
        next,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call it's json method with the spot 'La Modle' with the property 'isVisited' true", async () => {
      await toogleIsVisitedByIdController(
        req as AuthRequest,
        res as Response,
        next,
      );

      expect(res.json).toHaveBeenCalledWith({
        spot: toogledIsVisitedSpotMock,
      });
    });
  });

  describe("And there is an error", () => {
    test("Then it should call the received next function with a 409 status code and an 'Spot can't be updated', error", async () => {
      const error = new CustomError(
        "Spot, can't be updated",
        409,
        "Internal server error",
      );

      Spot.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(error),
      });

      await toogleIsVisitedByIdController(
        req as AuthRequest,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(error);
    });

    test("Then it should call the received next function with a 409 status code and an 'Spot can't be updated', error", async () => {
      const error = new CustomError(
        "Error, can't find spot!",
        404,
        "Internal server error",
      );

      Spot.findByIdAndUpdate = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });

      await toogleIsVisitedByIdController(
        req as AuthRequest,
        res as Response,
        next,
      );

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
