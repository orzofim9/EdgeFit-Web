const mongoose = require("mongoose");

const cartSchema = mongoose.Schema({
   // number: {type: String, required: true , unique: true },
    email: {type: String, required: true , unique: true },
    products: {type: Array}
    /*category: {type: String, required: true  },
    brand: {type: String, required: true},
    title: {type: String, required: true },
    price: {type: Number, required: true },
    image_link: {type: String, required: true },*/
});


module.exports = mongoose.model("Cart",cartSchema);
