import { type Request, type Response } from "express";
import pingController from "./pingController.js";

const req: Partial<Request> = {};
const res: Partial<Response> = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
};

const next = jest.fn();

describe("Given a Ping controller", () => {
  describe("When it receives a request", () => {
    test("Then it should call it's status method with a status code 200", () => {
      const expectedStatusCode = 200;
      pingController(req as Request, res as Response, next);

      expect(res.status).toBeCalledWith(expectedStatusCode);
    });

    test("Then it should call it's json method with the message 'Pong 🏓'", () => {
      const expectedMessage = { message: "Pong 🏓" };

      expect(res.json).toBeCalledWith(expectedMessage);
    });
  });
});
