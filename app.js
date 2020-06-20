const express = require('express');
const app = express() ;
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const Admin = require('./models/adminSchema');
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(express.json());
app.use('/static', express.static('static'));
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
    // res.render('index');
    res.render('index');
});

mongoose.connect('mongodb://localhost:27017/interview_preparation', { useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log('Connected successfully to DATABASE')
});

const adminRouter = require('./routes/admin');
app.use('/admin',adminRouter);

const verifyEmail = require('./routes/verifyEmail');
app.use('/verify',verifyEmail);


 app.listen(5000,()=>{
     console.log('Express server started')
 });
