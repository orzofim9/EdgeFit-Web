const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const axios = require('axios');

// path to the user.js routes
const userRoutes = require('./src/backend/routes/user');
const userDetailsRoutes = require('./src/backend/routes/userDetails');
const productRoutes = require('./src/backend/routes/product_routes');
const cartRoutes = require('./src/backend/routes/cart');
const postRoutes = require('./src/backend/routes/post');
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


// websocket socket connection
io.on('connection',(socket) => {
//  console.log("new connection made");
  let productsMap =[];

  socket.on('signUp', userDetails=>{
    axios.post("http://localhost:5000/api/userDetails/signup", userDetails).then(response=>{
      io.emit('getUsers',response.data);
    });
  });

  socket.on('searchUsers', ()=>{
    io.emit('getUsers');
  });

  socket.on('searchProducts', ()=>{
    io.emit('getProducts');
  });

  socket.on('deleteUser',email=>{
    axios.get("http://localhost:5000/api/user/deleteUser/" + email).then(response=>{
      axios.get("http://localhost:5000/api/userDetails/deleteUser/" + email).then(response=>{
        axios.get('http://localhost:5000/api/cart/clearCart/' + email).then(response => {
          io.emit('getUsers',response.data);
        })
      })
    })
  })

  socket.on('updateUserDetails',userDetails=>{
    axios.post('http://localhost:5000/api/userDetails/updateDetails/' + userDetails.email, userDetails).then( response => {
      io.emit('getUsers',response.data);
      io.emit('getUserDetails');
    })
  })

  socket.on('productAddToCart', productToCart =>{
    axios.post('http://localhost:5000/api/cart/addcart/' + productToCart.email, { product: productToCart.product }).then(response => {
      http.get('http://localhost:5000/api/cart/getCartProducts/' + productToCart.email, response => {
        let data = "";
        response.on('data', chunk=>{
          data += chunk;
        })
        response.on('end',()=>{
          productsMap = data;
          io.emit('getCart',productsMap);
        });
      });
    });
  });

  socket.on('deleteProduct', productToDelete =>{
    axios.post('http://localhost:5000/api/cart/deleteProduct/'+ productToDelete.email, { product: productToDelete.product}).then(response =>{
        io.emit('getCart');
    });
  });

  socket.on('clearCart', userCart=>{
    axios.get('http://localhost:5000/api/cart/clearCart/' + userCart.email).then(response => {
      io.emit('getCart');
    })
  })

  socket.on('addPost', post=>{
    axios.post('http://localhost:5000/api/post/addPost', post).then(response =>{
      io.emit('getPosts');
    });
  });

  socket.on('deletePost',post => {
    console.log(post);
    axios.post('http://localhost:5000/api/post/deletePost', post).then(response => {
      io.emit('getPosts');
    })
  })

  socket.on('updatePost', post => {
    axios.post('http://localhost:5000/api/post/updatePost',post).then(response => {
      io.emit('getPosts');
    })
  });
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
app.use("/api/post",postRoutes);
