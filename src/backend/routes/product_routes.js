const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const mongoose = require('mongoose');
var util = require('util');

router.get('/products/:category',(req,res)=>{

  console.log(req.params.category);
  Product.find({category: req.params.category},(err, response)=>{
      res.status(200).json({
         response
      });
  });
});

router.post('/productsId',function(req,res){
  const ids = JSON.parse(req.body.idList);   
  let idList = []
  ids.map(id => {
    idList.push(mongoose.Types.ObjectId(id));
  })
  Product.find({'_id': { $in: idList }},(err,response)=>{
    console.log(response);
    res.status(201).json(response);
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
