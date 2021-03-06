const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
    number: {type: String, required: true , unique: true },
    category: {type: String, required: true  },
    brand: {type: String, required: true},
    title: {type: String, required: true },
    price: {type: Number, required: true },
    image_link: {type: String, required: true },
});


module.exports = mongoose.model("Product",productSchema);
