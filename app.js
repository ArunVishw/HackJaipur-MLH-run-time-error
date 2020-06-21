const result = require('dotenv').config()
if (result.error) {
    throw result.error
}


const Peer = require('simple-peer');

const path = require('path');
const express = require('express');
const app = express() ;
const cookieParser = require('cookie-parser');
const connectDB = require(path.join(__dirname, './db/Connection'));
connectDB();

const Admin = require(path.join(__dirname, './db/models/adminSchema'));


const http = require('http');
const socket = require('socket.io');
let server = app.listen(process.env.PORT, () => {
    console.log('Express server started')
});

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, './Client/build')));
    app.get('*', (req,res) => {
        res.sendFile(path.join(__dirname, './Client/build/index.html'));
    });
}

let io = socket(server);

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

app.use(cookieParser());
app.use(express.json());
var bodyParser = require('body-parser');
const { Console } = require('console');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/assets', express.static('views/assets'));

const adminRouter = require(path.join(__dirname, './routes/admin'));
app.use('/api/admin',adminRouter);

const verifyEmail = require(path.join(__dirname, './routes/verifyEmail'));
app.use('/api/verify',verifyEmail);

const joinInterview = require(path.join(__dirname, './routes/joinInterview'));
app.use('/api/joinInterview', joinInterview);

const candidate = require(path.join(__dirname, './routes/candidate'));
app.use('/api/candidate', candidate);

app.get('/', (req,res) => {
    res.render('index.ejs');
});



io.on('connection', (client) => {
    console.log("SOCKET IO WORKING");

    client.on('updateNotepad', (data) => {
        client.broadcast.to(data.room).emit('changeNotepad', data.text);
    });

    client.emit('connected');

    client.on('join', (room, callback) => {
        client.join(room);
        callback("Successfully joined the room : " + room);
    });

    client.on("callUser", (data) => {
        console.log("Calling User");
        client.broadcast.to(data.room).emit('hey', { signal: data.signal });
    })

    client.on("acceptCall", (data) => {
        console.log("Accepting call");
        client.broadcast.to(data.room).emit('callAccepted', data.signal);
    })

    client.on("disconnectCall", (data) => {
        console.log("Disconnecting call");
        io.sockets.in(data.room).emit('disconnect');
    })
});