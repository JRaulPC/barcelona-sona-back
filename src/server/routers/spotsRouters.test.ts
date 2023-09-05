import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../app.js";
import connectToDatabase from "../../database/connectToDatabase";
import Spot from "../../database/models/Spot";
import { authIdMock, spotsMock, userMock } from "../../mocks/spotsMock";
import admin from "firebase-admin";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import mongoose from "mongoose";
import { type SpotStructure } from "../../types.js";
import User from "../../database/models/User.js";

let server: MongoMemoryServer;

jest.mock("firebase-admin");

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const dbUrl = server.getUri();
  await connectToDatabase(dbUrl);
  await User.create(userMock);
  await Spot.create(spotsMock);

  const token: Partial<DecodedIdToken> = {
    uid: authIdMock,
  };

  admin.auth = jest.fn().mockReturnValue({
    verifyIdToken: jest.fn().mockResolvedValue(token as DecodedIdToken),
  });
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

describe("Given a GET '/spots' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a message and a the spots 'La modelo' and 'La Sagrada Familia", async () => {
      const expectedStatusCode = 200;
      const path = "/spots";

      const response = await request(app)
        .get(path)
        .set("Authorization", "bearer")
        .expect(expectedStatusCode);

      const responseBody = response.body as { spots: SpotStructure[] };
      const idToFind = userMock._id;

      const spots = await Spot.find({ idToFind }).exec();

      spots.forEach((spot, spotPosition) => {
        expect(responseBody.spots[spotPosition]).toHaveProperty(
          "name",
          spot.name,
        );
      });
    });
  });
});
