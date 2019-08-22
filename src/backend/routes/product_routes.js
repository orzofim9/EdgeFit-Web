const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const mongoose = require('mongoose');
var util = require('util');
var MapRed = require("node-mapred");




router.get('/products/:category',(req,res)=>{

  console.log(req.params.category);
  Product.find({category: req.params.category},(err, response)=>{
      res.status(200).json({
         response
      });
  });
});

router.post('/productsId',function(req,res){
  //response= id_to_product(req.body.idList)
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

/*router.post('/topBrand',function(req,res){
  //response= id_to_product(req.body.idList)
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
*/

router.get('/countCategory',function(req,res){
  Product.aggregate([
    {
        $group: {
            _id: '$category',
            count: {$sum: 1}

        }
    },
    {
        $sort: {count: -1}
    }
], function (err, result) {
    if (err) {
        next(err);
    } else {
      console.log(result)
        res.json(result);
    }
});

});


router.post('/topBrand',function(req,res){

  const ids = JSON.parse(req.body.idList);
  var mapred = new MapRed();
  let idList = []
  let products
  ids.map(id => {
    idList.push(mongoose.Types.ObjectId(id));
  });
  Product.find({'_id': { $in: idList }},(err,response)=>{
    products = response;


    mapred.exec(products)
    .map(function () {
        mapred.emit(this.brand, this.price)
    })
    .reduce(function (key, values) {
        return values.reduce((sum, val) => sum + val);
    })
    .result(function (result) {
        console.log(result);
        res.status(201).json(result);
    });
  });
});



function id_to_product(idList){
  const ids = JSON.parse(idList);
  let new_idList = []
  ids.map(id => {
    new_idList.push(mongoose.Types.ObjectId(id));
  })
  Product.find({'_id': { $in: new_idList }},(err,response)=>{
    return response;
  });

}



module.exports = router;
