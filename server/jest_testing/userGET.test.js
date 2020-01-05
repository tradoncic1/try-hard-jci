const request = require("supertest");

const app = require("../index.js");
const jwt = require("jsonwebtoken");
const config = require("../config.js");

describe("GET requests for users", () => {
  it("should return the user specified by the request parameter", async () => {
    const res = await request(app)
      .get("/user/kiradon")

    expect(res.body.name)
    .toEqual("Tarik");

    expect(res.body.username)
    .toEqual("kiradon");

    expect(res.body.pw)
    .toEqual("ngl, nice try fam");

    expect(res.statusCode)
    .toEqual(200);
  });

  it("should return a 401 response", async () => {
    const res = await request(app)
      .get("/user/madeUpUser")

    expect(res.body.response)
    .toEqual("User not found");

    expect(res.statusCode)
    .toEqual(401);
  });
});
