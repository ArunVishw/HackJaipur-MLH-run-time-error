var mongoose = require("mongoose");
const express = require("express");
const app = express();
var port = 4000;
var student = require("./studentSchema.js");
const router = express.Router();
var uri = "mongodb://127.0.0.1:27017/OnlineInterview";

mongoose.connect(uri, { useUnifiedTopology: true, useNewUrlParser: true });

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

app.use("/", router);
var query = { isSelected: true };
router.route("/api/admin/liveInterviews").get(function(req, res) {
    student.find(query, function(err, result) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
  });
app.listen(port, function() {
  console.log("Server is running on Port: " + port);
});