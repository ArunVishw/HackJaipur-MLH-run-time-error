const result = require('dotenv').config()
if (result.error) {
    throw result.error
}

const path = require('path');
const express = require('express')
const verifyRouter = express.Router();
const Admin = require(path.join(__dirname, '../db/models/adminSchema'));
const bcrypt = require('bcryptjs'); 
const url = require('url');


verifyRouter.get('/', (req,res)=>{
    const queryObject = url.parse(req.url, true).query;
    email = queryObject.email;
    key = queryObject.key;
    Admin.findOne({ email }, (err, admin) => {
        if (err) console.log("Error");
        else {
            console.log(admin);
            bcrypt.compare(admin.verified, key, (err, isMatch) => {
                if (err)    console.log(err);
                else if(!isMatch)   console.log("Invalid Verification");
                else{
                    var query = { 'email': email };
                    var newData = { 'verified' : "true" };
                    Admin.findOneAndUpdate(query, newData, { upsert: true }, function (err, doc) {
                        if (err) res.status(500).json({
                            message: {
                                msgBody: "Invalid Email Verification",
                                msgError: true
                            }
                        });
                        else {
                            res.status(201).json({
                                message: {
                                    msgBody: "Account successfully verified !",
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

module.exports = verifyRouter;