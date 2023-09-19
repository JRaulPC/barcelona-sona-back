import { type Response, type NextFunction, type Request } from "express";
import { laModeloMockId, spotsMock } from "../../../../mocks/spotsMock";
import { createSpotController } from "../spotsControllers";
import Spot from "../../../../database/models/Spot";
import CustomError from "../../../../CustomError/CustomError";
import { type AuthRequest } from "../../../types";

beforeEach(() => {
  jest.clearAllMocks();
});

const req: Partial<Request> = { params: { spotId: laModeloMockId } };
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next: NextFunction = jest.fn();

describe("Given a createSpotController controller", () => {
  describe("When it receives a request with the spot 'La modelo'", () => {
    const spotToCreate = spotsMock[1];
    Spot.create = jest.fn().mockReturnValue(spotToCreate);

    test("Then it should call it's status method with a 201", async () => {
      const expectedStatusCode = 201;

      await createSpotController(req as AuthRequest, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call it's json method with the spot 'La modelo'", async () => {
      await createSpotController(req as AuthRequest, res as Response, next);

      expect(res.json).toBeCalledWith({ spot: spotToCreate });
    });
  });

  describe("And there is an error", () => {
    test("Then it should call the received next function with a 500 status code and", async () => {
      const error = new CustomError(
        "Spot can't be created",
        500,
        "Internal server error",
      );

      Spot.create = jest.fn().mockRejectedValue(error);

      await createSpotController(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
