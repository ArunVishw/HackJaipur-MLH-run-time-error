const result = require('dotenv').config()
if (result.error) {
    throw result.error
}

const path = require('path');
const express = require('express');
const bcrypt = require('bcrypt');
var randomstring = require("randomstring");
const joinInterviewRouter = express.Router();

joinInterviewRouter.get('/', (req,res) =>{
    
});

module.exports = joinInterviewRouter;