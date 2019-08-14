const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// path to the user.js routes
const userRoutes = require('./src/backend/routes/user');
const userDetailsRoutes = require('./src/backend/routes/userDetails');
const productRoutes = require('./src/backend/routes/product_routes');
const cartRoutes = require('./src/backend/routes/cart');
//const scrape = require('./src/backend/scraper/scrape');
const app = express();
const http = require('http');
const server = http.Server(app);
const io = require('socket.io')(server);

//connection to db
mongoose.connect("mongodb+srv://Sagi:dmRSJFPfkxnioIXX@cluster0-56ueu.mongodb.net/edgefit?w=majority").then(()=>{
  console.log("Connected to db");
})
.catch(()=>{
  console.log('Connection to db failed');
});

// initial client side index page
app.use(express.static(path.join(__dirname, 'dist/firstApp')));

app.use(bodyParser.json());

let interval;

// websocket socket connection
io.on('connection',(socket) => {
  console.log("new connection made");
  let userMap = [];
  let productsMap =[];
  // emit to client each 0.5 second the users list from db
  interval = setInterval(()=>{
    http.get('http://localhost:5000/api/userDetails/usersList', response =>{
      let data = "";
      response.on('data', chunk=>{
        data += chunk;
      })
      response.on('end',()=>{
        userMap = data;
        socket.emit('getUsers',userMap);
      })
    });

    http.get('http://localhost:5000/api/product_routes/products', response =>{
      let data = "";
      response.on('data', chunk=>{
        data += chunk;
      })
      response.on('end',()=>{
        productsMap = data;
        socket.emit('getProducts',userMap);
      })
    });
  },500);
});

// initial server listen on port
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

// path to routes
app.use("/api/user",userRoutes);
app.use("/api/userDetails",userDetailsRoutes);
app.use("/api/product_routes",productRoutes);
app.use("/api/cart",cartRoutes);

