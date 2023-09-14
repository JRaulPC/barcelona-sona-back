import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../app.js";
import connectToDatabase from "../../../database/connectToDatabase.js";
import Spot from "../../../database/models/Spot.js";
import admin from "firebase-admin";
import { type DecodedIdToken } from "firebase-admin/lib/auth/token-verifier";
import mongoose from "mongoose";
import { type SpotStructure } from "../../../types.js";
import User from "../../../database/models/User.js";
import {
  authIdMock,
  postSpotMock,
  spotsMock,
  userMock,
} from "../../../mocks/spotsMock.js";

let server: MongoMemoryServer;

jest.mock("firebase-admin");

beforeAll(async () => {
  server = await MongoMemoryServer.create();
  const dbUrl = server.getUri();
  await connectToDatabase(dbUrl);
});

afterAll(async () => {
  await mongoose.connection.close();
  await server.stop();
});

const token: Partial<DecodedIdToken> = {
  uid: authIdMock,
};

admin.auth = jest.fn().mockReturnValue({
  verifyIdToken: jest.fn().mockResolvedValue(token as DecodedIdToken),
});

beforeEach(async () => {
  await User.create(userMock);
  await Spot.create(spotsMock);
});

afterEach(async () => {
  await Spot.deleteMany();
  await User.deleteMany();
});

describe("Given a GET '/spots' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a message and a the spots 'La modelo' and 'La Sagrada Familia", async () => {
      const expectedStatusCode = 200;
      const path = "/spots";

      const response = await request(app)
        .get(path)
        .set("Authorization", "Bearer token")
        .expect(expectedStatusCode);

      const responseBody = response.body as { spots: SpotStructure[] };

      responseBody.spots.forEach((spot, spotPosition) => {
        expect(responseBody.spots[spotPosition]).toHaveProperty(
          "name",
          spot.name,
        );
      });
    });
  });
});

describe("Given a DELETE '/spots:spotId endpoint'", () => {
  describe("When it receives a request with the id of 'La modelo'", () => {
    test("Then it should respond with a message 'The spot with the id: '6668h4iuf9rfaksdjf' has been deleted", async () => {
      const expectedStatusCode = 200;
      const path = `/spots/${spotsMock[1]._id}`;

      await request(app)
        .delete(path)
        .set("Authorization", "Bearer token")
        .expect(expectedStatusCode);
    });
  });
});

describe("Given a POST '/spots' endpoint", () => {
  describe("When it receives a request with the spot 'La modelo'", () => {
    test("Then is should respond with a message ", async () => {
      const expectedStatusCode = 201;
      const path = "/spots";

      await request(app)
        .post(path)
        .send(postSpotMock)
        .set("Authorization", "Bearer token")
        .expect(expectedStatusCode);
    });
  });
});
