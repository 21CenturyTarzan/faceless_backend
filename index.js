const express = require("express");

const http = require("http");

const app = express();
const bodyParser = require("body-parser");

const cors = require("cors");
app.use(cors({ origin: true }));

const mongoose = require("mongoose");

require("dotenv").config();
const PORT = 4000;


app.use(bodyParser.json({ limit: "10mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "10mb", extended: true }));

const server = http.createServer(app);


// mongoose.connect(
//   "mongodb+srv://shahiddgk:2llbsPlUaTIsb48H@cluster0.rxm2atp.mongodb.net/?retryWrites=true&w=majority",
//   { useNewUrlParser: true }
// );

mongoose.connect("mongodb://127.0.0.1:27017", { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

console.log("New client connected");

// app.use("/", require("./middleware"));
app.use("/user", require("./routes/register")());
// app.use("/nurse", require("./routes/basic/nurse")());
// app.use("/patient", require("./routes/basic/patient")());
// app.use("/rota", require("./routes/rota")());
// app.use("/leave", require("./routes/leave")());


server.listen(PORT, function () {
  console.log("Server is running on Port: " + PORT);
});