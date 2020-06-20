const express = require('express');
const app = express() ;
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(express.json());


 app.listen(5000,()=>{
     console.log('Express server started')
 });
