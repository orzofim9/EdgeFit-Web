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
      var productMap = [];
      let product_title;
      products.forEach(function(product) {
        product_title = product.title;
          productMap.push(product_title);
      });

      res.status(200).json(productMap);
  });
});

module.exports = router;
