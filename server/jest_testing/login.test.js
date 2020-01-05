const request = require("supertest");

const app = require("../index.js");
const jwt = require("jsonwebtoken");
const config = require("../config.js");
describe("Login tests", () => {
  
  it("should log the user in, providing a valid JWToken // Regular user", async () => {
    const res = await request(app)
      .post("/authenticate")
      .send({
        username: "kiradon",
        password: "test"
      });

    let token = jwt.verify(res.body.jwt, config.JWT_SECRET);

    expect(token.username)
    .toEqual("kiradon");

    expect(token.type)
    .toEqual(2);

    expect(res.body.response)
    .toEqual("OK");

    expect(res.statusCode)
    .toEqual(202);
  });
  it("should log the user in, providing a valid JWToken // Admin user", async () => {
    const res = await request(app)
      .post("/authenticate")
      .send({
        username: "hamdij4",
        password: "hashme"
      });

    let token = jwt.verify(res.body.jwt, config.JWT_SECRET);

    expect(token.username)
    .toEqual("hamdij4");

    expect(token.type)
    .toEqual(1);

    expect(res.body.response)
    .toEqual("OK");

    expect(res.statusCode)
    .toEqual(202);
  });
  it("should return deny access // wrong password", async () => {
    const res = await request(app)
      .post("/authenticate")
      .send({
        username: "kiradon",
        password: "wrong_password"
      });
      
    expect(res.body.response)
    .toEqual("Login failed");

    expect(res.statusCode)
    .toEqual(401);
  });
  it("should return deny access // empty input", async () => {
    const res = await request(app)
      .post("/authenticate")
      .send({
        username: "",
        password: ""
      });
      
    expect(res.body.response)
    .toEqual("Login failed");

    expect(res.statusCode)
    .toEqual(401);
  });
});
