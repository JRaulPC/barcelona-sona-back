import { type NextFunction, type Request, type Response } from "express";
import Spot from "../../../../database/models/Spot";
import { spotMock } from "../../../../mocks/spotsMock";
import { getSpotByIdController } from "../spotsControllers";
import CustomError from "../../../../CustomError/CustomError";

const req: Partial<Request> = { params: { spotId: spotMock._id! } };
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next: NextFunction = jest.fn();

describe("Given a getSpotByIdController controller", () => {
  describe("When it receiver a request with a hashed id as a request parameter", () => {
    test("Then it should return it's status method with 200", async () => {
      Spot.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(spotMock),
      });
      const expectedStatusCode = 200;

      await getSpotByIdController(
        req as Request<{ spotId: string }>,
        res as Response,
        next,
      );

      expect(res.status).toBeCalledWith(expectedStatusCode);
    });

    test("Then it should call it's json method with the spot 'Sala Apolo'", async () => {
      Spot.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(spotMock),
      });
      await getSpotByIdController(
        req as Request<{ spotId: string }>,
        res as Response,
        next,
      );

      expect(res.json).toBeCalledWith({ spot: spotMock });
    });
  });

  describe("When it receives a request with the wrong id '4034fn394nf98'", () => {
    test("Then it should throw a custom error with the message 'Error, can't get spot' and 404", async () => {
      Spot.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockResolvedValue(undefined),
      });
      const newError = new CustomError(
        "Error, can't find spot!",
        404,
        "Error, can't find spot!",
      );

      await getSpotByIdController(req as Request, res as Response, next);

      expect(next).toBeCalledWith(newError);
    });

    test("Then it should throw a custom error with the message 'Error, can't get spot' and 404", async () => {
      const newError = new CustomError(
        "Error, can't get Spot",
        404,
        "Error, can't get Spot",
      );

      Spot.findById = jest.fn().mockReturnValue({
        exec: jest.fn().mockRejectedValue(newError),
      });

      await getSpotByIdController(req as Request, res as Response, next);

      expect(next).toBeCalledWith(newError);
    });
  });
});
