const request = require("supertest");

const server = require("../api/server.js");
const db = require("../database/dbConfig.js");

describe("Auth Router", () => {
  describe("POST /api/auth/register", () => {
    beforeEach(async () => {
      await db("users").truncate();
    });

    it("Return 201 on success", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "myself", password: "pass" })
        .then((res) => {
          expect(res.status).toBe(201);
        });
    });
  });

  describe("POST /api/auth/register", () => {
    it("Return 500 on failure", () => {
      return request(server)
        .post("/api/auth/register")
        .send({ username: "myself" })
        .then((res) => {
          expect(res.status).toBe(500);
        });
    });
  });

  describe("POST /api/auth/login", () => {
    it("Return 200 on success", () => {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "myself", password: "pass" })
        .then((res) => {
          expect(res.status).toBe(200);
        });
    });

    it("Return 401 on failure", () => {
      return request(server)
        .post("/api/auth/login")
        .send({ username: "myself", password: "pppasss" })
        .then((res) => {
          expect(res.status).toBe(401);
        });
    });
  });
});
