// const mongoose=require('mongoose');
// const userSchema=new mongoose.Schema({
//     username:String,
//     email:String,
//     password: String
// })

// const userModel=mongoose.model("user",userSchema)
// module.exports=userModel;

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true, // 🔥 duplicate email prevent
        lowercase: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true });

const userModel = mongoose.model("user", userSchema);
module.exports = userModel;