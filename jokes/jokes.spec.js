const request = require("supertest");
const server = require("../api/server");
const db = require("../database/dbConfig.js");

describe("GET /api/jokes", () => {
  beforeEach(async () => {
    await db("users").truncate();
  });

  it("Return 200 on success", () => {
    request(server)
      .post("/api/auth/register")
      .send({ username: "myself", password: "pass" });

    request(server)
      .post("/api/auth/login")
      .send({ username: "myself", password: "pass" })
      .then((res) => {
        return request(server)
          .get("/api/jokes")
          .set("Authorization", res.token)
          .then((res) => {
            expect(res.status).toBe(200);
          });
      });
  });

  //   it("Return 200 on success", async () => {
  //     await request(server)
  //       .post("/api/auth/register")
  //       .send({ username: "myself", password: "pass" });

  //     const { token } = await request(server)
  //       .post("/api/auth/login")
  //       .send({ username: "myself", password: "pass" });

  //     const res = await request(server)
  //       .get("/api/jokes")
  //       .set("Authorization", token);

  //     expect(res.status).toBe(200);
  //   });

  it("Return 401 on failure", () => {
    const token = "abc";
    return request(server)
      .get("/api/jokes")
      .set("Authorization", token)
      .then((res) => {
        expect(res.status).toBe(401);
      });
  });
});
