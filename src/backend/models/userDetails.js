const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userDetailsSchema = mongoose.Schema({
    email: {type: String, required: true , unique: true },
    role: { type: String, required: true },
    firstName: {type: String },
    lastName: {type: String },
    birthday: {type: Date },
    city: { type: String },
    address: { type: String },
    phone: { type: String }
});

//Check if email registered alreay exists
userDetailsSchema.plugin(uniqueValidator);

module.exports = mongoose.model("UserDetails",userDetailsSchema);
