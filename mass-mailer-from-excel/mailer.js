const nodemailer=require('nodemailer');
const express=require('express');

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

const sendMail=(email,cb)=>{   
    var link="http://localhost/3000";
    mailOptions={
        from:'atulyar29@gmail.com',
		to : email,
		subject : "Please fill out the attached form",
		html : "Hello <br> Please Click on the link to verify your email.<br><a href="+link+">Form</a>"	
    };
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response){
   	 if(error){
        console.log(error);
		cb(error,null);
     }
     else{
        console.log("Message sent!!! ");
		cb(null,rand);
    	 }
    
    });
};

module.exports=sendMail;