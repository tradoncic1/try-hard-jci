const request = require("supertest");

const app = require("../index.js");
const jwt = require("jsonwebtoken");
const config = require("../config.js");

describe("Activity approval tests", () => {
  it("should approve a new activity", async () => {
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
          desc: "Jest Test Description"
        })

        let url = "/approveactivity/" + 
        res.body.activity.username + 
        "/" + res.body.activity.history[1][1]

        const req = await request(app)
        .post(url)

        expect(res.body.activity.history[1][4])
        .toEqual("pending")

        expect(req.body.response)
        .toEqual("OK");

        expect(req.statusCode)
        .toEqual(200);

      if (res.statusCode == 200) {
        await request(app).delete("/removetestuser");
      }
    }
  });

  it("should reject a new activity", async () => {
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
          desc: "Jest Test Description"
        })

        let url = "/declineactivity/" + 
        res.body.activity.username + 
        "/" + res.body.activity.history[1][1]

        const req = await request(app)
        .post(url)

        expect(res.body.activity.history[1][4])
        .toEqual("pending")

        expect(req.body.response)
        .toEqual("OK");

        expect(req.body.status)
        .toEqual("declined");

        expect(req.statusCode)
        .toEqual(200);

      if (res.statusCode == 200) {
        await request(app).delete("/removetestuser");
      }
    }
  });

  it("should return a list of test activities", async () => {
    const register = await request(app)
      .post("/registration")
      .send(userModel);
    if (register) {
        let res = await request(app)
        .post("/addaction/400")
        .send({
          username: "JestTester",
          grade: 10,
          time: 0,
          desc: "Jest Test Grade One"
        })
        res = await request(app)
        .post("/addaction/400")
        .send({
          username: "JestTester",
          grade: 9,
          time: 0,
          desc: "Jest Test Grade Two"
        })
        res = await request(app)
        .post("/addaction/400")
        .send({
          username: "JestTester",
          grade: 8,
          time: 0,
          desc: "Jest Test Grade Three"
        })
        res = await request(app)
        .post("/addaction/400")
        .send({
          username: "JestTester",
          grade: 7,
          time: 0,
          desc: "Jest Test Grade Four"
        })

        const req = await request(app)
        .get("/getapprovals")
        
        expect(req.body[0].description)
        .toEqual("Jest Test Grade Four")

        expect(req.body[1].description)
        .toEqual("Jest Test Grade Three")
        
        expect(req.body[2].description)
        .toEqual("Jest Test Grade Two")

        expect(req.body[3].description)
        .toEqual("Jest Test Grade One")

        expect(req.statusCode)
        .toEqual(200);

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
    type: 1,
    phone: "+387 63 888 999",
    email: "jest.test@jestmail.com",
    pw: "jest",
    university: "IBU"
  };