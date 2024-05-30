const { userSchema } = require("../models")


let adduser = (body) => {
    return userSchema.create(body);
}

let getuser = () => {
    return userSchema.find();
}

let deleteuser = (id) => {
    return userSchema.findByIdAndDelete(id)
}

let findemail = (email) => {
    return userSchema.findOne({ email })
}
let updateuser = (id, body) => {
    return userSchema.findByIdAndUpdate(id, body)
}


module.exports = { adduser, getuser, deleteuser, findemail, updateuser }