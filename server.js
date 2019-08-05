const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
//const cors = require('cors');

const app = express();

//const users= require('./routes/users');

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
