const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");



const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
    },
    //passport-local-mongoose will automaltically create uername and password for the model by itself
})
userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);