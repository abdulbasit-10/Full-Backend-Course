// const { get } = require("mongoose")

// app.get('/', (req,res) =>{
//     res.send({msg: 'Welcome to backend development', data :obj})
// })

// get
exports.getAllUser = async(req,res)=>{
    res.send({msg: 'Welcome to backend development', data:{
        name: "Ali",
        age: "56"
    }})
}

const user = require("../models/user_model")
exports.createnewuser = async(req,res) =>{
    try {
        const{username, email, password} = req.body
        if(!username){
            return res.status(404).json({wrn: "Username is Required"})
        }
        const newuser = await User.create(req.body)
        return res.status(201).json({msg:"User created successfully", user: newuser})
} catch (error){
    console.log(error)
} 
}
