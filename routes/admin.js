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


const randomstring = require('randomstring');
const bcrypt = require('bcryptjs');

//multer code

var bodyParser = require('body-parser');
var multer = require('multer');
var xlstojson = require("xls-to-json-lc");
var xlsxtojson = require("xlsx-to-json-lc");

var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/')
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
});


var upload = multer({ //multer settings
    storage: storage,
    fileFilter: function (req, file, callback) { //file filter
        if (['xls', 'xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
            return callback(new Error('Wrong extension type'));
        }
        callback(null, true);
    }
}).single('file');



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
                    link = "http://recruitify-mlh-hackjaipur.herokuapp.com/api/verify?email=" + email + "&key=" + randHash;
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
    res.redirect('http://recruitify-mlh-hackjaipur.herokuapp.com');
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


//Mass mailing students
adminRouter.post('/massMail', passport.authenticate('jwt', { session: false }), (req, res) => {
    console.log("Mass mailing students");
    const emails = [];
    if (req.isAuthenticated()) {
        var exceltojson;
        const _id=req.user._id;
        const company = req.user.organization;
        console.log(req.user);
        upload(req, res, function (err) {
            if (err) {
                res.json({ error_code: 1, err_desc: err });
                return;
            }
            /** Multer gives us file info in req.file object */
            if (!req.file) {
                res.json({ error_code: 1, err_desc: "No file passed" });
                return;
            }
            /** Check the extension of the incoming file and 
             *  use the appropriate module
             */
            if (req.file.originalname.split('.')[req.file.originalname.split('.').length - 1] === 'xlsx') {
                exceltojson = xlsxtojson;
            } else {
                exceltojson = xlstojson;
            }
            console.log(req.file.path);
            try {
                exceltojson({
                    input: req.file.path,
                    output: null, //since we don't need output.json
                    lowerCaseHeaders: true
                }, function (err, result) {
                    if (err) {
                        return res.json({ error_code: 1, err_desc: err, data: null });
                    }

                    //console.log(result[1].email);
                    for (var i in result)
                        emails.push(result[i].email);
                    for (var i = 0; i < emails.length; i++) {
                        console.log(emails[i]);
                        //sending mails
                        subject = "Register at INTERVIEW-PLATFORM for JOBS.";
                        body = "Hello, " + 
                         "<br> Please regiter Yourself to INTERVIEW-PLATFORM for your interview at"
                         + "<br>Use " + _id + 
                         " as JOB ID. Be carefull while filling JOB ID.<br><a href=" 
                            + "http://recruitify-mlh-hackjaipur.herokuapp.com/candidate-registration" + ">Click here to go to INTERVIEW-PLATFORM</a>";
                        sendMail(emails[i], subject, body, function (err) {
                            if (err) {
                                console.log("Mail Not Sent");
                            } else {
                                console.log("mail sent");
                            }
                        });
                    }
                    res.json({ error_code: 0, err_desc: null, data: result });
                });
            } catch (e) {
                res.json({ error_code: 1, err_desc: "Corupted excel file" });
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