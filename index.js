const express=require('express')
const app=express()
require('dotenv').config()
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}
const cookieParser = require('cookie-parser');
app.use(cookieParser());
app.use(cors(corsOptions)) // Use this after the variable declaration
// load config from env file
const PORT =process.env.PORT||5000;

// middleware  to parse json request body
app.use(express.json())

// import route from TODO API
const main=require('./routes/Main')

app.use("/api/v1",main)
app.listen(PORT,()=>{
    console.log(`served start successfully at ${PORT}`)
 })
 
const dbConnect =require('./config/database') 
dbConnect()

// default router
app.get('/',(req,res)=>{
    res.send(`<h1>home page</h1>`)
})