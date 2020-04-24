const request = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

describe("Auth Router", () => {
  describe('POST to "/api/auth/register"', () => {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("Returns status code 201", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "myself", password: "pass" })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe('POST to "/api/auth/register"', () => {
    it("Returns status code 500", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "myself" })
        .then((res) => {
          expect(res.status).toBe(500);
        });
    });
  });

  describe('POST to "/api/auth/login', () => {
    it("Returns a status code 200", () => {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "myself", password: "pass" })
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });

    it("Returns a status code 401", () => {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "myself", password: "pppasss" })
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });
  });
});
