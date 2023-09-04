import { MongoMemoryServer } from "mongodb-memory-server";
import request from "supertest";
import app from "../server/app.js";

let server: MongoMemoryServer;

beforeAll(async () => {
  server = await MongoMemoryServer.create();
});

afterAll(async () => {
  await server.stop();
});

describe("Given a GET '/' endpoint", () => {
  describe("When it receives a request", () => {
    test("Then it should respond with a status 200 and message 'Pong 🏓", async () => {
      const endpoint = "/";

      await request(app).get(endpoint).expect(200);

      const response = await request(app).get(endpoint);

      expect(response.body).toHaveProperty("message", "Pong 🏓");
    });
  });
});
