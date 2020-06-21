const result = require('dotenv').config()
if (result.error) {
    throw result.error
}

const path = require('path');
const express = require('express')
const adminRouter = express.Router();

const passport = require('passport');
const passportConfig = require(path.join(__dirname, '../passport'));
const JWT = require('jsonwebtoken');
const { Strategy } = require('passport');

const mongoose = require('mongoose');
const Admin = require(path.join(__dirname, '../db/models/adminSchema'));
const Candidate = require(path.join(__dirname, '../db/models/candidateSchema'));

const sendMail = require(path.join(__dirname, './mailer'));

const signToken = id => {
    return JWT.sign({
        iss : process.env.JWT_KEY,
        sub : id
    },"run_time_error",{expiresIn : "1h"});
}

adminRouter.post('/login', passport.authenticate('local',{session: false}) , (req, res) => {
    console.log("LOGIN REQUEST RECIEVED");
    if (req.isAuthenticated()) {
        const { _id, name, organization, email } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true });
        const url = process.env.FRONTEND_HOST + "/dashboard";
        return res.redirect(url);
    }
    else {
        const url = process.env.FRONTEND_HOST + "/dashboard";
        return res.redirect(url);
    }
});


adminRouter.post('/register',(req,res)=>{
    const {name,organization,email,password} = req.body;
    Admin.findOne({email},(err,admin)=>{
        if(err) res.status(500).json({
            message: {
                msgBody: "Error has occurred !",
                msgError: true
            }
        });
        if(admin)   res.status(400).json({
            message: {
                msgBody: "User already exists with that EMAIL !",
                msgError: true
            }
        });
        else{
            rand = randomstring.generate();
            bcrypt.hash(rand, 10, (err, randHash) => {
                if (err) res.status(500).json({
                    message: {
                        msgBody: "Error has occurred while generating HASH !",
                        msgError: true
                    }
                });
                else {
                    link = process.env.HOST + "/api/verify?email=" + email + "&key=" + randHash;
                    subject = "";
                    body = "Hello " + name + ",<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>";
                    sendMail(email, subject, body, function (err) {
                        if (err) res.status(500).json({
                            message: {
                                msgBody: "Error has occurred while sending verification mail!",
                                msgError: true
                            }
                        });
                        else {
                            const newAdmin = new Admin({ name, organization, email, password, randHash});
                            newAdmin.save(err => {
                                if (err) res.status(500).json({
                                    message: {
                                        msgBody: "Error has occurred while creating account!",
                                        msgError: true
                                    }
                                });
                                else {
                                    res.status(201).json({
                                        message: {
                                            msgBody: "Account successfully created !",
                                            msgError: false
                                        }
                                    });
                                }
                            });
                        }
                    });
                }
            });
        }
    });
});

adminRouter.post('/authenticateUser', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("AUTHENTICATING");
    if (req.isAuthenticated()) {
        const { _id, name, email, organization} = req.user;
        res.status(500).json({
            id: _id,
            name: name,
            email: email,
            organization: organization
        });
    }
    else{
        res.status(500).json({
            message: {
                msgBody: "Invalid Credentials !",
                msgError: true
            }
        });
    }
});

adminRouter.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("Logging out");
    res.clearCookie('access_token');
    res.json({
        user: { email: "", password: "" },
        success: true
    });
});


//Getting Info for live Interviews
adminRouter.get('/liveInterviews', passport.authenticate('jwt', { session: false }), (req,res) => {
    console.log("Getting details of live interviews");
    if (req.isAuthenticated()) {
        const { _id } = req.user;
        var query = { isSelected: true, isInterviewed: false, admin: _id };
        Candidate.find(query, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    }
    else {
        res.status(500).json({
            message: {
                msgBody: "Not a verified admin !",
                msgError: true
            }
        });
    }
});


//Getting Info for Past Interviews
adminRouter.get('/pastInterviews', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("Getting details of past interviews");
    if (req.isAuthenticated()) {
        const { _id } = req.user;
        var query = { isSelected: true, isInterviewed: true, admin: _id };
        Candidate.find(query, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    }
    else {
        res.status(500).json({
            message: {
                msgBody: "Not a verified admin !",
                msgError: true
            }
        });
    }
});




// GOOGLE O AUTH

adminRouter.get('/auth/google', passport.authenticate('google', { scope: ['profile'] }));

adminRouter.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }), function (req, res) {
    res.cookie('access_token', token, { httpOnly: true });
    const url = process.env.FRONTEND_HOST + "/dashboard";
});


module.exports = adminRouter; 