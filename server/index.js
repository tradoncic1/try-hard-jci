const mongojs = require("mongojs");
const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const bodyParser = require("body-parser");
const PORT = 4200;
const cors_ = require("cors");

app.use(cors_());
app.use(bodyParser.json());

let config = require("./config");

const db = mongojs(config.DB_URL);

app.get("/user/:username", (req, res) => {
  let reqUser = req.params.username;
  db.user.findOne({ username: reqUser }, (error, docs) => {
    if (error) throw error;
    if (docs != null) {
      console.log(docs);
      docs.pw = "ngl, nice try fam";
      res.json(docs);
    } else {
      res.status(401);
      res.send({ response: "Invalid information provided." });
    }
  });
});

app.get("/achievement/:key", (req, res) => {
  let reqKey = parseInt(req.params.key);
  db.achiev.find({ key: reqKey }, (error, docs) => {
    if (error) throw error;
    if (docs) {
      console.log(docs);
      res.json(docs);
    } else {
      res.status(400);
      res.send({ response: "Cannot find achiev with that key." });
    }
  });
});

app.post("/authenticate", (req, res) => {
  let model = req.body;

  db.user.findOne(
    { $and: [{ username: model.username }, { pw: model.password }] },
    (error, docs) => {
      if (error) throw error;
      if (docs) {
        if (model.username == docs.username && model.password == docs.pw) {
          let token = jwt.sign(
            {
              username: req.body.username,
              type: "user",
              exp: Math.floor(Date.now() / 1000) + 3600
            },
            config.JWT_SECRET
          );
          console.log(model.username, model.pw, docs);
          res.send({ response: "OK", jwt: token });
        }
      } else {
        console.log(model);
        res.status(401);
        res.send({ response: "input", access: "DENIED" });
      }
    }
  );
});

app.post("/registration", (req, res) => {
  let model = {
    name: req.body.name,
    surname: req.body.surname,
    username: req.body.username,
    dob: req.body.dob,
    email: req.body.email || "None provided",
    pw: req.body.pw,
    university: req.body.university,
    exp: 0,
    activity: 1,
    timers: {
        study: 0,
        rest: 0,
        volunteering: 0
    },
    grades: [],
    history: [[]],
    achiev: []
  };
  console.log(model);
  db.user.findOne({ email: req.body.email }, (error, docs) => {
    if (error) throw error;
    if (docs) {
      console.log("Dupicate email attempt: ", req.body.email);
      res.status(406);
      res.send({ response: "email" });
    } else {
      db.user.findOne({ username: req.body.username }, (error, docs) => {
        if (error) throw error;
        if (docs) {
          console.log("Duplicate username attept: ", req.body.username);
          res.status(406);
          res.send({ response: "username" });
        } else {
          db.user.insertOne(model, (error, docs) => {
            if (error) throw error;
            console.log("Successful register. Obj: ", docs);
            res.send({ response: "User created!", user: docs });
          });
        }
      });
    }
  });
});
app.post("/deletehistory", (req, res) => {
  let model = req.params.body;
  let user = model.username;
  model.history = [[]];

  db.user.replaceOne({ username: user }, model, (error, docs) => {
    if (error) throw error;
    if (docs) {
      console.log("History deleted for: ", user);
      res.send({ response: "OK", status: "EXP added" });
    } else {
      res.send({ response: "failed" });
    }
  });
});
app.post("/updateuser/:username", (req, res) => {
  let user = req.params.username;
  let model = req.body;
    let wrong_pw = false;
  db.user.findOne({ username: user }, (error, docs) => {
    if (error) throw error;
    if (docs) {
        if (docs.username != model.username) {
          docs.username = model.username;
        }
        if (docs.pw != model.new_password && model.password == docs.pw) {
          docs.pw = model.new_password;
        } else {
            wrong_pw = true;
        }
        if (docs.email != model.email) {
          docs.email = model.email;
        }
        if (docs.university != model.university) {
          docs.university = model.university;
        }
        if(wrong_pw){
          console.log("Failed user update for ", user);
          res.status(406);
          res.send({ response: "password"});
        }
        db.user.replaceOne({ username: user }, docs, (errorUpd, docsUpd) => {
          if (errorUpd) throw error;
          if (docsUpd) {
            let token = jwt.sign(
              {
                username: docs.username,
                type: "user",
                exp: Math.floor(Date.now() / 1000) + 3600
              },
              config.JWT_SECRET
            );
            console.log(user, " has been successfuly updated.");
            res.send({ response: "OK", jwt: token});
          }
        });
    }
  });
});
app.post("/addaction/:key", (req, res) => {
    let user = req.body.username;
    db.user.findOne({ username: user }, (error, docs) => {
      if (error) throw error;
      if (docs) {
        let model = docs;
        let actionExp = getActionExp(parseInt(req.params.key)); 
        let newExp = parseInt(model.exp) + actionExp;

        if(parseInt(req.params.key) == 200){
            model.timers.study += req.body.time
        }else if(parseInt(req.params.key) == 300){
            model.timers.rest += req.body.time
        }else if(parseInt(req.params.key) == 700){
            model.timers.volunteering += req.body.time
        }else if(parseInt(req.params.key == 300)){
            model.grades.push(req.body.grade)
        }

        let historyModel = [
            req.body.time,
          parseInt(req.params.key),
          req.body.desc
        ]; 
        model.history.push(historyModel);
        db.user.replaceOne({ username: user }, model, (error, docs) => {
          if (error) throw error;
          console.log(
            "Set exp for action: ",
            req.params.key,
            "New exp: ",
            newExp
          );
          console.log("Added new action for ", user)
          res.send({ response: "OK", status: "EXP added" });
        });
      }
    });
});
app.get("/addachiev/:key", (req, res) => {
  let user = "hamdij4"; //req.body.username
  db.user.findOne({ username: user }, (error, docs) => {
    if (error) throw error;
    //TODO Check achiev validity
    if (docs) {
    }
  });
});

app.get("/getleaderboard/:skip", (req, res) => {
  let limit = 15;
  let skip = parseInt(req.params.skip) || 0;

  db.user
    .find({})
    .skip(skip)
    .limit(limit)
    .sort({ exp: -1 }, (error, docs) => {
      if (error) throw error;
      if (docs) {
        let modelArray = [];
        docs.forEach(user => {
          let model = {
            name: user.name,
            surname: user.surname,
            username: user.username,
            exp: user.exp
          };
          modelArray.push(model);
        });
        res.send(modelArray);
        console.log("Leaderboard fetched");
      }
    });
});

app.listen(PORT, () => {
  console.log("Backend on port : ", PORT);
});

function checkAchiev(model){
}

function getActionExp(reqKey) {
  if (reqKey == 100) {
    return 5;
  } else if (reqKey == 200) {
    return 10;
  } else if (reqKey == 201) {
    return 15;
  } else if (reqKey == 300) {
    return 10;
  } else if (reqKey == 301) {
    return 5;
  } else if (reqKey == 400) {
    return 0;
  } else if (reqKey == 401) {
    return 15;
  } else if (reqKey == 402) {
    return 20;
  } else if (reqKey == 403) {
    return 25;
  } else if (reqKey == 404) {
    return 30;
  } else if (reqKey == 405) {
    return 35;
  } else if (reqKey == 500) {
    console.log("TODO implement end of semester calc");
    return 1;
  } else if (reqKey == 600) {
    return 100;
  } else if (reqKey == 700) {
    return 10;
  } else if (reqKey == 701) {
    return 75;
  } else {
    return -1;
  }
}
