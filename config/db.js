const mongoose = require("mongoose")

// simple arrow function 

// const DB_URL = 

const connectDB = async() =>{
    try {
        await mongoose.connectDB(DB_URL)
        console.log("DB connected successfully")
    } catch (error) {
        console.log('error', error)
    }
}

module.exports = connectDB;
