const jwt=require('jsonwebtoken')
require('dotenv').config

exports.auth=(req,res,next)=>{
    try{
        console.log("body",req.body.token)
        console.log("cookies",req.cookies.token)
        // console.log("authorization",req.header("Authorization"))
       const token=req.body.token||req.cookies.token
       if(!token || token==undefined){
        return res.status(400).json({
            success:false,
            message:"token does not exists"
        })
       }
       try{
        const decode=jwt.verify(token,process.env.JWT_SECRET)
        req.user=decode
       }
       catch(err){
           console.error(err)
           console.log(err)
           return res.status(500)
           .json({
              success:false,
              data:"not able to get data",
              message:err.message,
           })
       }
       next()
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

exports.isStudent=(req,res,next)=>{
    try{
        if(req.user.role!=="student"){
            return res.status(500)
            .json({
               success:false,
               data:"No included in student role",
               message:err.message,
            })
        }
        next()
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
exports.admin=(req,res,next)=>{
    try{
        if(req.user.role!=="admin"){
            return res.status(500)
            .json({
               success:false,
               data:"No included in admin role",
               message:err.message,
            })
        }
        next()
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