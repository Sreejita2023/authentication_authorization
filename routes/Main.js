const express=require("express")
const router=express.Router()
const {auth,isStudent,admin}=require('../middleware/file')
const {createUsers}=require('../controllers/signup')
const {getUsers}=require('../controllers/signup')

router.post('/signup',createUsers)
router.post('/login',getUsers)

router.get('/test',auth,(req,res)=>{
     res.json({
        sucess:true,
        message:"welcome for testing"
     })
})
    
router.get('/student',auth,isStudent,(req,res)=>{
     res.json({
        sucess:true,
        message:"welcome to the protected route of student"
     })
})
router.get('/admin',auth,admin,(req,res)=>{
     res.json({
        sucess:true,
        message:"welcome to the protected route of admin"
     })
})
    

module.exports=router