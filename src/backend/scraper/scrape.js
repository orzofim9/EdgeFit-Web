const cheerio = require('cheerio');
const request = require('request');
const Product = require("../models/product");
const mongoose = require("mongoose");



/*const conn = mongoose.createConnection("mongodb+srv://Sagi:dmRSJFPfkxnioIXX@cluster0-56ueu.mongodb.net/edgefit?w=majority",{ useNewUrlParser: true });
conn.on('open', function () {

    conn.db.listCollections({name: 'products'}).next(function (err, collectionName) {
      if (err) {
        console.log(err);
        return;
      }

      if(collectionName){
        console.log('DVDVSDCSFVDVSDVDAVSVADVAD');
        console.log(collectionNames);
          conn.close();
        }
    });
});
mongoose.db.listCollections({name: 'products'})//move this lines to the file that calls this file
    .next(function(err, collinfo) {
        if (collinfo) {
          mongoose.connection.db.dropCollection('porducts', function(err, result) {});
          console.log("drop collection")

        }
        else{console.log("there is no collection")}

    });
*/
console.log("hello")
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
        product_title = product_data($,false, '#ModelLinkCell', 'a', i);
        product_price = product_data($,false, '#ModelPrice', '.price-label', i);
        product_image_link = "https://www.allsportstore.com" + product_data($,true, '#ModelImageCell', 'img', i);



        if (product_title != "") {
         /* console.log("product name: " + product_title );
          console.log("product price: " + product_price +"  ");
          console.log("product image link: " + product_image_link +"  ");*/

         // router.post("/add_product", (req, res, next)=>{
            const product = new Product({
              number: product_number,
              category: product_category,
              title: product_title,
              price: product_price,
              image_link: product_image_link


             });
            product.save().then(result => {
              console.log("product saved!")
/*              res.status(201).json({
                message: 'Product created!',
                result: result
              });*/
            });

     // });
          console.log(product)
          i++;
          product_number ++;
          console.log("----------------------------------------------------------------------------" )
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
