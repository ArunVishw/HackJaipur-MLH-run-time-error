const express = require('express');
const app = express() ;
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const Admin = require('./models/adminSchema');
app.use(cookieParser());
app.use(express.json());


mongoose.connect('mongodb://localhost:27017/interview_preparation', { useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log('Connected successfully to DATABASE')
});

const adminRouter = require('./routes/admin');
app.use('/admin',adminRouter);

 app.listen(5000,()=>{
     console.log('Express server started')
 });
