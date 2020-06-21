const result = require('dotenv').config()
if (result.error) {
    throw result.error
}

const path = require('path');
const express = require('express')
const candidateRouter = express.Router();

const mongoose = require('mongoose');
const Candidate = require(path.join(__dirname, '../db/models/candidateSchema'));

const sendMail = require('./mailer');

candidateRouter.post('/registration', (req,res) => {
    const { name, email, institute, branch, degree, scholar, admin, cgpa } = req.body;
    Candidate.findOne({ email }, (err, candidate) => {
        if (err) res.status(500).json({
            message: {
                msgBody: "Error has occurred !",
                msgError: true
            }
        })
        if(candidate) res.status(400).json({
            message:{
                msgBody: "Already registered",
                msgError: true
            }
        })
        else{
            subject = "Registration Successfull. Be ready for Interview.";
            body = "Hello " + name + 
            ", <br> Your Interview has been scheduled at 10:00AM on 24th July,2020." +
            "<br> Open the following link only at the time of interview !" +
            "<a href='http://recruitify-mlh-hackjaipur.herokuapp.com/api/joinInterview/candidate'>Join Interview</a>";
            sendMail(email, subject, body, function (err) {
                if (err) {
                    res.end("error");
                }
                else {
                    var newcandidate = new Candidate();
                    newcandidate.name = name;
                    newcandidate.institute = institute;
                    newcandidate.email = email;
                    newcandidate.branch = branch;
                    newcandidate.degree = degree;
                    newcandidate.scholar = scholar;
                    newcandidate.cgpa = cgpa;
                    newcandidate.admin = admin;

                    console.log(newcandidate);

                    newcandidate.save((err) => {
                        if (!err) {
                            console.log("Inserted in Mongodb");
                            res.end("Data Inserted Successfully");
                        }
                        else {
                            res.status(201).json({
                                message: {
                                    msgBody: "Registered !",
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

module.exports = candidateRouter;