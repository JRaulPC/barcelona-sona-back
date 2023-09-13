import { type Response, type NextFunction, type Request } from "express";
import { deleteSpotByIdController } from "../spotsControllers";
import Spot from "../../../../database/models/Spot";
import CustomError from "../../../../CustomError/CustomError";

const modeloMockId = "6hg54029hd839jdf";

const req: Partial<Request> = { params: { spotId: modeloMockId } };
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a deleteSpotByIdController controller", () => {
  describe("When it receives a request with the id from the spot 'La modelo'", () => {
    Spot.findByIdAndDelete = jest.fn().mockReturnValue({
      exec: jest.fn().mockResolvedValue({}),
    });

    test("Then it should return a response with status code 200", async () => {
      const expectedStatusCode = 200;

      await deleteSpotByIdController(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.status).toHaveBeenCalledWith(expectedStatusCode);
    });

    test("Then it should call it's json method with the message 'Thing with the id 6hg54029hd839jdf got deleted' ", async () => {
      await deleteSpotByIdController(
        req as Request,
        res as Response,
        next as NextFunction,
      );

      expect(res.json).toBeCalledWith({
        message: `Thing with the id ${modeloMockId} got deleted`,
      });
    });

    describe("And there is an error", () => {
      test("Then it should call the received next function with a 409 status code and an 'Spot could not be deleted', error", async () => {
        const error = new CustomError(
          "Spot could not be deleted",
          409,
          "Internal server error",
        );

        Spot.findByIdAndDelete = jest.fn().mockReturnValue({
          exec: jest.fn().mockRejectedValue(error),
        });

        await deleteSpotByIdController(
          req as Request,
          res as Response,
          next as NextFunction,
        );

        expect(next).toHaveBeenCalledWith(error);
      });
    });
  });
});
