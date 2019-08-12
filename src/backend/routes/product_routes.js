const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get('/products/:category',(req,res)=>{
  Product.find({category: req.params.category},(err, response)=>{
      res.status(200).json({
         response
      });
  });
});

router.post('/products', function(req, res) {
  let query = {}
  req.body.category? query.category=req.body.category:null;
  req.body.brand? query.brand=req.body.brand:null;
  req.body.price? query.price=req.body.price:null;
  Product.find(query, (err, products)=> {
      res.status(200).json(products);
  });
});

module.exports = router;
