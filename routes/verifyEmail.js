const express = require('express')
const verifyRouter = express.Router();
const Admin = require('../models/adminSchema');


verifyRouter.get('/verify', (req,res)=>{
    email = req.query.email;
    key = req.query.key;
    Admin.findOne({ email }, (err, admin) => {
        if (err) console.log("Error");
        else {
            bcrypt.compare(key, admin.verified, (err, isMatch) => {
                if (err)    console.log(err);
                else if(!isMatch)   console.log("Invalid Verification");
                else{
                    var query = { 'email': email };
                    var newData = { 'verified' : "true" };
                    Admin.findOneAndUpdate(query, newData, { upsert: true }, function (err, doc) {
                        if (err) console.log(err);
                        else console.log(doc);
                    });
                }
            });
        }
    });
});

module.exports = verifyRouter;