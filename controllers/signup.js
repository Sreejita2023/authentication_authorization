const Users=require('../model/Users')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt=require('jsonwebtoken')
require ('dotenv').config
exports.createUsers=async(req,res)=>{
    try{
        const{name,email,password,role}=req.body

        const existingUser=await Users.findOne({email})
        if(existingUser){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        let hashPassword;
        try{
            hashPassword=await bcrypt.hash(password, saltRounds )
        }
        catch(err){
            console.error(err)
             console.log(err)
             return res.status(500)
             .json({
                success:false,
                data:"Error in hashing",
                message:err.message,
             })
        }
        const response=await Users.create({name,email,password:hashPassword,role})
        return res.status(200).json({
            success:true,
            date:response,
            message:'User created successfully'
        })
    }
    catch(err){
        console.error(err)
        console.log(err)
        return res.status(500)
        .json({
           success:false,
           data:"Proper data is not given",
           message:err.message,
        })
    }
}

exports.getUsers=async(req,res)=>{
    try{
        const{email,password}=req.body
        if(!email || !password){
            return res.status(400).json({
                success:false,
                message:"Invalid credentials"
            })
        }
        let existingUser=await Users.findOne({email})
        if(!existingUser){
            return res.status(400).json({
                success:false,
                message:"User does not exist"
            })
        }
        const payload={
            email:existingUser.email,
            role:existingUser.role,
            _id:existingUser._id
        }
        if(await bcrypt.compare(password,existingUser.password)){
            // with all the data existing in payload we are logging in so when we are logged in we can fetch all these data
           let token=jwt.sign(payload,process.env.JWT_SECRET,{
             expiresIn:"2h",
           })
           existingUser=existingUser.toObject()
           existingUser.token=token
           existingUser.password=undefined
           const options={
             expires:new  Date(Date.now()+3*24*60*60*1000),
             httpOnly:true,
           }
           res.cookie("token",token,options).status(300).json({
            success:true,
            token,
            existingUser,
            message:"user logged in"
           })
        }
        else{
            return res.status(403).json({
                success:false,
                message:"Invalid password"
            })
        }
    }
    catch(err){
        console.error(err)
        console.log(err)
        return res.status(500)
        .json({
           success:false,
           data:"Proper data is not given",
           message:err.message,
        })
    }
}