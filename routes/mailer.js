const result = require('dotenv').config()
if (result.error) {
    throw result.error
}

const path = require('path');
const nodemailer=require('nodemailer');
const bcrypt = require('bcryptjs');
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

const sendMail=(email,subject,body,cb)=>{
    
    const mailOptions = {
        from: process.env.MAILING_ID,
        to: email,
        subject: subject,
        html: body
    };
    smtpTransport.sendMail(mailOptions, function (error) {
        if (error) {
            console.log(error);
            cb(error);
        }
        else {
            console.log("Message sent!!! ");
            cb(null);
        }
    });
};

module.exports = sendMail;