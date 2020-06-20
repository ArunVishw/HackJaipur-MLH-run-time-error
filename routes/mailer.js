const nodemailer=require('nodemailer');
const express=require('express');
const bcrypt = require('bcrypt');
var randomstring = require("randomstring");



const app=express();

var smtpTransport = nodemailer.createTransport({	
	port:465,
    service: "Gmail",
    auth: {
        user: "",
        pass: ""
    },
    tls:{
        rejectUnauthorized: false
    }
});

var rand,mailOptions,host_name,link;

const sendMail=(name,email,host,cb)=>{
    rand = randomstring.generate();
    host_name=host;
    bcrypt.hash(rand, 10, (err, randHash) => {
        if (err){
            cb(err);
        }
        else{
            rand = randHash;
            link = "http://" + host_name + "/check?email=" + email + "&key=" + rand;
            mailOptions = {
                from: '',
                to: email,
                subject: "Please confirm your Email account",
                html: "Hello " + name + ",<br> Please Click on the link to verify your email.<br><a href=" + link + ">Click here to verify</a>"
            };
            console.log(mailOptions);
            smtpTransport.sendMail(mailOptions, function (error, response) {
                if (error) {
                    console.log(error);
                    cb(error, null);
                }
                else {
                    console.log("Message sent!!! ");
                    cb(null, rand);
                }
            });
        }
    });

};

module.exports=sendMail;