const request = require("supertest");
const server = require("../api/server");

describe("GET /api/jokes", () => {
  it("Return 200 on success", () => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJuYW1lIjoibWUiLCJpYXQiOjE1ODc3NTc5NjEsImV4cCI6MTU4Nzg0NDM2MX0.hqrdnOwZDQqlz1NnJIlRODLmGcyQZ8yqK6qPkI7hZoc";
    return request(server)
      .get("/api/jokes")
      .set("Authorization", token)
      .then((res) => {
        expect(res.status).toBe(200);
      });
  });

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
