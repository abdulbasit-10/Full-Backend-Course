const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    // key: value,
    // username: {type : String, unique:true, required:true},
    username: String,
    email: String,
    password: String
}, {timestamps:true})

module.exports = mongoose.model('user', userSchema)
