const express = require('express')
const adminRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const Admin = require('../models/adminSchema');
const { Strategy } = require('passport');


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


adminRouter.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token');
    res.json({
        user:{email : "", password : ""},
        success : true
    });
});

// adminRouter.post('/login',(req, res) => {
//     console.log("LOGIN REQUEST RECIEVED");
// });

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
            const newAdmin = new Admin({ name, organization, email, password});
            newAdmin.save(err=>{
                if (err) res.status(500).json({
                    message: {
                        msgBody: "Error has occurred !",
                        msgError: true
                    }
                });
                else{
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
});


module.exports = adminRouter; 