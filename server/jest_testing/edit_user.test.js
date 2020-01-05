const request = require("supertest");

const app = require("../index.js");
const jwt = require("jsonwebtoken");
const config = require("../config.js");

describe("Editing user profile tests", () => {
  it("should change the user's email", async () => {
    const register = await request(app)
      .post("/registration")
      .send(userModel);
    if(register){   
        userModel.email = "JestNewEmail@NewMail.com"
        res = await request(app)
        .post("/updateuser/JestTester")
        .send(userModel)

        expect(res.body.model.email)
        .toEqual(userModel.email)

        expect(res.statusCode)
        .toEqual(200);

      if (res.statusCode == 200) {
        await request(app).delete("/removetestuser");
      }
    }
  })
  it("should change the user's username", async () => {
    const register = await request(app)
      .post("/registration")
      .send(userModel);
    if(register){
        userModel.username = "NewJestTester"
        res = await request(app)
        .post("/updateuser/JestTester")
        .send(userModel)

        expect(res.body.model.username)
        .toEqual(userModel.username)
        
        expect(res.statusCode)
        .toEqual(200);

      if (res.statusCode == 200) {
        await request(app).delete("/removetestuser");
      }
    }
  });
  it("should fail due to an invalid password", async () => {
    const register = await request(app)
      .post("/registration")
      .send(userModel);
    if(register){
        userModel.pw = "FakeJestPassword"
        res = await request(app)
        .post("/updateuser/JestTester")
        .send(userModel)

        expect(res.body.security)
        .toEqual("password")

      if (res.statusCode == 200) {
        await request(app).delete("/removetestuser");
      }
    }
  });

});

const userModel = {
    name: "ExampleName",
    surname: "ExampleSurname",
    username: "JestTester",
    dob: "11.12.2019",
    type: 2,
    phone: "+387 63 888 999",
    email: "jest.test@jestmail.com",
    pw: "jest",
    university: "IBU",
    timers: {},
    activity: 1,
    exp: 0,
    grades: [],
    history: {},
    achiev: []
  };
  const tempModel = userModel;