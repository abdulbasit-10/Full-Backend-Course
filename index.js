const express = require("express")
const app = express()

const connectDB = require('./config/db.js')
const UserRoutes = require('./routes/user_routes.js')
// api get simple 

const object = [{
    name: "Abdul Basit",
    age: "25"
},{
    name : "Munim Sarfarz",
    age: "23"
},{
    name: "Hamza",
    age: "22"
},{
    name: "Jawad Ahmad",
    age: "27"
}]

app.get('/aboutmyself', (req,res)=>{
    res.send({msg:'Welcome to backend development',data:object})
})

// middleware
app.use('/api/v0/users', UserRoutes)

app.listen(3000,()=>{
    connectDB()
    console.log('server is running at port 3000')
})