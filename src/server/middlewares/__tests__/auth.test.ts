import admin from "firebase-admin";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import { type AuthRequest } from "../types";
import { type NextFunction, type Response, type Request } from "express";
import auth from "../auth";
import CustomError from "../../../CustomError/CustomError";
import { authIdMock, userMock } from "../../../mocks/spotsMock";
import User from "../../../database/models/User";

jest.mock("firebase-admin");

const next: NextFunction = jest.fn();
const res: Partial<Response> = {};

const token: Partial<DecodedIdToken> = { uid: authIdMock };

admin.auth = jest.fn().mockReturnValue({
  verifyIdToken: jest.fn().mockResolvedValue(token),
});

describe("Given an authentification middleware", () => {
  describe("When it receives a request with a validated token", () => {
    test("Then it should call the passed next function without any arguments", async () => {
      const req: Partial<Request> = {
        header: jest.fn().mockReturnValue("Bearer token"),
      };

      User.findOne = jest
        .fn()
        .mockReturnValue({ exec: jest.fn().mockResolvedValue(userMock) });

      await auth(req as AuthRequest, res as Response, next);

      expect(next).toHaveBeenCalledWith();
    });

    describe("And the id from the token doesn't match any user", () => {
      test("Then it should call the passed next function with an error with the message 'User not found'", async () => {
        const userNotFoundError = new CustomError(
          "User not found",
          404,
          "User with the provided id not found",
        );

        const req: Partial<Request> = {
          header: jest.fn().mockReturnValue("Bearer token"),
        };

        User.findOne = jest
          .fn()
          .mockReturnValue({ exec: jest.fn().mockResolvedValue(undefined) });

        await auth(req as AuthRequest, res as Response, next);

        expect(next).toHaveBeenCalledWith(userNotFoundError);
      });
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

  describe("When it receives a request with a token and it's not valid", () => {
    test("Then it should call the passed next function with an error with the message 'Invalid token' and status code 401", async () => {
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
