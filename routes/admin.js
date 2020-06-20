const express = require('express')
const adminRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const Admin = require('../models/adminSchema');
const { Strategy } = require('passport');

const path = require('path');
const sendMail = require('./mailer');

// var bodyParser = require('body-parser');
// adminRouter.use(bodyParser.urlencoded({ extended: false }));
// adminRouter.use(bodyParser.json());


const signToken = id => {
    return JWT.sign({
        iss : "run_time_error",
        sub : id
    },"run_time_error",{expiresIn : "1h"});
}

adminRouter.post('/login', passport.authenticate('local',{session: false}) , (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, name, organization, email } = req.user;
        const token = signToken(_id);
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        res.status(200).json({
            isAuthenticated: true,
            admin: { name, organization, email }
        });
    }
    else {
        res.status(500).json({
            message: {
                msgBody: "Invalid Credentials !",
                msgError: true
            }
        });
    }
});


adminRouter.post('/register',(req,res)=>{
    const {name,organization,email,password} = req.body;
    // console.log(req);
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
            host = req.get('host');
            sendMail(name, email, host, function (err, verified) {
                if (err) res.status(500).json({
                    message: {
                        msgBody: "Error has occurred while sending verification mail!",
                        msgError: true
                    }
                });
                else {
                    const newAdmin = new Admin({ name, organization, email, password, verified});
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
});


adminRouter.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token');
    res.json({
        user: { email: "", password: "" },
        success: true
    });
});


module.exports = adminRouter; 