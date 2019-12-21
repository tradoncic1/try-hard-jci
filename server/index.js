const mongojs = require('mongojs')
const express = require('express')
const jwt = require('json-web-token')
const bodyParser = require('body-parser')
const PORT = 4200;


app.use(bodyParser.json())