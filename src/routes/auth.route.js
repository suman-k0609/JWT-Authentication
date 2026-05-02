const express=require('express');
const authcontroller=require("../controllers/auth.controller")

const router=express.Router();
//post/api/auth/reguster
router.post("/register",authcontroller.registerUser);
module.exports=router;