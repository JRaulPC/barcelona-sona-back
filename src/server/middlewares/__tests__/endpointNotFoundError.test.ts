import { type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import { endpointNotFound } from "../errors";

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next = jest.fn();

describe("Given an endpointNotFound error middleware", () => {
  describe("When the passed next function is called", () => {
    test("Then it should call the passed next function with a custom error with status code 404", () => {
      const customError = new CustomError(
        "Endpoint not found",
        404,
        "Endpoint not found",
      );

      endpointNotFound(req as Request, res as Response, next);

      expect(next).toBeCalledWith(customError);
    });
  });
});
