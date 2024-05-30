const { type } = require("@testing-library/user-event/dist/type");
let mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true
    }
})

let user = mongoose.model("userSchema" , userSchema);

module.exports = user;




