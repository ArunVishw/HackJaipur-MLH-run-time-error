const mongoose = require('mongoose');
const URI = "mongodb+srv://"
            +process.env.DB_USER
            +":"
            + process.env.DB_PASSWORD
            +"@onlineinterview-lswfn.mongodb.net/"
            + process.env.DB_NAME
            +"?retryWrites=true&w=majority";

const connectDB = () => {
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("MONGODB Connected");
       })
       .catch(err => console.log(err))
}

module.exports = connectDB;