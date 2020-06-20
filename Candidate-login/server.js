require('./db')
const express=require('express');
const sendMail=require('./mailer');
const bodyParser=require('body-parser');
const path=require('path');
const app=express();
const mongoose=require('mongoose');
const Student=mongoose.model('student');
app.use(express.urlencoded({
    extended:false
}));
app.use(bodyParser.urlencoded({ 
    extended: true
}));
app.get('api/student/data',(req,res)=>{
    console.log(req.query);  
    const {name,email,institute,branch,degree,scholar,cgpa}=req.query;
    var admin=new Student();
    admin.name=name;
    admin.institute=institute;
    admin.email=email;
    admin.branch=branch;
    admin.degree=degree;
    admin.scholar=scholar;
    admin.cgpa=cgpa;
    console.log(admin);
    admin.save((err,doc)=>{
        if(!err){
            console.log("Inserted in Mongodb");
            sendMail(name,email,function(err,data){
                if(err){                   
                    res.end("error");
                }else
                {           
                    res.end("Email sent");
                }
            });
            res.end("Data Inserted Successfully");
        }
        else{
            if(err.code==11000)
            console.log('Email already registered.');
            else
            cb(error,null);

            res.end(err);
        }
    });
});
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'));
});



app.listen(3000,()=>{
    console.log('Server is starting,',3000);
});