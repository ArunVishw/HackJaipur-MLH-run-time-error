const result = require('dotenv').config()
if (result.error) {
    throw result.error
}

const path = require('path');
const express = require('express');
const bcrypt = require('bcryptjs');
var randomstring = require("randomstring");
const joinInterviewRouter = express.Router();

const passport = require('passport');
const passportConfig = require(path.join(__dirname, '../passport'));
const JWT = require('jsonwebtoken');
const { Strategy } = require('passport');
const bodyParser = require('body-parser');

joinInterviewRouter.get('/admin', passport.authenticate('jwt', { session: false }), (req, res) => {
    const random = "v24wdfd";
    console.log("Take interview working");
    if (req.isAuthenticated()) {
        const url = process.env.FRONTEND_HOST + "/interview?room=" + random;
        return res.redirect(url);
    }
    else {
        const url = process.env.FRONTEND_HOST + "/home" + random;
        return res.redirect(url);
    }
});

joinInterviewRouter.get('/candidate', (req, res) => {
    const random = "v24wdfd";
    console.log("Take interview working");
    const url = process.env.FRONTEND_HOST + "/interview?room=" + random;
    return res.redirect(url);
});

module.exports = joinInterviewRouter;