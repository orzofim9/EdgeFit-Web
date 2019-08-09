const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
// path to the user.js routes
const userRoutes = require('./src/backend/routes/user');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const userScheme = require('./src/backend/models/user');
const http = require('http');
mongoose.connect("mongodb+srv://Sagi:dmRSJFPfkxnioIXX@cluster0-56ueu.mongodb.net/edgefit?w=majority").then(()=>{
  console.log("Connected to db");
})
.catch(()=>{
  console.log('Connection to db failed');
});

app.use(express.static(path.join(__dirname, 'dist/firstApp')));

app.use(bodyParser.json());

let interval;

io.on('connection',(socket) => {
  console.log("new connection made");
  let userMap = [];
  interval = setInterval(()=>{ 
    http.get('http://localhost:5000/api/user/usersList', response =>{
      let data = "";
      response.on('data', chunk=>{
        data += chunk;
      })
      response.on('end',()=>{
        userMap = data;
        socket.emit('getUsers',userMap);
      })
  });
},500);
});

const port = process.env.port || 5000 ;

server.listen(port,()=> console.log('Server started on port ' + port));

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin","*");
  res.setHeader("Access-Control-Allow-Headers",
  "Origin, Access-X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/user",userRoutes);


