const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
//const cors = require('cors');

const app = express();

mongoose.connect("mongodb+srv://Sagi:dmRSJFPfkxnioIXX@cluster0-56ueu.mongodb.net/edgefit?w=majority").then(()=>{
  console.log("Connected to db");
})
.catch(()=>{
  console.log('Connection to db failed');
});
// path to the user.js routes
const userRoutes = require('./src/backend/routes/user');

/*app.get('*', (req,res)=>{
  res.sendFile(path.join(__dirname, 'dist/firstApp/index.html'));
});*/
//app.use(express.static)
app.use(express.static(path.join(__dirname, 'dist/firstApp')));

const port = process.env.port || 5000 ;

//app.use(cors());

app.use(bodyParser.json());

//app.use('/users', users);

app.listen(port,()=> console.log('Server started on port ' + port));

app.use("/api/user",userRoutes);
