import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import app from "../server/app.js";
import admin from "firebase-admin";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier.js";

let server: MongoMemoryServer;

jest.mock("firebase-admin");

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const token: Partial<DecodedIdToken> = {};

  admin.auth = jest.fn().mockReturnValue({
    verifyIdToken: jest.fn().mockResolvedValue(token as DecodedIdToken),
  });
});

afterAll(async () => {
  await server.stop();
});

describe("Given a GET '/' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status 200 and message 'Pong 🏓", async () => {
      const endpoint = "/";

      await request(app)
        .get(endpoint)
        .set("Authorization", "bearer")
        .expect(200);

      const response = await request(app)
        .get(endpoint)
        .set("Authorization", "bearer");

      expect(response.body).toHaveProperty("message", "Pong 🏓");
    });
  });
});
