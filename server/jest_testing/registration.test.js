const request = require("supertest");

const app = require("../index.js");
const jwt = require("jsonwebtoken");
const config = require("../config.js");

describe("User registration tests", () => {
  it("should create a new user with specified parameters", async () => {
    const res = await request(app)
      .post("/registration")
      .send(userModel);

    expect(res.body.response)
    .toEqual("User created");

    expect(res.statusCode)
    .toEqual(200);

    if (res.statusCode == 200) {
        await request(app)
        .delete("/removetestuser")
    }
  });

  it("should not create a user with a duplicate email", async () => {
    userModel.email = "hamdija@mail.com"
    const res = await request(app)
      .post("/registration")
      .send(userModel);

    expect(res.body.response)
    .toEqual("email");

    expect(res.statusCode)
    .toEqual(406);
    userModel.email =  "jest.test@jestmail.com";
  });

  it("should not create a user with a duplicate username", async () => {
    userModel.username = "hamdij4"
    const res = await request(app)
      .post("/registration")
      .send(userModel);

    expect(res.body.response)
    .toEqual("username");

    expect(res.statusCode)
    .toEqual(406);
    userModel.email =  "jest.test@jestmail.com";
  });
});


const userModel = {
    name: "ExampleName",
    surname: "ExampleSurname",
    username: "JestTester",
    dob: "11.12.2019",
    type: 1,
    phone: "+387 63 888 999",
    email: "jest.test@jestmail.com",
    pw: "jest",
    university: "IBU"
  };