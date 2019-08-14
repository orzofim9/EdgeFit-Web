const express = require("express");
const router = express.Router();
const Cart = require("../models/cart");

router.post("/addcart/:email", (req, res, next)=>{
  console.log(req.params.email);
        Cart.find({email: req.params.email},(err,cart)=>{
      //    console.log(cart);
          if(cart.length>0){
            console.log("check");
            var products = cart[0].products;
            products.push(req.body.product);
            Cart.updateOne({email: req.params.email},{ products: products}).then(result=>{
              res.status(201).json({
                msg: 'Cart updated!',
                response: result
              });
            });
          }
          else{
            console.log("check2");
            const cartDetails = new Cart({
               email: req.params.email,
               products: [req.body.product]
           });
           cartDetails.save().then(result => {
               res.status(201).json({
                   message: 'Cart details added!',
                   result: result
               });
          });
        }
  });
});

router.get('/getCartProducts/:email',function(req,res,next){
    Cart.find({email: req.params.email},function(err, cart){
      //console.log(cart)
      res.status(200).json(cart);

    });
});

module.exports = router;

