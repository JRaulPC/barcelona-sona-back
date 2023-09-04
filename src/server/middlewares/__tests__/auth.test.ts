import admin from "firebase-admin";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { type AuthRequest } from "../types";
import { type NextFunction, type Response, type Request } from "express";
import auth from "../auth";
import CustomError from "../../../CustomError/CustomError";

jest.mock("firebase-admin");

const token: Partial<DecodedIdToken> = {};

admin.auth = jest.fn().mockReturnValue({
  verifyIdToken: jest.fn().mockResolvedValue(token),
});

const next: NextFunction = jest.fn();
const res: Partial<Response> = {};

describe("Given an authentification middleware", () => {
  describe("When it receives a request with a validated token", () => {
    test("Then it should call the passed next function without any arguments", async () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue("Bearer token"),
      };

      await auth(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });
  });

  describe("When it receives a request without a validated token", () => {
    test("Then it should call the passed next function with an error with the message 'Unauthorized' and status code 401", async () => {
      const error = new CustomError("Unauthorized", 401, "Not token provided");

      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue(undefined),
      };

      await auth(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });

  describe("When it receives a request without a validated token", () => {
    test("Then it should call the passed next function with an error with the message 'Unauthorized' and status code 401", async () => {
      const error = new CustomError("Invalid token", 401, "Not token provided");

      admin.auth = jest.fn().mockReturnValue({
        verifyIdToken: jest.fn().mockRejectedValue(error),
      });

      const req: Partial<Request> = {
        header: jest.fn().mockReturnThis(),
      };

      await auth(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith(error);
    });
  });
});
