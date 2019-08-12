const express = require("express");
const router = express.Router();
const Product = require("../models/product");

router.get('/products/:category',(req,res)=>{
  Product.find({category: req.params.category},(err,response)=>{
      res.status(200).json({
         response
      });
  });
});

router.get('/products', function(req, res) {
  Product.find({}, function(err, products) {
      res.status(200).json(products);
  });
});

module.exports = router;
