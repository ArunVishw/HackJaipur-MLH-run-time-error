const result = require('dotenv').config()
if (result.error) {
    throw result.error
}

const path = require('path');
const nodemailer=require('nodemailer');
const bcrypt = require('bcrypt');
var randomstring = require("randomstring");


var smtpTransport = nodemailer.createTransport({	
	port: process.env.MAILING_PORT,
    service: "Gmail",
    auth: {
        user: process.env.MAILING_ID,
        pass: process.env.MAILING_PASSWORD
    },
    tls:{
        rejectUnauthorized: false
    }
});

var rand,mailOptions,host_name,link;

const sendMail=(name,email,host,cb)=>{
    rand = randomstring.generate();
    bcrypt.hash(rand, 10, (err, randHash) => {
        if (err){
            cb(err);
        }
        else{
            link = "http://" + process.env.HOST + ":" + process.env.PORT + "/verify?email=" + email + "&key=" + randHash;
            mailOptions = {
                from: process.env.MAILING_ID,
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

module.exports = sendMail;