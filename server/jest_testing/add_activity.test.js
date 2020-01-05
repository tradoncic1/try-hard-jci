const request = require("supertest");

const app = require("../index.js");
const jwt = require("jsonwebtoken");
const config = require("../config.js");

describe("Activity creation tests", () => {
  it("should add a new activity to the user", async () => {
    const register = await request(app)
      .post("/registration")
      .send(userModel);
    if (register) {
        const res = await request(app)
        .post("/addaction/100")
        .send({
            username: "JestTester",
            grade: 0,
            time: 3,
            desc: "Jest Test Description"
        })

        expect(res.body.response)
        .toEqual("OK");

        expect(res.body.status)
        .toEqual("EXP added");

        expect(res.statusCode)
        .toEqual(200);

        if (res.statusCode == 200) {
            await request(app)
            .delete("/removetestuser");
        }
    }
  });

  it("should add a new grade to the user", async () => {
    const register = await request(app)
      .post("/registration")
      .send(userModel);
    if (register) {
        const res = await request(app)
        .post("/addaction/400")
        .send({
            username: "JestTester",
            grade: 8,
            time: 3,
            desc: "Jest Grade Test Description"
        })
    
        expect(res.body.response)
        .toEqual("OK");
        
        expect(res.body.status)
        .toEqual("EXP added");
        expect(res.statusCode)
        .toEqual(200);

        if (res.statusCode == 200) {
            await request(app)
            .delete("/removetestuser");
        }
    }
  });

  it("should add a proper description to the user's activity", async () => {
    const register = await request(app)
      .post("/registration")
      .send(userModel);
    if (register) {
        const res = await request(app)
        .post("/addaction/400")
        .send({
            username: "JestTester",
            grade: 8,
            time: 3,
            desc: "Jest Grade Test Description"
        })
        expect(res.statusCode)
        .toEqual(200);

        expect(res.body.activity.history[1][3])
        .toEqual('Jest Grade Test Description');

        if (res.statusCode == 200) {
            await request(app)
            .delete("/removetestuser");
        }
    }
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
