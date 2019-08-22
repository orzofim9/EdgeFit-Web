const cheerio = require('cheerio');
const request = require('request');
const Product = require("../models/product");
const mongoose = require("mongoose");

//console.log("hello2")
var product_number = 1;
//sports shoes
product_request_category('https://www.allsportstore.com/en/Football-Boots/c-63.aspx?AttributeValueIDs=1462','Sports shoes')
product_request_category('https://www.allsportstore.com/en/Trainers/c-448.aspx?AttributeValueIDs=2938,1472', 'Sports shoes')
// Equipment
product_request_category('https://www.allsportstore.com/en/Boxing/c-15.aspx?AttributeValueIDs=3022', 'Equipment')
product_request_category('https://www.allsportstore.com/en/Fitness-and-Training-Equipment/c-123.aspx?AttributeValueIDs=3025', 'Equipment')
product_request_category('https://www.allsportstore.com/en/RunningFitness/c-269.aspx?&AttributeValueIDs=2961', 'Equipment')
product_request_category('https://www.allsportstore.com/en/Running-Accessories/c-139.aspx?AttributeValueIDs=2894', 'Equipment')
// food additives
product_request_category('https://www.allsportstore.com/en/Supliments-and-Energy-Drinks/c-351.aspx',  'Food additives')
// balls
product_request_category('https://www.allsportstore.com/en/Balls/c-447.aspx',  'Balls')



function product_request_category(url,product_category){
  request(url, (error,response, html)=>{
    if(!error && response.statusCode == 200){
      const $ = cheerio.load(html);
      var flag=true;
      var i = 1;

      while (flag){
        product_brand = product_data($,false, '#ModelLinkCell', 'span', i);
        product_title = product_data($,false, '#ModelLinkCell', 'a', i);
        product_price = product_data($,false, '#ModelPrice', '.price-label', i);
        product_image_link = "https://www.allsportstore.com" + product_data($,true, '#ModelImageCell', 'img', i);
        product_price = string_to_int(product_price);
        product_brand = product_brand.substring(0, product_brand.length-1);
        if (product_title != "") {

            const product = new Product({
              number: product_number,
              category: product_category,
              brand: product_brand,
              title: product_title,
              price: product_price,
              image_link: product_image_link


             });
            product.save().then(result => {
              //console.log("product saved!")
            });
          i++;
          product_number ++;
        }
        else {flag = false}
      }


    }

  });
}
function product_data($,image, classid, text, i){
  const products = $(classid + i);

  if (!image){
   var products_data = products.find(text).text();
  }
  else{
   var products_data = products.find(text).attr('src');
   //console.log(products_data)
  }
  return products_data;

}

function string_to_int(product_price){
  for(let i=0; i<product_price.length; i++){
    if(product_price[i] >= String.fromCharCode(48) && product_price[i] <= String.fromCharCode(57)){
      var x = product_price.substring(i, product_price.length);
     return x
    }
  }
}

