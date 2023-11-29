const mongoose=require('mongoose')
require ('dotenv').config
const dbConnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(()=>console.log("connection is successfully"))
    .catch((error)=>{
        console.log("issue in db connection",error)
        process.exit(1)
    })
}
module.exports=dbConnect;