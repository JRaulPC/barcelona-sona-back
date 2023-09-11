import { type NextFunction, type Request, type Response } from "express";
import CustomError from "../../../CustomError/CustomError";
import { generalErrorHandler } from "../errors";

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};
const next: NextFunction = jest.fn();

describe("Given an generalErrorHandler error middleware", () => {
  describe("When it receives a response and an error with the status code 500", () => {
    const customError = new CustomError(
      "Internal server error",
      500,
      "Internal server error",
    );

    test("Then it should call it  's response status method with the status code '500'", () => {
      generalErrorHandler(customError, req as Request, res as Response, next);

      expect(res.status).toBeCalledWith(customError.statusCode);
    });

    test("Then it should call it's json response method with the message 'Internal server error'", () => {
      expect(res.json).toBeCalledWith({ error: customError.publicMessage });
    });
  });

  describe("When it receives a response error without status code", () => {
    test("Then it should call it's status method with the status code 500", () => {
      const error = new Error();
      const predefinedStatusCode = 500;
      generalErrorHandler(
        error as CustomError,
        req as Request,
        res as Response,
        next,
      );

      expect(res.status).toBeCalledWith(predefinedStatusCode);
    });
  });
});
