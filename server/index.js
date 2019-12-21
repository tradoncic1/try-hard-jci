const mongojs = require('mongojs')
const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')
const PORT = 4200;
const cors_ = require('cors')

app.use(cors_())
app.use(bodyParser.json())

let config= require('./config')

const db = mongojs(config.DB_URL)

app.get('/user/:username', (req, res) => {
    let reqUser = req.params.username
    db.user.findOne({username : reqUser}, (error, docs) => {
        if(error)
            throw error
        if(docs != null){
            console.log(docs)
            res.json(docs)
        }
        else{
            res.status(401)
            res.send({response: "Invalid information provided."})
        }
    })
})

app.get('/achievement/:key', (req, res) => {
    let reqKey = parseInt(req.params.key)
    db.achiev.find({key : reqKey}, (error, docs) => {
        if(error)
            throw error
        if(docs){
            console.log(docs)
            res.json(docs)
        }
        else {
            res.status(400)
            res.send({response: "Cannot find achiev with that key."})
        }
    })
})

app.post('/authenticate', (req, res) => {
    let model = req.body
    
    db.user.findOne({$and:[{username : model.username}, {pw : model.password}]}, (error, docs) => {
        if(error)
            throw error;
        if(docs){
            console.log(docs.username, docs.pw)
            if(model.username == docs.username && model.password == docs.pw){
                let token = jwt.sign({
                    username :req.body.username, 
                    type: "user", 
                    exp: Math.floor(Date.now() / 1000) + 3600 
                }, config.JWT_SECRET)
                console.log(model.username, model.pw, docs)
                res.send({response: "User logged in!", jwt: token});
            }
        }
        else {
            console.log(model)
            res.status(401);
            res.send({response: "Invalid input", access: "DENIED"})
        }
    })
})

app.post('/registration', (req, res) => {
    let model = {
        name: req.body.name,
        surname: req.body.surname,
        username: req.body.username,
        dob: req.body.dob,
        email: req.body.email || "None provided",
        pw : req.body.pw,
        exp : 0,
        activity : 1,
        history : [{}],
        achiev : []
    }
    console.log(model)
    db.user.insertOne(model, (error, docs) => {
        if(error) throw error;
        console.log("Successful register. Obj: ", docs)
        res.send({response: "User created!", user: docs})
    });
})

app.get('/addaction/:key', (req, res) => {
    if(req){
        let user = req.body.username //
        db.user.findOne({username: user}, (error, docs) => {
            if(error)
                throw error
            if(docs){
                let model = docs
                let actionExp = getActionExp(praseInt(req.params.key)) //
                let newExp = parseInt(model.exp) + actionExp
                model.exp = newExp
                let historyModel = [[req.body.start_date, req.body.end_date, parseInt(req.params.key)]] //[req.body.start_date, req.body.end_date, parseInt(req.params.key)]
                model.history.push(historyModel)
                db.user.replaceOne(
                    {username : user},
                    model, (error, docs) => {
                        if(error)
                            throw error
                        console.log("Set exp for action: ", req.params.key, "New exp: ", newExp)
                        res.send({response: "OK", status: "EXP added"})
                    }
                )
            }
        })
    }
})
app.get('/addachiev/:key', (req, res) => {
    let user = "hamdij4"//req.body.username
    db.user.findOne({username: user}, (error, docs) => {
        if (error)
            throw error
        //TODO Check achiev validity
        if(docs){
            
        }
    })
})

app.listen(PORT, () => {
    console.log("Backend on port : ", PORT)
})


function getActionExp (reqKey){
    if(reqKey == 100){
        return 5
    } else if(reqKey == 200){
    return 10
    } else if(reqKey == 201){
        return 15
    } else if(reqKey == 300){
        return 10
    } else if(reqKey == 301){
        return 5
    } else if(reqKey == 400){
        return 10
    } else if(reqKey == 401){
        return 15
    } else if(reqKey == 402){
        return 20
    } else if(reqKey == 403){
        return 25
    } else if(reqKey == 404){
        return 30
    } else if(reqKey == 405){
        return 35
    } else if(reqKey == 500){
        console.log("TODO implement end of semeter calc")
        return 1
    } else if(reqKey == 600){
        return 100
    } else if(reqKey == 700){
        return 10
    } else if(reqKey == 701){
        return 75
    }else {
        return -1;
    }
}