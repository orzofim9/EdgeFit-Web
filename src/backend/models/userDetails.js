const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userDetailsSchema = mongoose.Schema({
    email: {type: String, required: true , unique: true },
    firstName: {type: String, required: true },
    lastName: {type: String, required: true },
    birthday: {type: Date, required: true },
    city: { type: String },
    address: { type: String },
    phone: { type: String }
});

//Check if email registered alreay exists
userDetailsSchema.plugin(uniqueValidator);

module.exports = mongoose.model("UserDetails",userDetailsSchema);
