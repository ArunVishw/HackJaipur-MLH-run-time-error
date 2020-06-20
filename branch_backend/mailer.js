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

const sendMail=(name,email,host,cb)=>{
    rand=Math.floor((Math.random() * 100) + 54);
    host_name=host;
    link="http://"+host_name+"/check?id="+rand;
    mailOptions={
        from:'atulyar29@gmail.com',
		to : email,
		subject : "Please confirm your Email account",
		html : "Hello "+name+",<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>"	
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