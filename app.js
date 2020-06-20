const result = require('dotenv').config()
if (result.error) {
    throw result.error
}

const path = require('path');
const express = require('express');
const app = express() ;
const cookieParser = require('cookie-parser');

const mongoose = require('mongoose');
const Admin = require(path.join(__dirname, 'models/adminSchema'));
app.set('view engine', 'ejs');

const http = require('http');
const socket = require('socket.io');
let server = app.listen(process.env.PORT, () => {
    console.log('Express server started')
});
let io = socket(server);

app.use(cookieParser());
app.use(express.json());
app.use('/static', express.static('static'));
var bodyParser = require('body-parser');
const { Console } = require('console');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/',function(req,res){
    res.render('index');
});

mongoose.connect('mongodb://localhost:27017/'+process.env.DB_NAME, { useNewUrlParser: true, useUnifiedTopology: true},()=>{
    console.log('Connected successfully to DATABASE')
});

const adminRouter = require(path.join(__dirname, './routes/admin'));
app.use('/admin',adminRouter);

const verifyEmail = require(path.join(__dirname, './routes/verifyEmail'));
app.use('/verify',verifyEmail);

const joinInterview = require(path.join(__dirname, './routes/joinInterview'));
app.use('/joinInterview', joinInterview);

// const socketManager = require(path.join(__dirname, './routes/socketManager'));
// io.on('connection', socketManager);
io.on('connection', (client) => {
    console.log("SOCKET IO WORKING");

    client.on('updateNotepad', (data) => {
        client.broadcast.to(data.room).emit('changeNotepad', data.text);
        console.log("Online status broadcasted to ROOM " + data.room);
    });

    client.on('join', (room, callback) => {
        client.join(room);
        callback("Successfully joined the room : " + room);
    });

});