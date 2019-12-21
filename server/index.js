const mongojs = require('mongojs')
const express = require('express')
const app = express()
const jwt = require('json-web-token')
const bodyParser = require('body-parser')
const PORT = 4200;


app.use(bodyParser.json())



app.listen(PORT, () => {
    console.log("Backed on port : ", PORT)
})