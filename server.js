const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// path to the user.js routes
const userRoutes = require('./src/backend/routes/user');
const app = express();
const socket = require('socket.io');

mongoose.connect("mongodb+srv://Sagi:dmRSJFPfkxnioIXX@cluster0-56ueu.mongodb.net/edgefit?w=majority").then(()=>{
  console.log("Connected to db");
})
.catch(()=>{
  console.log('Connection to db failed');
});

app.use(express.static(path.join(__dirname, 'dist/firstApp')));

app.use(bodyParser.json());

const port = process.env.port || 5000 ;

var server = app.listen(port,()=> console.log('Server started on port ' + port));

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Header",
  "Origin, Access-X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user",userRoutes);

var io = socket(server);
io.on('connection',function(socket){
  console.log("connected");
});

