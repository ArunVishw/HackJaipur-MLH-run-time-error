const nodemailer=require('nodemailer');
const express=require('express');

const app=express();

var smtpTransport = nodemailer.createTransport({	
	port:465,
    service: "Gmail",
    auth: {
        user: "atulyar29@gmail.com",
        pass: "atulya.2904"
    },
    tls:{
        rejectUnauthorized: false
    }
});

var rand,mailOptions,host_name,link;

const sendMail=(name,email,cb)=>{
    rand=Math.floor((Math.random() * 100) + 54);
    
    mailOptions={
        from:'atulyar29@gmail.com',
		to : email,
		subject : "Please confirm your Email account",
		html : "Hello "+name+",<br> Your Interview has been scheduled at 10:00AM on 24th July,2020."	
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