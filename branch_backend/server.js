require('./db')
const express=require('express');
const path=require('path');
const sendMail=require('./mailer');
const bodyParser=require('body-parser');

const app=express();

const register=require('./users.controller').register;
const update=require('./users.controller').update_data;
app.use(express.urlencoded({
    extended:false
}));
app.use(bodyParser.urlencoded({ 
    extended: true
}));
var email_addrerss,rand_check;
app.get('/register',(req,res)=>{
    console.log(req.query);
    const {name,organisation,email,password}=req.query;
    email_addrerss=email;
    host=req.get('host');
    sendMail(name,email,host,function(err,data){
        if(err){
           // res.status(500).json({message:'Internal Error'});
            res.end("error");
        }else
        {
            rand_check=data;
            console.log(data);
            //res.json({message:'Message Sent!!!'});            
            res.end("sent");
        }
    });
    register(name,organisation,email,password,rand_check,function(err,data){
        if(err){
            res.end(err)
        }
        else{
            res.end("data inserted successfully")
        }

    })
});

app.get('/check',function(req,res){
    console.log(req.protocol+":/"+req.get('host'));
    if((req.protocol+"://"+req.get('host'))==("http://"+host))
    {
        console.log("Domain is matched. Information is from Authentic email");
        if(req.query.id==rand_check)
        {

            var myquery = {"email":email_addrerss };
            //var newvalues = { verified: "true"};
            
            update(myquery,function(err,data){
                if(err){
                    res.end(err);
                }
                else{
                    res.end("Account verified in MongoDB");
                }
        
            })

            console.log("email is verified");
            res.end("<h1>Email "+email_addrerss+" has been Successfully verified");
        }
        else
        {
            console.log("Email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    }
    else
    {
        res.end("<h1>Request is from unknown source");
    }
});
app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'views','index.html'));
});


app.listen(3000,()=>{
    console.log('Server is starting,',3000);
});